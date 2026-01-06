import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientSession } from 'mongoose';
import { writeConnection } from './DatabaseModule';
import { RequestStorage } from './RequestStorage';

export function Transactional() {
  return (
    target: ICommandHandler | IEventHandler,
    key: string,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod = descriptor.value as (
      ...args: any[]
    ) => Promise<unknown>;

    descriptor.value = new Proxy(originalMethod, {
      apply: async (proxyTarget, thisArg, args) => {
        const store = RequestStorage.getStorage();
        let session: ClientSession | null = store.session;
        let isNewTransaction = false;

        // 1) If we already have a session, we are inside a nested @Transactional
        if (session) {
          RequestStorage.increaseTransactionDepth();
        }

        // 2) If no session yet, start a new transaction (outermost)
        if (!session) {
          RequestStorage.resetTransactionDepth();
          session = await writeConnection.startSession();
          RequestStorage.setSession(session);
          isNewTransaction = true;
          await session.startTransaction();
        }

        try {
          const result = await proxyTarget.apply(thisArg, args);

          // 3) On success - outermost transaction commits
          if (isNewTransaction && store.transactionDepth <= 0) {
            await session!.commitTransaction();
            await session!.endSession();
            RequestStorage.setSession(null);
          }

          // 4) Nested call - just decrease depth
          if (!isNewTransaction && 0 < store.transactionDepth) {
            RequestStorage.decreaseTransactionDepth();
          }

          return result;
        } catch (error) {
          // 5) On error - outermost transaction aborts
          if (isNewTransaction && store.transactionDepth <= 0) {
            await session!.abortTransaction();
            await session!.endSession();
            RequestStorage.setSession(null);
          }

          // 6) Nested call - just decrease depth
          if (!isNewTransaction && 0 < store.transactionDepth) {
            RequestStorage.decreaseTransactionDepth();
          }

          throw error;
        }
      },
    });
  };
}

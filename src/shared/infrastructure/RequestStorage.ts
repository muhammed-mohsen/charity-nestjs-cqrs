// libs/RequestStorage.ts
import { AsyncLocalStorage } from 'async_hooks';
import { ClientSession } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

type Storage = {
  requestId: string;
  transactionDepth: number;
  session?: ClientSession;
};

class RequestStorageImplement {
  private readonly storage = new AsyncLocalStorage<Storage>();

  reset(): void {
    this.storage.enterWith({
      requestId: uuidv4(),
      transactionDepth: 0,
      session: undefined,
    });
  }

  getStorage(): Storage {
    const store = this.storage.getStore();
    if (!store) {
      throw new Error(
        'RequestStorage not initialized. Did you apply the middleware?',
      );
    }
    return store;
  }

  setSession(session?: ClientSession): void {
    const store = this.getStorage();
    store.session = session;
  }

  increaseTransactionDepth(): void {
    const store = this.getStorage();
    store.transactionDepth += 1;
  }

  decreaseTransactionDepth(): void {
    const store = this.getStorage();
    store.transactionDepth -= 1;
  }

  resetTransactionDepth(): void {
    const store = this.getStorage();
    store.transactionDepth = 0;
  }
}

export const RequestStorage = new RequestStorageImplement();

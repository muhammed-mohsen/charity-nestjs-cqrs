import { Session } from '../model/session/session';

export abstract class SessionRepository {
  abstract findByAccountId(accountId: string): Promise<Session | null>;
  abstract create(session: Session): Promise<void>;
  abstract update(session: Session): Promise<void>;
  abstract delete(sessionId: string): Promise<void>;
}

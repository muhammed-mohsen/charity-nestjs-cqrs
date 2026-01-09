import { BusinessException } from '../../../shared/exception/business.exception';

export class AlreadyInvitedException extends BusinessException {
  constructor(message: string) {
    super(message);
  }
}

import { BusinessException } from '../../../utils/exception/business.exception';

export class AlreadyInvitedException extends BusinessException {
  constructor(message: string) {
    super(message);
  }
}

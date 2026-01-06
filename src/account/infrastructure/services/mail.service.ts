import { MailerApi } from '../../../mailer/shared/mailer-api';
export class mailService {
  constructor(private readonly mailerService: MailerApi) {}

  async sendInvitationEmail(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitation to join the platform',
      text: `Click the link to join the platform: ${token}`,
    });
  }
}

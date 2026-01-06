import nodemailer from 'nodemailer';

export interface MailerApi {
  sendMail(
    mailData: nodemailer.SendMailOptions & {
      templatePath: string;
      context: Record<string, unknown>;
    },
  ): Promise<void>;
}

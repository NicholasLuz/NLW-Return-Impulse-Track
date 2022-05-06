import { MailAdapter, SendMailData } from './../mailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "27ddf2a8ec2065",
      pass: "e642f7417e09aa"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
            await transport.sendMail({
                from: 'Equipe Feedget <oi@feedget.com>',
                to: 'Nicholas Luz <nicholas.s.luz@gmail.com>',
                subject,
                html: body,
            });
    };
}
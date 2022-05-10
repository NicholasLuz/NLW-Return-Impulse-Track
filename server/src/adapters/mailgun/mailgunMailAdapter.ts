const mg = require('mailgun-js');
import { MailAdapter, SendMailData } from './../mailAdapter';

const mailgun = () =>
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });

export class MailgunMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
            await mailgun().messages().send({
                from: 'Equipe Feedget <oi@feedget.com>',
                to: 'Nicholas Luz <nickluz1997@hotmail.com>',
                subject,
                html: body,
            }
            );
    };
}
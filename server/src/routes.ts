import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
import express from 'express';
import { MailgunMailAdapter } from './adapters/mailgun/mailgunMailAdapter';

export const routes = express.Router()

routes.post('/feedbacks',  async (req, res) => {
    const { type, comment, screenshot } = req.body;

    try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const mailgunMailAdapter = new MailgunMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        // nodemailerMailAdapter,
        mailgunMailAdapter,
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    return res.status(201).send();
    } catch (err) {
        console.error(err);

        return res.status(500).send();
    }
});
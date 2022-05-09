import { MailAdapter } from './../adapters/mailAdapter';
import { FeedbacksRepository } from './../repositories/feedbacksRepository';
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
       private  feedbacksRepository: FeedbacksRepository,
       private mailAdapter: MailAdapter,
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Comment is required.');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: `Novo feedback - ${type}`,
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: <strong>${`${
                    type === "BUG" ? "Bug" : type === "IDEA" ? "Ideia" : "Outro"}`}</strong></p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `\n\n <div style="border: 2px solid black;width:300px;height:300px"><img alt="Print da tela" src="${screenshot}" style="width:300px; height:300px" /></div>` : ``,
                `</div>`
            ].join('\n'),
        })
    }
}
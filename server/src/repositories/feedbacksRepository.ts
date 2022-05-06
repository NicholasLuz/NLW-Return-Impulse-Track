export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
    //como a função foi transformada em async no prismaFeedbacksRepository, ela deve ser uma Promise, ao invés de void.
}
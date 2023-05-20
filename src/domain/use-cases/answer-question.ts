import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  instuctorId: string;
  questionId: string;
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instuctorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instuctorId,
      questionId
    });
    return answer;
  }
}
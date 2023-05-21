import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseRequest {
  instuctorId: string;
  questionId: string;
  content: string
}

export class AnswerQuestionUseCase {

  constructor(
    private answersRepository: AnswersRepository
  ) { }

  async execute({ instuctorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instuctorId,
      questionId
    });

    this.answersRepository.create(answer);

    return answer;
  }
}
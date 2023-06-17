import { AnswersRepository } from '../../../repositories/answer-repository'
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../../../repositories/question-repository';

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.")
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) {
      throw new Error("Question not found.")
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Unauthorized.")
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question)

    return { question }
  }
}

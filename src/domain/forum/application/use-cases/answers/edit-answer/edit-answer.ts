import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../../repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({
    answerId,
    content,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Unauthorized')
    }

    answer.content = content

    await this.answerRepository.save(answer)
    return {
      answer,
    }
  }
}

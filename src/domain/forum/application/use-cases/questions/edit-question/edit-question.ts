import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    content,
    title,
    authorId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)
    return {
      question,
    }
  }
}

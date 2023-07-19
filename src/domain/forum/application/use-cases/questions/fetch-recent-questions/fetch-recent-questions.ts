import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../../repositories/question-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number,
  perPage: number,
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({
    page,
    perPage
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page, perPage })

    return {
      questions,
    }
  }
}

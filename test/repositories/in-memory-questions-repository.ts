import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Array<Question> = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}

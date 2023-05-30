import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Array<Answer> = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}

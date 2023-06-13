import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Array<Answer> = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIdex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIdex, 1)
  }

  async save(answer: Answer) {
    const itemIdex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIdex] = answer
  }
}

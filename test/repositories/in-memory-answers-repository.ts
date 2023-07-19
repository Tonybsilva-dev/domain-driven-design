import { PaginationParams } from '@/core/repositories/pagination-params';
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

  async findManyByQuestionId(questionId: string, { page, perPage }: PaginationParams): Promise<Answer[]> {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * perPage, page * perPage)

    return answers
  }
}

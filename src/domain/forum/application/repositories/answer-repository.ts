import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findById(answer: string): Promise<Answer | null>
}

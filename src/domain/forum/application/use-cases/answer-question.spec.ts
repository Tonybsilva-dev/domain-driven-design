import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

describe('Create Answer', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      instuctorId: '1',
      questionId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(answer).toHaveProperty('id')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})

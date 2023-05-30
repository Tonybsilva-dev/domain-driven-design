import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

describe('Create Question', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(question).toHaveProperty('id')
    expect(question).toHaveProperty('slug')
    expect(question.title).toEqual('Nova pergunta')
  })
})

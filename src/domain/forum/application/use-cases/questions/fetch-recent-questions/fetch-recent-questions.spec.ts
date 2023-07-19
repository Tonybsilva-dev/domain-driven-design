import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-questions'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {

    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2023, 0, 20) }));
    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2023, 0, 18) }));
    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2023, 0, 23) }));

    const { questions } = await sut.execute({
      page: 1,
      perPage: 20
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 18) })
    ])

  })

  it('should be able to fetch paginated recent questions', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(MakeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
      perPage: 20
    })

    expect(questions).toHaveLength(2)
  })
})

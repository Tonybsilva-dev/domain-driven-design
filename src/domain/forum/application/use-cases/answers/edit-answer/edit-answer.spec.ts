import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { MakeAnswer } from 'test/factories/make-answers'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = MakeAnswer({}, new UniqueEntityID('answer-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: newAnswer.authorId.toValue(),
      content: 'content-quest',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'content-quest',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = MakeAnswer({}, new UniqueEntityID('answer-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'content-quest',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

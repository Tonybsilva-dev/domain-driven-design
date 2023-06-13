import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-questions'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = MakeQuestion({}, new UniqueEntityID('question-1'));
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: newQuestion.authorId.toValue(),
      title: 'question-test',
      content: 'content-quest'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'question-test',
      content: 'content-quest'
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = MakeQuestion({}, new UniqueEntityID('question-1'));
    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'question-test',
        content: 'content-quest'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
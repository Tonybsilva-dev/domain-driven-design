import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { MakeAnswer } from 'test/factories/make-answers'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-questions'

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
  })

  it('should be able to choose question best answer', async () => {

    const newQuestion = MakeQuestion()
    const newAnswer = MakeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(newAnswer.id);
  })

  it('should not be able to choose another user question best answer', async () => {

    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-1')
    })
    const newAnswer = MakeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: newAnswer.authorId.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

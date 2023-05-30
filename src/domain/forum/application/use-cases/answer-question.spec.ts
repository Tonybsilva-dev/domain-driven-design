import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async function (answer: Answer): Promise<void> { },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instuctorId: '1',
    content: 'Nova reposta',
  })

  expect(answer.content).toEqual('Nova reposta')
  expect(answer).toHaveProperty('id')
})
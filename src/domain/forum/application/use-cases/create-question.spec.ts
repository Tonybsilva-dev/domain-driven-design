import { QuestionsRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'
import { Question } from '../../enterprise/entities/question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async function (question: Question): Promise<void> { },
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.title).toEqual('Nova pergunta')
  expect(question).toHaveProperty('id')
  expect(question).toBeTruthy()
  expect(question).toHaveProperty('slug')
})

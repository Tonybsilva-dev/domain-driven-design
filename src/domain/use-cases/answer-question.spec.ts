import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test("create a answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    questionId: '1',
    instuctorId: "1",
    content: 'Nova reposta'
  })

  expect(answer).toHaveProperty('id');
})
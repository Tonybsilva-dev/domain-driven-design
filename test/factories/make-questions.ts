import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug";
import { faker } from '@faker-js/faker'

export function MakeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override
  },
    id)

  return question
}
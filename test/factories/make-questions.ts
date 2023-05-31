import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug";

export function MakeQuestion(
  override: Partial<QuestionProps> = {}
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example Question',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override
  })

  return question
}
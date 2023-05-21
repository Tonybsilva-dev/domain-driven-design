import { Slug } from "./values-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityID,
  bestAnswerId?: UniqueEntityID
  title: string,
  content: string,
  slug: Slug;
  createdAt: Date,
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get slug() {
    return this.props.slug;
  }

  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    },
      id);

    return question
  }
}

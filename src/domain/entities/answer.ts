import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  content: string,
  authorId: string,
  questionId: string,
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId
  }
}
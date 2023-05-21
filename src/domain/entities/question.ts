import { randomUUID } from "node:crypto";
import { Slug } from "./values-objects/slug";

interface QuestionProps {
  title: string,
  content: string,
  authorId: string,
  slug: Slug;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}
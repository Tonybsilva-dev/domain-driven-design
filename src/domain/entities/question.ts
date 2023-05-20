import { randomUUID } from "node:crypto";

export class Question {
  public id: string;
  public title: string;
  public content: string;

  constructor(title: string, content: string, id?: string) {
    this.title = title;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}
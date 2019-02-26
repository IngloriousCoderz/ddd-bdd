import { Page } from './Page'
import { User } from './User'

export class Post implements Page {
  constructor(
    private title: string,
    private body: string,
    private author: User,
    private date: Date,
  ) {}

  getId(): string {
    return this.title
  }

  getTitle(): string {
    return this.title
  }

  getBody(): string {
    return this.body
  }

  getAuthor(): User {
    return this.author
  }

  getDate(): string {
    return this.date.toLocaleDateString()
  }

  render(): string {
    return `
      <h1>${this.getTitle()}</h1>
      <div>by ${this.getAuthor().toString()} - ${this.getDate()}</div>
      <div>${this.getBody()}</div>
    `
  }
}

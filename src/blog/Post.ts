import { Page } from './Page'
import { User } from './User'
import { toId } from './utils'

export class Post implements Page {
  private id: string

  constructor(
    private title: string,
    private body: string,
    private author: User,
    private date: Date,
  ) {
    this.id = toId(title)
  }

  getId(): string {
    return this.id
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

import { toId } from '../service/utils'
import { User } from './User'

export class Post {
  private id: string

  constructor(
    private title: string,
    private body: string,
    private date: Date,
    private author: User,
  ) {
    this.id = toId(title)
  }

  public getId(): string {
    return this.id
  }

  public renderPreview(): string {
    return [
      '<article>',
      `<h2>${this.title}</h2>`,
      `<div class="sub">by ${this.getAuthorName()} - ${this.formatDate()}</div>`,
      `<div class="text-right"><a href="/posts/${
        this.id
      }">read more&rsaquo;</a></div>`,
      '</article>',
    ].join('')
  }

  public render(): string {
    return [
      '<article>',
      `<h1>${this.title}</h1>`,
      `<div class="sub">by ${this.getAuthorName()} - ${this.formatDate()}</div>`,
      `<div>${this.body}</div>`,
      '</article>',
    ].join('')
  }

  public getAuthorName() {
    return this.author.getUsername()
  }

  private formatDate(): string {
    return this.date.toLocaleDateString()
  }
}

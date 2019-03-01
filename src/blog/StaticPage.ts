import { Page } from './Page'
import { User } from './User'
import { toId } from './utils'

export class StaticPage implements Page {
  private id: string

  constructor(private title: string, private body: string) {
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

  render(user?: User): string {
    return `
      <h1>${this.getTitle()}</h1>
      <div>${this.getBody()}</div>
    `
  }
}

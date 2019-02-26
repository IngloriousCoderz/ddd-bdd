import { Page } from './Page'

export class StaticPage implements Page {
  constructor(private title: string, private body: string) {}

  getId(): string {
    return this.title
  }

  getTitle(): string {
    return this.title
  }

  getBody(): string {
    return this.body
  }

  render(): string {
    return `
      <h1>${this.getTitle()}</h1>
      <div>${this.getBody()}</div>
    `
  }
}

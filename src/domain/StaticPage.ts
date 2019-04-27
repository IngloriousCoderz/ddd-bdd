import { oneLineTrim } from 'common-tags'

import { toId } from '../service/utils'
import { Page } from './Page'

export class StaticPage implements Page {
  private id: string

  constructor(private title: string, private body: string) {
    this.id = toId(title)
  }

  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }

  public render(): string {
    return oneLineTrim`
      <article>
        <h1>${this.title}</h1>
        <div>${this.body}</div>
      </article>
    `
  }
}

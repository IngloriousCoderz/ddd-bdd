import { oneLineTrim } from 'common-tags'

import { Page } from '../Page'
import { Blog } from './Blog'

export class LayoutDecorator implements Blog {
  constructor(private blog: Blog) {}

  public renderAddPage(): string {
    return this.renderLayout(this.blog.renderAddPage())
  }

  public addPage(title: string, body: string): string {
    return this.blog.addPage(title, body)
  }

  public getPages(): Page[] {
    return this.blog.getPages()
  }

  public renderPage(id: string): string {
    return this.renderLayout(this.blog.renderPage(id))
  }

  public renderAddPost(): string {
    return this.renderLayout(this.blog.renderAddPost())
  }

  public addPost(
    title: string,
    body: string,
    date: Date,
    author?: string,
  ): string {
    return this.blog.addPost(title, body, date, author)
  }

  public renderPost(id: string): string {
    return this.renderLayout(this.blog.renderPost(id))
  }

  public renderFeaturedPosts(author?: string): string {
    return this.renderLayout(this.blog.renderFeaturedPosts(author))
  }

  private renderLayout(renderedPage: string): string {
    return oneLineTrim`
      ${this.renderNav()}
      <main>
      ${renderedPage}
      </main>
    `
  }

  private renderNav(): string {
    return oneLineTrim`
      <nav>
        <ul>
          ${this.getPages()
            .map(this.renderLink)
            .join('')}
        </ul>
      </nav>
    `
  }

  private renderLink(page: Page): string {
    return `<li><a href="/pages/${page.getId()}">${page.getTitle()}</a></li>`
  }
}

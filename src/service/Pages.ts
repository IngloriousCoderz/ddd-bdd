import { Page } from '../domain/Page'
import { StaticPage } from '../domain/StaticPage'

export class Pages {
  private pages: Page[] = []

  public all(): Page[] {
    return this.pages
  }

  public find(id: string): Page {
    return this.pages.find(page => page.getId() === id)
  }

  public add(title: string, body: string): string {
    const page: Page = new StaticPage(title, body)
    return this.addPage(page)
  }

  public addPage(page: Page): string {
    this.pages.push(page)
    return page.getId()
  }

  public render(id: string): string {
    const page = this.find(id)
    return page.render()
  }
}

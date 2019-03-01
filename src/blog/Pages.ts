import { Page } from './Page'
import { StaticPage } from './StaticPage'
import { User } from './User'

export class Pages {
  private pages: Page[] = []

  constructor() {
    this.pages.push(new StaticPage('Home', 'Put some content here.'))
  }

  all(): Page[] {
    return this.pages
  }

  find(id: string, user?: User): Page {
    return this.pages.find(page => page.getId() === id)
  }

  add(title: string, body: string) {
    const page: Page = new StaticPage(title, body)
    this.addPage(page)
  }

  addPage(page: Page) {
    this.pages.push(page)
  }

  render(id: string, user?: User) {
    const page = this.find(id, user)
    return page.render(user)
  }
}

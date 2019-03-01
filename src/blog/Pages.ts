import { Page } from './Page'
import { StaticPage } from './StaticPage'
import { User } from './User'

export class Pages {
  private pages: Page[] = []

  constructor() {
    this.pages.push(new StaticPage('Home', 'Put some content here.'))
  }

  getPages(): Page[] {
    return this.pages
  }

  getPage(id: string, user?: User): Page {
    return this.pages.find(page => page.getId() === id)
  }

  addPage(title: string, body: string) {
    const page: Page = new StaticPage(title, body)
    this._addPage(page)
  }

  _addPage(page: Page) {
    this.pages.push(page)
  }
}

import { Page } from './Page';
import { StaticPage } from './StaticPage';
import { User } from './User';

export class Pages {
  private pages: Page[] = [];

  constructor() {
    this.pages.push(new StaticPage('Home', 'Put some content here.'));
  }

  public all(): Page[] {
    return this.pages;
  }

  public find(id: string, user?: User): Page {
    return this.pages.find(page => page.getId() === id);
  }

  public add(title: string, body: string) {
    const page: Page = new StaticPage(title, body);
    this.addPage(page);
  }

  public addPage(page: Page) {
    this.pages.push(page);
  }

  public render(id: string, user?: User) {
    const page = this.find(id, user);
    return page.render(user);
  }
}

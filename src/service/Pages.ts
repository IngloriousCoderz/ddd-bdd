import { Page } from '../domain/Page';
import { StaticPage } from '../domain/StaticPage';
import { User } from '../domain/User';

export class Pages {
  private pages: Page[] = [];

  public all(): Page[] {
    return this.pages;
  }

  public find(id: string, user?: User): Page {
    return this.pages.find(page => page.getId() === id);
  }

  public add(title: string, body: string): void {
    const page: Page = new StaticPage(title, body);
    this.addPage(page);
  }

  public addPage(page: Page): void {
    this.pages.push(page);
  }

  public render(id: string): string {
    const page = this.find(id);
    return page.render();
  }
}

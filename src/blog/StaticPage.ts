import { Page } from './Page';
import { User } from './User';
import { toId } from './utils';

export class StaticPage implements Page {
  private id: string;

  constructor(private title: string, private body: string) {
    this.id = toId(title);
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

  public render(user?: User): string {
    return `
      <h1>${this.getTitle()}</h1>
      <div>${this.getBody()}</div>
    `;
  }
}

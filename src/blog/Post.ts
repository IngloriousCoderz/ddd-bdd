import { Page } from './Page';
import { User } from './User';
import { toId } from './utils';

export class Post implements Page {
  private id: string;

  constructor(
    private title: string,
    private body: string,
    private date: Date,
    private author: User,
  ) {
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

  public getAuthor(): User {
    return this.author;
  }

  public getDate(): string {
    return this.date.toLocaleDateString();
  }

  public render(): string {
    return `
      <h1>${this.getTitle()}</h1>
      <div>by ${this.getAuthor().toString()} - ${this.getDate()}</div>
      <div>${this.getBody()}</div>
    `;
  }
}

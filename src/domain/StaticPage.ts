import { toId } from '../service/utils';
import { Page } from './Page';

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

  public render(): string {
    return [
      `<h1>${this.getTitle()}</h1>`, // HACK: this comment is here just to keep indentation
      `<div>${this.getBody()}</div>`,
    ].join('');
  }
}

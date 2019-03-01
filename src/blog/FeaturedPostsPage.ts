import { Page } from './Page';
import { Posts } from './Posts';
import { User } from './User';
import { toId } from './utils';

export class FeaturedPostsPage implements Page {
  private id: string;
  private title = 'Featured Posts';

  constructor(private posts: Posts) {
    this.id = toId(this.title);
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(user?: User): string {
    return this.getPosts(user)
      .map(
        post => `
      <h2>${post.getTitle()}</h2>
      <div>by ${post.getAuthor().toString()} - ${post.getDate()}</div>
      <div><a href="posts/${post.getId()}"></a></div>
    `,
      )
      .join('');
  }

  public getPosts(user?: User) {
    return this.posts.all(user);
  }

  public render(user?: User): string {
    const body = this.getBody(user).trim();
    return `
      <h1>${this.getTitle()}</h1>
      ${body.length ? body : '<div>No posts yet.</div>'}
    `;
  }
}

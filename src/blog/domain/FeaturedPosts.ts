import { Posts } from '../service/Posts';
import { toId } from '../service/utils';
import { Page } from './Page';
import { Post } from './Post';
import { User } from './User';

export class FeaturedPosts implements Page {
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
      .map(this.getPostBody)
      .join('');
  }

  public getPosts(user?: User): Post[] {
    return this.posts.all(user);
  }

  public render(user?: User): string {
    const body = this.getBody(user).trim();
    return [
      `<h1>${this.getTitle()}</h1>`,
      `${body.length ? body : '<div>No posts yet.</div>'}`,
    ].join('');
  }

  private getPostBody(post: Post): string {
    return [
      `<h2>${post.getTitle()}</h2>`,
      `<div>by ${post.getAuthor().toString()} - ${post.getDate()}</div>`,
      `<div><a href="posts/${post.getId()}"></a></div>`,
    ].join('');
  }
}

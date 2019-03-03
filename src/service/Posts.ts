import { Post } from '../domain/Post';
import { User } from '../domain/User';

export class Posts {
  private posts: Post[] = [];

  public all(user?: User): Post[] {
    return user
      ? this.posts.filter(
          post => post.getAuthor().getUsername() === user.getUsername(),
        )
      : this.posts;
  }

  public find(id: string): Post {
    return this.posts.find(post => post.getId() === id);
  }

  public add(title: string, body: string, date: Date, author: User): void {
    const post = new Post(title, body, date, author);
    this.posts.push(post);
  }

  public render(id: string): string {
    const post: Post = this.find(id);
    return post.render();
  }
}
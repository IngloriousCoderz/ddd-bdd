import { Post } from './Post';
import { User } from './User';

export class Posts {
  private posts: Post[] = [];

  public all(user?: User) {
    return user
      ? this.posts.filter(
          post => post.getAuthor().getUsername() === user.getUsername(),
        )
      : this.posts;
  }

  public find(id: string): Post {
    return this.posts.find(post => post.getId() === id);
  }

  public add(title: string, body: string, date: Date, author: User) {
    const post = new Post(title, body, date, author);
    this.posts.push(post);
  }

  public render(id: string): string {
    const post: Post = this.find(id);
    return post.render();
  }
}

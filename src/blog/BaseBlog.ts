import { Blog } from './Blog';
import { FeaturedPosts } from './domain/FeaturedPosts';
import { Pages } from './service/Pages';
import { Posts } from './service/Posts';
import { Users } from './service/Users';

export class BaseBlog implements Blog {
  private pages = new Pages();
  private posts = new Posts();
  private featuredPostsPage: FeaturedPosts;

  constructor(private users: Users) {
    this.featuredPostsPage = new FeaturedPosts(this.posts);
    this.pages.addPage(this.featuredPostsPage);
  }

  public addPage(title: string, body: string): void {
    this.pages.add(title, body);
  }

  public renderPage(id: string, nickname?: string): string {
    const user = this.users.find(nickname);
    return this.pages.render(id, user);
  }

  public addPost(
    title: string,
    body: string,
    date: Date,
    author: string,
  ): void {
    const user = this.users.find(author);
    this.posts.add(title, body, date, user);
  }

  public renderPost(id: string): string {
    return this.posts.render(id);
  }
}

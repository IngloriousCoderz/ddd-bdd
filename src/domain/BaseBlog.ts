import { Pages } from '../service/Pages';
import { Posts } from '../service/Posts';
import { Users } from '../service/Users';
import { Blog } from './Blog';
import { FeaturedPosts } from './FeaturedPosts';

export class BaseBlog implements Blog {
  private pages = new Pages();
  private posts = new Posts();
  private featuredPosts: FeaturedPosts;

  constructor(private users: Users) {
    this.featuredPosts = new FeaturedPosts(this.posts);
    this.pages.addPage(this.featuredPosts);
  }

  public addPage(title: string, body: string): void {
    this.pages.add(title, body);
  }

  public renderPage(id: string): string {
    return this.pages.render(id);
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

  public renderFeaturedPosts(author?: string): string {
    const user = this.users.find(author);
    return this.featuredPosts.render(user);
  }
}

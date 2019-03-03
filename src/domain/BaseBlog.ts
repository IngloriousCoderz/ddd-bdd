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
    this.addPage('Home', 'Put some content here.');
    this.featuredPosts = new FeaturedPosts(this.posts);
    this.pages.addPage(this.featuredPosts);
  }

  public addPage(title: string, body: string): void {
    this.pages.add(title, body);
  }

  public renderPage(id: string): string {
    const renderedPage = this.pages.render(id);
    return this.renderLayout(renderedPage);
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
    const renderedPost = this.posts.render(id);
    return this.renderLayout(renderedPost);
  }

  public renderFeaturedPosts(author?: string): string {
    const user = this.users.find(author);
    const renderedFeaturedPosts = this.featuredPosts.render(user);
    return this.renderLayout(renderedFeaturedPosts);
  }

  private renderLayout(renderedPage: string): string {
    return [
      '<html>',
      '<body>',
      this.renderNav(),
      renderedPage,
      '</body>',
      '</html>',
    ].join('');
  }

  private renderNav(): string {
    return [
      '<nav>',
      '<ul>',
      ...this.pages.all().map(this.renderLink),
      '</ul>',
      '</nav>',
    ].join('');
  }

  private renderLink(page): string {
    return [
      '<li>',
      `<a href="pages/${page.id}>${page.title}</a>`,
      '</li>',
    ].join('');
  }
}

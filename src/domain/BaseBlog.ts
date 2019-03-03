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
    this.featuredPosts = new FeaturedPosts(this.posts, users);
    this.pages.addPage(this.featuredPosts);
  }

  public renderAddPage(): string {
    const renderedPage = [
      '<h1>Add Page</h1>',
      '<form action="/add-page" method="POST">',
      '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
      '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
      '<button type="submit">Add Page</button>',
      '</form>',
    ].join('');
    return this.renderLayout(renderedPage);
  }

  public addPage(title: string, body: string): string {
    return this.pages.add(title, body);
  }

  public renderPage(id: string): string {
    const renderedPage = this.pages.render(id);
    return this.renderLayout(renderedPage);
  }

  public renderAddPost(): string {
    const renderedPage = [
      '<h1>Add Post</h1>',
      '<form action="/add-post" method="POST">',
      '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
      '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
      '<button type="submit">Add Post</button>',
      '</form>',
    ].join('');
    return this.renderLayout(renderedPage);
  }

  public addPost(
    title: string,
    body: string,
    date: Date,
    author: string,
  ): string {
    const user = this.users.find(author);
    return this.posts.add(title, body, date, user);
  }

  public renderPost(id: string): string {
    const renderedPage = this.posts.render(id);
    return this.renderLayout(renderedPage);
  }

  public renderFeaturedPosts(author?: string): string {
    const user = this.users.find(author);
    const renderedPage = this.featuredPosts.render(user);
    return this.renderLayout(renderedPage);
  }

  private renderLayout(renderedPage: string): string {
    return [this.renderNav(), '<main>', renderedPage, '</main>'].join('');
  }

  private renderNav(): string {
    return [
      '<nav><ul>',
      ...this.pages.all().map(this.renderLink),
      '</ul></nav>',
    ].join('');
  }

  private renderLink(page): string {
    return [`<li><a href="/pages/${page.id}">${page.title}</a></li>`].join('');
  }
}

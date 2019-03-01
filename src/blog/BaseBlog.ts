import { Blog } from './Blog';
import { FeaturedPostsPage } from './FeaturedPostsPage';
import { Page } from './Page';
import { Pages } from './Pages';
import { Post } from './Post';
import { Posts } from './Posts';
import { User } from './User';
import { Users } from './Users';

export class BaseBlog implements Blog {
  private pages = new Pages();
  private posts = new Posts();
  private featuredPostsPage: FeaturedPostsPage;

  constructor(private users: Users) {
    this.featuredPostsPage = new FeaturedPostsPage(this.posts);
    this.pages.addPage(this.featuredPostsPage);
  }

  public getUsers(): User[] {
    return this.users.all();
  }

  public getPages(): Page[] {
    return this.pages.all();
  }

  public addPage(title: string, body: string) {
    this.pages.add(title, body);
  }

  public renderPage(id: string, nickname?: string): string {
    const user = this.users.find(nickname);
    return this.pages.render(id, user);
  }

  public getPosts(user?: User): Post[] {
    return this.featuredPostsPage.getPosts(user);
  }

  public addPost(title: string, body: string, date: Date, author: string) {
    const user = this.users.find(author);
    this.posts.add(title, body, date, user);
  }

  public renderPost(id: string): string {
    return this.posts.render(id);
  }
}

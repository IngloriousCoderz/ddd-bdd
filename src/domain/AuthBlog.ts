import { Auth } from '../service/Auth';
import { Users } from '../service/Users';
import { Blog } from './Blog';
import { User } from './User';

export class AuthBlog implements Blog {
  private auth: Auth;

  constructor(private blog: Blog, private users: Users) {
    this.auth = new Auth(users);
  }

  public register(username: string, password: string, role?: string): void {
    this.auth.register(username, password, role);
  }

  public login(username: string, password: string): void {
    this.auth.login(username, password);
  }

  public logout(): void {
    this.auth.logout();
  }

  public getUsers(): User[] {
    if (!this.auth.isAdmin()) {
      throw new Error('User cannot perform this operation.');
    }
    return this.users.all();
  }

  public addPage(title: string, body: string): void {
    if (!this.auth.isAdmin()) {
      throw new Error('User cannot perform this operation.');
    }
    this.blog.addPage(title, body);
  }

  public renderPage(id: string): string {
    return this.blog.renderPage(id);
  }

  public addPost(title: string, body: string, date: Date): void {
    const username = this.auth.getUser().getUsername();
    return this.blog.addPost(title, body, date, username);
  }

  public renderPost(id: string): string {
    return this.blog.renderPost(id);
  }

  public renderFeaturedPosts(author?: string): string {
    return this.blog.renderFeaturedPosts(author);
  }
}

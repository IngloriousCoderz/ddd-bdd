import { Auth } from './Auth';
import { Blog } from './Blog';
import { Page } from './Page';
import { Post } from './Post';
import { User } from './User';
import { Users } from './Users';

export class AuthBlog implements Blog {
  private auth: Auth;

  constructor(private blog: Blog, users: Users) {
    this.auth = new Auth(users);
  }

  public register(username: string, password: string, role?: string) {
    this.auth.register(username, password, role);
  }

  public login(username: string, password: string) {
    this.auth.login(username, password);
  }

  public getUsers(): User[] {
    if (!this.auth.isAdmin()) {
      throw new Error('User cannot perform this operation.');
    }
    return this.blog.getUsers();
  }

  public getPages(): Page[] {
    return this.blog.getPages();
  }

  public addPage(title: string, body: string) {
    if (!this.auth.isAdmin()) {
      throw new Error('User cannot perform this operation.');
    }
    this.blog.addPage(title, body);
  }

  public renderPage(id: string, nickname?: string): string {
    return this.blog.renderPage(id, nickname);
  }

  public getPosts(user?: User): Post[] {
    return this.blog.getPosts(user);
  }

  public addPost(title: string, body: string, date: Date) {
    const username = this.auth.getUser().getUsername();
    return this.blog.addPost(title, body, date, username);
  }

  public renderPost(id: string): string {
    return this.blog.renderPost(id);
  }
}

import { Blog } from './Blog';
import { User } from './domain/User';
import { Auth } from './service/Auth';
import { Users } from './service/Users';

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

  public getUsers(): User[] {
    if (!this.auth.isAdmin()) {
      throw new Error('User cannot perform this operation.');
    }
    return this.users.all();
  }

  public addPage(title: string, body: string): void {
    try {
      if (!this.auth.isAdmin()) {
        throw new Error('User cannot perform this operation.');
      }
      this.blog.addPage(title, body);
    } catch (error) {
      throw error;
    }
  }

  public renderPage(id: string, nickname?: string): string {
    return this.blog.renderPage(id, nickname);
  }

  public addPost(title: string, body: string, date: Date): void {
    const username = this.auth.getUser().getUsername();
    return this.blog.addPost(title, body, date, username);
  }

  public renderPost(id: string): string {
    return this.blog.renderPost(id);
  }
}

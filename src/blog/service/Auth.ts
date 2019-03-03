import { User } from '../domain/User';
import { Users } from './Users';

export class Auth {
  private user: User;

  constructor(private users: Users) {}

  public register(username: string, password: string, role?: string): void {
    this.users.add(username, password, role);
  }

  public login(username: string, password: string): void {
    const user = this.users.find(username);
    if (user == null) {
      throw new Error('Wrong username or password.');
    }
    if (user.getPassword() !== password) {
      throw new Error('Wrong username or password.');
    }
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }

  public isAdmin(): boolean {
    try {
      return this.user.getRole() === 'admin';
    } catch (error) {
      throw new Error('User is not logged in.');
    }
  }
}

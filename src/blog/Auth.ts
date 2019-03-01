import { User } from './User';
import { Users } from './Users';

export class Auth {
  private user: User;

  constructor(private users: Users) {}

  public register(username: string, password: string, role?: string) {
    this.users.add(username, password, role);
  }

  public login(username: string, password: string) {
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

  public isAdmin() {
    return this.user.getRole() === 'admin';
  }
}

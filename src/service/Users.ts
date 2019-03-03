import { User } from '../domain/User';

export class Users {
  private users: User[] = [];

  public all(): User[] {
    return this.users;
  }

  public find(username): User {
    return this.users.find(user => user.getUsername() === username);
  }

  public add(username: string, password: string, role?: string): void {
    const user = new User(username, password, role);
    this.users.push(user);
  }
}

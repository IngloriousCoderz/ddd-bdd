import { User } from './User'

export class Users {
  private users: User[] = []

  addUser(email: string, nickname: string) {
    const id = this.users.length ? this.users[this.users.length - 1].getId() : 0
    const user = new User(email, nickname)
    user.setId(id + 1)
    this.users.push(user)
  }

  getUsers(): User[] {
    return this.users
  }

  getUser(nickname): User {
    return this.users.find(user => user.getNickname() === nickname)
  }
}

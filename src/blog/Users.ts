import { User } from './User'

export class Users {
  private users: User[] = []

  all(): User[] {
    return this.users
  }

  find(nickname): User {
    return this.users.find(user => user.getNickname() === nickname)
  }

  add(email: string, nickname: string) {
    const id = this.users.length ? this.users[this.users.length - 1].getId() : 0
    const user = new User(email, nickname)
    user.setId(id + 1)
    this.users.push(user)
  }
}

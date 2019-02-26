export class User {
  private id: number

  constructor(private email: string, private nickname: string) {}

  getId(): number {
    return this.id
  }

  setId(id: number) {
    this.id = id
  }

  getNickname(): string {
    return this.nickname
  }

  toString(): string {
    return this.nickname
  }
}

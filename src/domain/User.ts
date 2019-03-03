export class User {
  constructor(
    private username: string,
    private password: string,
    private role = 'authenticated',
  ) {}

  public getUsername(): string {
    return this.username
  }

  public getPassword(): string {
    return this.password
  }

  public getRole(): string {
    return this.role
  }

  public toString(): string {
    return this.username
  }
}

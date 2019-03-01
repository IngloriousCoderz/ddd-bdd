import { User } from './User'

export interface Page {
  getId(): string
  getTitle(): string
  getBody(): string
  render(user?: User): string
}

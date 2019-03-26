import { Page } from '../Page'

export interface Blog {
  renderAddPage(): string
  addPage(title: string, body: string): string
  getPages(): Page[]
  renderPage(id: string): string

  renderAddPost(): string
  addPost(title: string, body: string, date: Date, author?: string): string
  renderPost(id: string): string

  renderFeaturedPosts(author?: string): string
}

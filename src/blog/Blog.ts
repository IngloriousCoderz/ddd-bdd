import { Users } from './Users'
import { User } from './User'
import { Pages } from './Pages'
import { Page } from './Page'
import { FeaturedPostsPage } from './FeaturedPostsPage'
import { Post } from './Post'

export class Blog {
  private users = new Users()
  private pages = new Pages()
  private featuredPostsPage = new FeaturedPostsPage()

  constructor() {
    this.pages._addPage(this.featuredPostsPage)
  }

  addUser(email: string, nickname: string) {
    this.users.addUser(email, nickname)
  }

  getUsers(): User[] {
    return this.users.getUsers()
  }

  getUser(nickname): User {
    return this.users.getUser(nickname)
  }

  getPages(): Page[] {
    return this.pages.getPages()
  }

  addPage(title: string, body: string) {
    this.pages.addPage(title, body)
  }

  renderPage(id: string, user?: User): string {
    const page = this.pages.getPage(id, user)
    return page.render(user)
  }

  getPosts(user?: User): Post[] {
    return this.featuredPostsPage.getPosts(user)
  }

  addPost(title: string, body: string, author: User, date: Date) {
    this.featuredPostsPage.addPost(title, body, author, date)
  }

  renderPost(id: string): string {
    return this.featuredPostsPage.renderPost(id)
  }
}

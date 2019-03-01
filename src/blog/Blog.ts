import { Users } from './Users'
import { User } from './User'
import { Pages } from './Pages'
import { Page } from './Page'
import { FeaturedPostsPage } from './FeaturedPostsPage'
import { Posts } from './Posts'
import { Post } from './Post'

export class Blog {
  private users = new Users()
  private pages = new Pages()
  private posts = new Posts()
  private featuredPostsPage = new FeaturedPostsPage()

  constructor() {
    this.featuredPostsPage.setPosts(this.posts)
    this.pages.addPage(this.featuredPostsPage)
  }

  addUser(email: string, nickname: string) {
    this.users.add(email, nickname)
  }

  getUsers(): User[] {
    return this.users.all()
  }

  getPages(): Page[] {
    return this.pages.all()
  }

  addPage(title: string, body: string) {
    this.pages.add(title, body)
  }

  renderPage(id: string, nickname?: string): string {
    const user = this.users.find(nickname)
    return this.pages.render(id, user)
  }

  getPosts(user?: User): Post[] {
    return this.featuredPostsPage.getPosts(user)
  }

  addPost(title: string, body: string, author: string, date: Date) {
    const user = this.users.find(author)
    this.posts.add(title, body, user, date)
  }

  renderPost(id: string): string {
    return this.posts.render(id)
  }
}

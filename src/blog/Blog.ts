import { User } from './User'
import { Page } from './Page'
import { StaticPage } from './StaticPage'
import { PostList } from './PostList'
import { Post } from './Post'

export class Blog {
  constructor(
    private users: User[] = [],
    private pages: Page[] = [],
    private postList: PostList = new PostList(),
  ) {
    this.pages.push(new StaticPage('Home', 'Put some content here.'))
    this.pages.push(this.postList)
  }

  addUser(email: string, nickname: string) {
    const id = this.users.length ? this.users[this.users.length - 1].id : 0
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

  getPages(): Page[] {
    return this.pages
  }

  getPosts(user?: User): Post[] {
    return this.postList.getPosts(user)
  }

  addPage(title: string, body: string) {
    const page: Page = new StaticPage(title, body)
    this.pages.push(page)
  }

  renderPage(id: string) {
    const page = this.pages.find(page => page.getId() === id)
    return page.render()
  }

  addPost(title: string, body: string, author: User, date: Date) {
    this.postList.addPost(title, body, author, date)
  }

  renderPost(id: string) {
    return this.postList.renderPost(id)
  }
}

import { Posts } from './Posts'
import { Page } from './Page'
import { User } from './User'
import { toId } from './utils'

export class FeaturedPostsPage implements Page {
  private id: string
  private title = 'Featured Posts'
  private posts: Posts

  constructor() {
    this.id = toId(this.title)
  }

  getId(): string {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getBody(user?: User): string {
    return this.getPosts(user)
      .map(
        post => `
      <h2>${post.getTitle()}</h2>
      <div>by ${post.getAuthor().toString()} - ${post.getDate()}</div>
      <div><a href="posts/${post.getId()}"></a></div>
    `,
      )
      .join('')
  }

  setPosts(posts: Posts) {
    this.posts = posts
  }

  render(user?: User): string {
    const body = this.getBody(user).trim()
    return `
      <h1>${this.getTitle()}</h1>
      ${body.length ? body : '<div>No posts yet.</div>'}
    `
  }

  getPosts(user?: User) {
    return this.posts.all(user)
  }
}

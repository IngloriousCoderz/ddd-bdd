import { Posts } from '../service/Posts'
import { Users } from '../service/Users'
import { toId } from '../service/utils'
import { Page } from './Page'
import { User } from './User'

export class FeaturedPosts implements Page {
  private id: string
  private title = 'Featured Posts'

  constructor(private posts: Posts, private users: Users) {
    this.id = toId(this.title)
  }

  public getId(): string {
    return this.id
  }

  public render(author?: User): string {
    const body = this.posts
      .all(author)
      .map(post => post.renderPreview())
      .join('')

    return [
      '<article>',
      `<h1>${this.title}</h1>`,
      '<div>Filter: <a href="/pages/featured-posts?author=">all</a>',
      ...this.users.all().map(this.getUserLink),
      '</div>',
      '</article>',
      `${body.length ? body : '<article>No posts yet.</article>'}`,
    ].join('')
  }

  private getUserLink(user) {
    return `<a href="/pages/featured-posts?author=${user.getUsername()}">${user.getUsername()}</a>`
  }
}

import { Posts } from '../service/Posts'
import { Users } from '../service/Users'
import { toId } from '../service/utils'
import { Page } from './Page'
import { Post } from './Post'
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

  public getTitle(): string {
    return this.title
  }

  public getBody(author?: User): string {
    return this.getPosts(author)
      .map(this.getPostBody)
      .join('')
  }

  public render(author?: User): string {
    const body = this.getBody(author).trim()
    return [
      '<article>',
      `<h1>${this.getTitle()}</h1>`,
      '<div>Filter: <a href="/pages/featured-posts?author=">all</a>',
      ...this.users.all().map(this.getUserLink),
      '</div>',
      '</article>',
      `${body.length ? body : '<article>No posts yet.</article>'}`,
    ].join('')
  }

  private getPosts(author?: User): Post[] {
    return this.posts.all(author)
  }

  private getPostBody(post: Post): string {
    return [
      '<article>',
      `<h2>${post.getTitle()}</h2>`,
      `<div class="sub">by ${post
        .getAuthor()
        .toString()} - ${post.getDate()}</div>`,
      `<div class="text-right"><a href="/posts/${post.getId()}">read more&rsaquo;</a></div>`,
      '</article>',
    ].join('')
  }

  private getUserLink(user) {
    return `<a href="/pages/featured-posts?author=${user.getUsername()}">${user.getUsername()}</a>`
  }
}

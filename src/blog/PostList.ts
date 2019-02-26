import { Post } from './Post'
import { Page } from './Page'
import { User } from './User'

export class PostList implements Page {
  title = 'Featured Posts'
  posts: Post[] = []

  getId(): string {
    return this.title
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

  render(user?: User): string {
    const body = this.getBody(user).trim()
    return `
      <h1>${this.getTitle()}</h1>
      ${body.length ? body : '<div>No posts yet.</div>'}
    `
  }

  addPost(title: string, body: string, author: User, date: Date) {
    const post = new Post(title, body, author, date)
    this.posts.push(post)
  }

  renderPost(id: string): string {
    const post: Post = this.posts.find(post => post.getId() === id)
    return post.render()
  }

  getPosts(user?: User) {
    return user
      ? this.posts.filter(post => post.getAuthor().getId() === user.getId())
      : this.posts
  }
}

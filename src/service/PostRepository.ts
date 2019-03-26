import { Post } from '../domain/Post'
import { User } from '../domain/User'

export class PostRepository {
  private posts: Post[] = []

  public all(user?: User): Post[] {
    return user
      ? this.posts.filter(post => post.getAuthorName() === user.getUsername())
      : this.posts
  }

  public find(id: string): Post {
    return this.posts.find(post => post.getId() === id)
  }

  public add(title: string, body: string, date: Date, author: User): string {
    const post = new Post(title, body, date, author)
    this.posts.push(post)
    return post.getId()
  }

  public render(id: string): string {
    const post: Post = this.find(id)
    return post.render()
  }
}

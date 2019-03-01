import { Post } from './Post'
import { User } from './User'

export class Posts {
  private posts: Post[] = []

  getPosts(user?: User) {
    return user
      ? this.posts.filter(post => post.getAuthor().getId() === user.getId())
      : this.posts
  }

  getPost(id: string): Post {
    return this.posts.find(post => post.getId() === id)
  }

  addPost(title: string, body: string, author: User, date: Date) {
    const post = new Post(title, body, author, date)
    this.posts.push(post)
  }
}

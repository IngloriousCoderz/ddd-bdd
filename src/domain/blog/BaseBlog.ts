import { PageRepository } from '../../service/PageRepository'
import { PostRepository } from '../../service/PostRepository'
import { UserRepository } from '../../service/UserRepository'
import { FeaturedPosts } from '../FeaturedPosts'
import { Page } from '../Page'
import { Blog } from './Blog'

export class BaseBlog implements Blog {
  private pages = new PageRepository()

  constructor(private users: UserRepository, private posts: PostRepository) {}

  public renderAddPage(): string {
    return [
      '<h1>Add Page</h1>',
      '<form action="/add-page" method="POST">',
      '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
      '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
      '<button type="submit">Add Page</button>',
      '</form>',
    ].join('')
  }

  public addPage(title: string, body: string): string {
    return this.pages.add(title, body)
  }

  public addCustomPage(page: Page): string {
    return this.pages.addPage(page)
  }

  public getPages(): Page[] {
    return this.pages.all()
  }

  public renderPage(id: string): string {
    return this.pages.render(id)
  }

  public renderAddPost(): string {
    return [
      '<h1>Add Post</h1>',
      '<form action="/add-post" method="POST">',
      '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
      '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
      '<button type="submit">Add Post</button>',
      '</form>',
    ].join('')
  }

  public addPost(
    title: string,
    body: string,
    date: Date,
    author: string,
  ): string {
    const user = this.users.find(author)
    return this.posts.add(title, body, date, user)
  }

  public renderPost(id: string): string {
    return this.posts.render(id)
  }

  public renderFeaturedPosts(author?: string): string {
    const user = this.users.find(author)
    const featuredPosts = this.pages.find('featured-posts') as FeaturedPosts
    return featuredPosts.render(user)
  }
}

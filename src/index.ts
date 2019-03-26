import { AuthBlog } from './domain/blog/AuthBlog'
import { BaseBlog } from './domain/blog/BaseBlog'
import { Blog } from './domain/blog/Blog'
import { LayoutDecorator } from './domain/blog/LayoutDecorator'
import { FeaturedPosts } from './domain/FeaturedPosts'
import { PostRepository } from './service/PostRepository'
import { UserRepository } from './service/UserRepository'

export default function createBlog() {
  const users: UserRepository = new UserRepository()
  let blog: Blog = createBaseBlog(users)
  blog = createNavigationBlog(blog)
  blog = createAuthBlog(blog, users)
  return blog
}

export function createAlternativeBlog() {
  const users: UserRepository = new UserRepository()
  let blog: Blog = createBaseBlog(users)
  blog = createAuthBlog(blog, users)
  blog = createNavigationBlog(blog)
  return blog
}

function createBaseBlog(users: UserRepository) {
  const posts = new PostRepository()

  const baseBlog: BaseBlog = new BaseBlog(users, posts)
  baseBlog.addPage('Home', 'Put some content here.')
  baseBlog.addCustomPage(new FeaturedPosts(posts, users))

  return baseBlog
}

function createNavigationBlog(blog: Blog) {
  return new LayoutDecorator(blog)
}

function createAuthBlog(blog: Blog, users: UserRepository) {
  const authBlog: AuthBlog = new AuthBlog(blog, users)
  authBlog.register('admin', 'admin', 'admin')
  return authBlog
}

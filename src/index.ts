import { AuthBlog } from './domain/AuthBlog';
import { BaseBlog } from './domain/BaseBlog';
import { Blog } from './domain/Blog';
import { Users } from './service/Users';

export default function createBlog() {
  const users = new Users();
  let blog: Blog = new BaseBlog(users);
  blog = new AuthBlog(blog, users);

  const authBlog = blog as AuthBlog;
  authBlog.register('admin', 'admin', 'admin');
  return blog;
}

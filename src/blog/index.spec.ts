import { AuthBlog } from './AuthBlog';
import { BaseBlog } from './BaseBlog';
import { Blog } from './Blog';
import { Users } from './Users';

describe('Blog', () => {
  let blog: Blog;

  beforeEach(() => {
    const users = new Users();
    blog = new BaseBlog(users);
    blog = new AuthBlog(blog, users);
    (blog as AuthBlog).register('admin', 'admin', 'admin');
  });

  it('should initialize with an admin user', () => {
    (blog as AuthBlog).login('admin', 'admin');
    expect(blog.getUsers().length).toBe(1);
  });

  it('should initialize with a sample homepage', () => {
    expect(blog.renderPage('home')).toBe(`
      <h1>Home</h1>
      <div>Put some content here.</div>
    `);
  });

  it(`should initialize with an empty post list`, () => {
    expect(blog.renderPage('featured-posts')).toBe(`
      <h1>Featured Posts</h1>
      <div>No posts yet.</div>
    `);
  });

  it('should initialize with no posts', () => {
    expect(blog.getPosts().length).toBe(0);
  });

  it('should register a new user', () => {
    (blog as AuthBlog).login('admin', 'admin');
    expect(blog.getUsers().length).toBe(1);
  });

  it('should add a new page', () => {
    (blog as AuthBlog).login('admin', 'admin');
    blog.addPage('About', 'This is the about section.');

    expect(blog.getPages().length).toBe(3);
  });

  it('should render a page', () => {
    (blog as AuthBlog).login('admin', 'admin');
    blog.addPage('Contact Us', 'Fill in the form below.');

    expect(blog.renderPage('contact-us')).toBe(`
      <h1>Contact Us</h1>
      <div>Fill in the form below.</div>
    `);
  });

  it('should add a new post', () => {
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    blog.addPost(
      'Hello world!',
      'This is my first post.',
      new Date('2019-02-25'),
      'blogger',
    );

    expect(blog.getPosts().length).toBe(1);
  });

  it('should list all posts', () => {
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    blog.addPost(
      'First!',
      'This is my first post.',
      new Date('2019-02-25'),
      'blogger',
    );

    expect(blog.renderPage('featured-posts')).toBe(`
      <h1>Featured Posts</h1>
      <h2>First!</h2>
      <div>by blogger - 2019-2-25</div>
      <div><a href="posts/first!"></a></div>
    `);
  });

  it('should list all posts from an author', () => {
    (blog as AuthBlog).login('admin', 'admin');
    blog.addPost(
      'My Post',
      'This is my post.',
      new Date('2019-03-01'),
      'admin',
    );
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    blog.addPost(
      'Your Post',
      'This post is yours.',
      new Date('2019-03-02'),
      'blogger',
    );

    expect(blog.renderPage('featured-posts', 'blogger')).toBe(`
      <h1>Featured Posts</h1>
      <h2>Your Post</h2>
      <div>by blogger - 2019-3-2</div>
      <div><a href="posts/your-post"></a></div>
    `);
  });

  it('should render a post', () => {
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    blog.addPost(
      'Paradox',
      'This post will not be rendered correctly.',
      new Date('2019-02-25'),
      'blogger',
    );

    expect(blog.renderPost('paradox')).toBe(`
      <h1>Paradox</h1>
      <div>by blogger - 2019-2-25</div>
      <div>This post will not be rendered correctly.</div>
    `);
  });

  it('should throw an error if user does not exist', () => {
    expect(() => (blog as AuthBlog).login('blogger', 'blogger')).toThrow();
  });

  it('should throw an error if user logged in with wrong password', () => {
    expect(() => (blog as AuthBlog).login('admin', 'wrongpassword')).toThrow();
  });

  it('should throw an error if user looking for other users is not an admin', () => {
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    expect(() => blog.getUsers()).toThrow();
  });

  it('should throw an error if user adding a page is not admin', () => {
    (blog as AuthBlog).register('blogger', 'blogger');
    (blog as AuthBlog).login('blogger', 'blogger');
    expect(() =>
      blog.addPage('This should not work', 'In fact, it does not.'),
    ).toThrow();
  });
});

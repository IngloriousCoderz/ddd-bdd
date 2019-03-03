import createBlog from '..';
import { AuthBlog } from '../domain/AuthBlog';
import { Blog } from '../domain/Blog';

describe('Blog', () => {
  let blog: Blog;

  beforeEach(() => {
    blog = createBlog();
  });

  describe('Initialization', () => {
    it('should initialize with a registered admin user', () => {
      const authBlog = blog as AuthBlog;

      authBlog.login('admin', 'admin');
      expect(authBlog.getUsers().length).toBe(1);
    });

    it('should initialize with a sample homepage', () => {
      expect(blog.renderPage('home')).toBe(
        ['<h1>Home</h1>', '<div>Put some content here.</div>'].join(''),
      );
    });

    it('should initialize with an empty post list', () => {
      expect(blog.renderPage('featured-posts')).toBe(
        ['<h1>Featured Posts</h1>', '<div>No posts yet.</div>'].join(''),
      );
    });
  });

  describe('Authentication', () => {
    it('should sign on a new user', () => {
      const authBlog = blog as AuthBlog;
      authBlog.register('blogger', 'blogger', 'blogger');
      authBlog.login('admin', 'admin');

      expect(authBlog.getUsers().length).toBe(2);
    });

    it('should prevent a non-registered user from signing in', () => {
      const authBlog = blog as AuthBlog;

      expect(() => authBlog.login('blogger', 'blogger')).toThrow();
    });

    it('should prevent a user from signing in with a wrong password', () => {
      const authBlog = blog as AuthBlog;

      expect(() => authBlog.login('admin', 'wrongpassword')).toThrow();
    });

    it('should prevent a non-admin user from listing all users', () => {
      const authBlog = blog as AuthBlog;
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(() => authBlog.getUsers().length).toThrow();
    });

    it('should sign out', () => {
      const authBlog = blog as AuthBlog;
      authBlog.login('admin', 'admin');
      authBlog.logout();

      expect(() => authBlog.getUsers().length).toThrow();
    });
  });

  describe('Pages', () => {
    it('should add a new page', () => {
      const authBlog = blog as AuthBlog;
      authBlog.login('admin', 'admin');
      blog.addPage('About', 'This is the about section.');

      expect(blog.renderPage('about')).toBe(
        ['<h1>About</h1>', '<div>This is the about section.</div>'].join(''),
      );
    });

    it('should prevent adding a page if user is not signed in', () => {
      expect(() =>
        blog.addPage('About', 'This is the about section.'),
      ).toThrow();
    });

    it('should prevent adding a page if user is not admin', () => {
      const authBlog = blog as AuthBlog;
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(() =>
        blog.addPage('About', 'This is the about section.'),
      ).toThrow();
    });
  });

  describe('Posts', () => {
    it('should add a new post', () => {
      const authBlog = blog as AuthBlog;
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');
      blog.addPost(
        'Hello world!',
        'This is my first post.',
        new Date('2019-02-25'),
        'blogger',
      );

      expect(blog.renderPost('hello-world!')).toBe(
        [
          '<h1>Hello world!</h1>',
          '<div>by blogger - 2019-2-25</div>',
          '<div>This is my first post.</div>',
        ].join(''),
      );
    });

    it('should prevent adding a post if user is not signed in', () => {
      expect(() => blog.renderPost('hello-world!')).toThrow();
    });
  });

  describe('Featured Posts', () => {
    it('should list all posts', () => {
      const authBlog = blog as AuthBlog;
      authBlog.login('admin', 'admin');
      blog.addPost(
        'First!',
        'This is my first post.',
        new Date('2019-02-25'),
        'admin',
      );

      expect(blog.renderFeaturedPosts()).toBe(
        [
          '<h1>Featured Posts</h1>',
          '<h2>First!</h2>',
          '<div>by admin - 2019-2-25</div>',
          '<div><a href="posts/first!"></a></div>',
        ].join(''),
      );
    });

    it('should render featured posts as a page', () => {
      const authBlog = blog as AuthBlog;
      authBlog.login('admin', 'admin');
      blog.addPost(
        'First!',
        'This is my first post.',
        new Date('2019-02-25'),
        'admin',
      );

      expect(blog.renderPage('featured-posts')).toBe(
        [
          '<h1>Featured Posts</h1>',
          '<h2>First!</h2>',
          '<div>by admin - 2019-2-25</div>',
          '<div><a href="posts/first!"></a></div>',
        ].join(''),
      );
    });

    it('should render featured posts from a specific author', () => {
      const authBlog = blog as AuthBlog;
      authBlog.login('admin', 'admin');
      blog.addPost(
        'My Post',
        'This is my post.',
        new Date('2019-03-01'),
        'admin',
      );

      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');
      blog.addPost(
        'Your Post',
        'This post is yours.',
        new Date('2019-03-02'),
        'blogger',
      );

      expect(blog.renderFeaturedPosts('blogger')).toBe(
        [
          '<h1>Featured Posts</h1>',
          '<h2>Your Post</h2>',
          '<div>by blogger - 2019-3-2</div>',
          '<div><a href="posts/your-post"></a></div>',
        ].join(''),
      );
    });
  });
});

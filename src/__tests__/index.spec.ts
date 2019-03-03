import createBlog from '..';
import { AuthBlog } from '../domain/AuthBlog';
import { Blog } from '../domain/Blog';

describe('Blog', () => {
  let blog: Blog;
  let authBlog: AuthBlog;

  beforeEach(() => {
    blog = createBlog();
    authBlog = blog as AuthBlog;
  });

  describe('Initialization', () => {
    it('should initialize with a registered admin user', () => {
      authBlog.login('admin', 'admin');
      expect(authBlog.getUsers().length).toBe(1);
    });

    it('should initialize with a sample homepage', () => {
      expect(blog.renderPage('home')).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a href="/login">Sign In</a></li>',
          '<li><a>Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Home</h1>',
          '<div>Put some content here.</div>',
          '</article>',
          '</main>',
          '<nav><ul></ul></nav>',
        ].join(''),
      );
    });

    it('should initialize with an empty post list', () => {
      expect(blog.renderPage('featured-posts')).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a href="/login">Sign In</a></li>',
          '<li><a>Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Featured Posts</h1>',
          '<div>Filter: ',
          '<a href="/pages/featured-posts?author=">all</a>',
          '<a href="/pages/featured-posts?author=admin">admin</a>',
          '</div>',
          '</article>',
          '<article>No posts yet.</article>',
          '</main>',
          '<nav><ul></ul></nav>',
        ].join(''),
      );
    });
  });

  describe('Authentication', () => {
    it('should render the "Sign On" page', () => {
      expect(authBlog.renderRegister()).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a href="/login">Sign In</a></li>',
          '<li><a>Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="javascript:history.back()">Back</a></li>',
          '</ul></nav>',
          '<main>',
          '<h1>Sign On</h1>',
          '<form action="/register" method="POST">',
          '<label>Username</label><input name="username" autofocus autocomplete="off" /><br/>',
          '<label>Password</label><input name="password" type="password" /><br/>',
          '<button type="submit">Sign On</button>',
          '</form>',
          '</main>',
          '<nav><ul>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should sign on a new user', () => {
      authBlog.register('blogger', 'blogger');
      authBlog.login('admin', 'admin');

      expect(authBlog.getUsers().length).toBe(2);
    });

    it('should render the "Sign In" page', () => {
      expect(authBlog.renderLogin()).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a href="/login">Sign In</a></li>',
          '<li><a>Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="javascript:history.back()">Back</a></li>',
          '</ul></nav>',
          '<main>',
          '<h1>Sign In</h1>',
          '<form action="/login" method="POST">',
          '<label>Username</label><input name="username" autofocus autocomplete="off" /><br/>',
          '<label>Password</label><input name="password" type="password" /><br/>',
          '<button type="submit">Sign In</button>',
          '</form>',
          '</main>',
          '<nav><ul>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should prevent a non-registered user from signing in', () => {
      expect(() => authBlog.login('blogger', 'blogger')).toThrow();
    });

    it('should prevent a user from signing in with a wrong password', () => {
      expect(() => authBlog.login('admin', 'wrongpassword')).toThrow();
    });

    it('should prevent a non-admin user from listing all users', () => {
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(() => authBlog.getUsers().length).toThrow();
    });

    it('should sign out', () => {
      authBlog.login('admin', 'admin');
      authBlog.logout();

      expect(() => authBlog.getUsers().length).toThrow();
    });
  });

  describe('Pages', () => {
    it('should render the "Add Page" page if user is an admin', () => {
      authBlog.login('admin', 'admin');

      expect(blog.renderAddPage()).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<h1>Add Page</h1>',
          '<form action="/add-page" method="POST">',
          '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
          '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
          '<button type="submit">Add Page</button>',
          '</form>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-page">Add Page</a></li>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should prevent unauthenticated users from rendering the "Add Page" page', () => {
      expect(() => blog.renderAddPage()).toThrow();
    });

    it('should prevent non-admin users from rendering the "Add Page" page', () => {
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(() => blog.renderAddPage()).toThrow();
    });

    it('should add a new page', () => {
      authBlog.login('admin', 'admin');
      blog.addPage('About', 'This is the about section.');

      expect(blog.renderPage('about')).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '<li><a href="/pages/about">About</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>About</h1>',
          '<div>This is the about section.</div>',
          '</article>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-page">Add Page</a></li>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should prevent unauthenticated users from adding a page', () => {
      expect(() =>
        blog.addPage('About', 'This is the about section.'),
      ).toThrow();
    });

    it('should prevent non-admin users from adding a page', () => {
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(() =>
        blog.addPage('About', 'This is the about section.'),
      ).toThrow();
    });
  });

  describe('Posts', () => {
    it('should render the "Add Post" page if user is signed in', () => {
      authBlog.register('blogger', 'blogger');
      authBlog.login('blogger', 'blogger');

      expect(blog.renderAddPost()).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<h1>Add Post</h1>',
          '<form action="/add-post" method="POST">',
          '<label>Title</label><input name="title" autofocus autocomplete="off" /><br/>',
          '<label>Body</label><textarea name="body" rows="8" cols="26"></textarea><br/>',
          '<button type="submit">Add Post</button>',
          '</form>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should prevent unauthenticated users from rendering the "Add Post" page', () => {
      expect(() => blog.renderAddPost()).toThrow();
    });

    it('should add a new post', () => {
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
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Hello world!</h1>',
          '<div class="sub">by blogger - 2019-2-25</div>',
          '<div>This is my first post.</div>',
          '</article>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should prevent adding a post if user is not signed in', () => {
      expect(() => blog.renderPost('hello-world!')).toThrow();
    });
  });

  describe('Featured Posts', () => {
    it('should list all posts', () => {
      authBlog.login('admin', 'admin');
      blog.addPost(
        'First!',
        'This is my first post.',
        new Date('2019-02-25'),
        'admin',
      );

      expect(blog.renderFeaturedPosts()).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Featured Posts</h1>',
          '<div>Filter: ',
          '<a href="/pages/featured-posts?author=">all</a>',
          '<a href="/pages/featured-posts?author=admin">admin</a>',
          '</div>',
          '</article>',
          '<article>',
          '<h2>First!</h2>',
          '<div class="sub">by admin - 2019-2-25</div>',
          '<div class="text-right"><a href="/posts/first!">read more&rsaquo;</a></div>',
          '</article>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-page">Add Page</a></li>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should render featured posts as a page', () => {
      authBlog.login('admin', 'admin');
      blog.addPost(
        'First!',
        'This is my first post.',
        new Date('2019-02-25'),
        'admin',
      );

      expect(blog.renderPage('featured-posts')).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Featured Posts</h1>',
          '<div>Filter: ',
          '<a href="/pages/featured-posts?author=">all</a>',
          '<a href="/pages/featured-posts?author=admin">admin</a>',
          '</div>',
          '</article>',
          '<article>',
          '<h2>First!</h2>',
          '<div class="sub">by admin - 2019-2-25</div>',
          '<div class="text-right"><a href="/posts/first!">read more&rsaquo;</a></div>',
          '</article>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-page">Add Page</a></li>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });

    it('should render featured posts from a specific author', () => {
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
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a>Sign In</a></li>',
          '<li><a href="/logout">Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="/pages/home">Home</a></li>',
          '<li><a href="/pages/featured-posts">Featured Posts</a></li>',
          '</ul></nav>',
          '<main>',
          '<article>',
          '<h1>Featured Posts</h1>',
          '<div>Filter: ',
          '<a href="/pages/featured-posts?author=">all</a>',
          '<a href="/pages/featured-posts?author=admin">admin</a>',
          '<a href="/pages/featured-posts?author=blogger">blogger</a>',
          '</div>',
          '</article>',
          '<article>',
          '<h2>Your Post</h2>',
          '<div class="sub">by blogger - 2019-3-2</div>',
          '<div class="text-right"><a href="/posts/your-post">read more&rsaquo;</a></div>',
          '</article>',
          '</main>',
          '<nav><ul>',
          '<li><a href="/add-post">Add Post</a></li>',
          '</ul></nav>',
        ].join(''),
      );
    });
  });

  describe('Errors', () => {
    it('should display an error page', () => {
      expect(authBlog.renderError(new Error('I am an error page'))).toBe(
        [
          '<nav><ul>',
          '<li><a href="/register">Sign On</a></li>',
          '<li><a href="/login">Sign In</a></li>',
          '<li><a>Sign out</a></li>',
          '</ul></nav>',
          '<nav><ul>',
          '<li><a href="javascript:history.back()">Back</a></li>',
          '</ul></nav>',
          '<main>',
          '<h1>Sorry</h1>',
          '<p>I am an error page</p>',
          '</main>',
          '<nav><ul>',
          '</ul></nav>',
        ].join(''),
      );
    });
  });
});

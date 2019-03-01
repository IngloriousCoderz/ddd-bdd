import { Blog } from './Blog'

describe('Blog', () => {
  let blog: Blog

  beforeEach(() => {
    blog = new Blog()
    blog.addUser('admin@blog.ic', 'admin')
  })

  it('should initialize with an admin user', () => {
    expect(blog.getUsers().length).toBe(1)
  })

  it('should initialize with a sample homepage', () => {
    expect(blog.renderPage('home')).toBe(`
      <h1>Home</h1>
      <div>Put some content here.</div>
    `)
  })

  it(`should initialize with an empty post list`, () => {
    expect(blog.renderPage('featured-posts')).toBe(`
      <h1>Featured Posts</h1>
      <div>No posts yet.</div>
    `)
  })

  it('should initialize with no posts', () => {
    expect(blog.getPosts().length).toBe(0)
  })

  it('should add a new user', () => {
    blog.addUser('antony.mistretta@gmail.com', 'IceOnFire')

    expect(blog.getUsers().length).toBe(2)
  })

  it('should add a new page', () => {
    blog.addPage('About', 'This is the about section.')

    expect(blog.getPages().length).toBe(3)
  })

  it('should render a page', () => {
    blog.addPage('Contact Us', 'Fill in the form below.')

    expect(blog.renderPage('contact-us')).toBe(`
      <h1>Contact Us</h1>
      <div>Fill in the form below.</div>
    `)
  })

  it('should add a new post', () => {
    blog.addUser('antony.mistretta@gmail.com', 'IceOnFire')
    blog.addPost(
      'Hello world!',
      'This is my first post.',
      'IceOnFire',
      new Date('2019-02-25'),
    )

    expect(blog.getPosts().length).toBe(1)
  })

  it('should list all posts', () => {
    blog.addUser('antony.mistretta@gmail.com', 'IceOnFire')
    blog.addPost(
      'First!',
      'This is my first post.',
      'IceOnFire',
      new Date('2019-02-25'),
    )

    expect(blog.renderPage('featured-posts')).toBe(`
      <h1>Featured Posts</h1>
      <h2>First!</h2>
      <div>by IceOnFire - 2019-2-25</div>
      <div><a href="posts/first!"></a></div>
    `)
  })

  it('should list all posts from an author', () => {
    blog.addUser('antony.mistretta@gmail.com', 'IceOnFire')
    blog.addPost(
      'My Post',
      'This is my post.',
      'IceOnFire',
      new Date('2019-03-01'),
    )
    blog.addPost(
      'Your Post',
      'This post is yours.',
      'admin',
      new Date('2019-03-02'),
    )

    expect(blog.renderPage('featured-posts', 'IceOnFire')).toBe(`
      <h1>Featured Posts</h1>
      <h2>My Post</h2>
      <div>by IceOnFire - 2019-3-1</div>
      <div><a href="posts/my-post"></a></div>
    `)
  })

  it('should render a post', () => {
    blog.addUser('antony.mistretta@gmail.com', 'IceOnFire')
    blog.addPost(
      'Paradox',
      'This post will not be rendered correctly.',
      'IceOnFire',
      new Date('2019-02-25'),
    )

    expect(blog.renderPost('paradox')).toBe(`
      <h1>Paradox</h1>
      <div>by IceOnFire - 2019-2-25</div>
      <div>This post will not be rendered correctly.</div>
    `)
  })
})

import bodyParser from 'body-parser'
import express from 'express'
import mung from 'express-mung'

import createBlog from './src'
import { AuthBlog } from './src/domain/blog/AuthBlog'

const app = express()
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(mung.write(wrapHTML))

const blog = createBlog()
const authBlog = blog as AuthBlog

populate()

app.get('/', (_, response) => {
  response.write(blog.renderPage('home'))
  response.end()
})

app.get('/pages/:id', (request, response) => {
  const { id } = request.params
  if (id === 'home') {
    response.redirect('/')
  } else if (id === 'featured-posts') {
    response.write(blog.renderFeaturedPosts(request.query.author))
  } else {
    response.write(blog.renderPage(id))
  }
  response.end()
})

app.get('/posts/:id', (request, response) => {
  response.write(blog.renderPost(request.params.id))
  response.end()
})

app.get('/register', (_, response) => {
  response.write(authBlog.renderRegister())
  response.end()
})

app.post('/register', (request, response) => {
  authBlog.register(request.body.username, request.body.password)
  authBlog.login(request.body.username, request.body.password)
  response.redirect('/')
})

app.get('/login', (_, response) => {
  response.write(authBlog.renderLogin())
  response.end()
})

app.post('/login', (request, response) => {
  authBlog.login(request.body.username, request.body.password)
  response.redirect('/')
})

app.get('/logout', (_, response) => {
  authBlog.logout()
  response.redirect('/')
})

app.get('/add-page', (_, response) => {
  response.write(blog.renderAddPage())
  response.end()
})

app.post('/add-page', (request, response) => {
  const { title, body } = request.body
  const id = blog.addPage(title, body)
  response.redirect(`/pages/${id}`)
})

app.get('/add-post', (_, response) => {
  response.write(blog.renderAddPost())
  response.end()
})

app.post('/add-post', (request, response) => {
  const { title, body } = request.body
  const id = blog.addPost(title, body, new Date())
  response.redirect(`/posts/${id}`)
})

app.use((error, request, response, next) => {
  response.write(authBlog.renderError(error))
  response.end()
})

app.listen(3000, () => {
  console.log('Blog listening on port 3000!') // tslint:disable-line
})

function wrapHTML(chunk, encoding, request, response) {
  return `
    <html>
      <head>
        <title>Blog</title>
        <link rel="stylesheet" href="/assets/styles/style.css">
      </head>
      <body>
        ${chunk}
      </body>
    </html>
  `
}

function populate() {
  authBlog.login('admin', 'admin')
  blog.addPage('About', 'This is the about page.')
  blog.addPage(
    'Contacts',
    '<p>Contact us by dropping a mail <a href="mailto:antony.mistretta@gmail.com">here</a>.</p>',
  )
  blog.addPost('First', '<p>This is my first post!</p>', new Date())

  authBlog.register('blogger', 'blogger')
  authBlog.login('blogger', 'blogger')
  blog.addPost(
    'The Art Of Blogging',
    '<p>First of all, build a blog from scratch.</p>',
    new Date(),
  )
  authBlog.logout()
}

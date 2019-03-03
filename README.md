# ddd-bdd

Reference code for a course on Domain-Driven Design and Behaviour-Driven Development.

This exercise is a role-playing game in which the teacher pretends to be a client that has a rough idea of what they want. At first they just know they want a Wordpress-style blog, but then a few features emerge (and they should be stated as obscure as possible):

1. Posts have a title, a body, an author and a date.
2. Every post should be rendered as HTML.
3. The blog will be a PWA that accesses a RESTful service.
4. Apart from posts, the blog has pages such as About or Contacts.
5. Pages have a title and a body, and should be rendered as HTML as well.
6. Every page and post has a unique id which is the title's slugified version.
7. When created, the blog should have at least a stub homepage.
8. The blog should also have a "featured posts" page: it shows title, author's nickname, and date for every post, and also provides a link to the post.
9. The "featured posts" page should show a "no posts yet" message if there are no posts.
10. The list of featured posts can be filtered by author's nickname.
11. The blog should have some authentication.
12. When created, the blog shoud have at least one admin user.
13. A blogger can just add posts and read all kinds of pages, while an admin can also add new pages and get a list of users.

The resulting code may be suboptimal, but at least it must be agreed with the client through thorough unit tests.
This way we practice on:

- Agreeing on a Ubiquitous Language
- Defining a suitable model for the domain
- Applying Test-Driven Development
- Exploring Aggregates
- Structuring code into well-defined modules

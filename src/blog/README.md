# Blog

This exercise is a role-playing game in which the teacher pretends to be a client that has a rough idea of what they want. At first they just know they want a Wordpress-style blog, but then a few features emerge (and they are obscure on purpose):

1. Apart from posts, the blog has pages such as About or Contacts.
2. Pages have a title and a body.
3. Posts have a title, a body, an author and a date.
4. Every page and post has a unique id which is the title's slugified version.
5. When created, the blog should have at least a stub homepage.
6. The blog should also have a "featured posts" page: it shows title, author's nickname, and date for every post, and also provides a link to the post.
7. The "featured posts" page should show a "no posts yet" message if there are no posts.
8. Every page and post should be rendered as HTML.
9. The list of featured posts can be filtered by author's nickname.
10. When created, the blog shoud ask for a user so there's at least one author.
11. The blog will be a PWA that accesses a RESTful service.
12. An admin can add users and pages, while a blogger can just add posts and read posts.

The resulting code may be suboptimal, but at least it must be agreed with the client through thorough unit tests.
This way we practice on:

- Agreeing on a Ubiquitous Language
- Defining a suitable model for the domain
- Applying Test-Driven Development
- Exploring Aggregates
- Structuring code into well-defined modules

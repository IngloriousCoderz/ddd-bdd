# ddd-bdd

Reference code for a course on Domain-Driven Design and Behaviour-Driven Development.

This exercise is a role-playing game in which the teacher pretends to be a client that has a rough idea of what they want. At first they just know they want a Wordpress-style blog, but then a few features emerge (and they should be stated as obscure as possible):

1. Posts have a title, a body, an author and a date.
2. Every post should be rendered as HTML.
3. Apart from posts, the blog has pages such as About or Contacts.
4. Pages have a title and a body, and should be rendered as HTML as well.
5. Every page and post has a unique id which is the title's slugified version.
6. When created, the blog should have at least a stub homepage.
7. The blog should also have a "featured posts" page: it shows title, author's nickname, and date for every post, and also provides a link to the post.
8. The "featured posts" page should show a "no posts yet" message if there are no posts.
9. The list of featured posts can be filtered by author's nickname.
10. The blog should have some authentication.
11. When created, the blog shoud have at least one admin user.
12. Users can sign on, and will have a default role of "Authenticated".
13. Users can also sign in and sign out.
14. Any user can just add posts and read all kinds of pages, while an admin can also add new pages and get a list of users.
15. The blog should display all available pages on a menu.

The resulting code may be suboptimal, but at least it must be agreed with the client and formalized with thorough unit tests.
This way we practice on:

- Agreeing on a Ubiquitous Language
- Defining a suitable model for the domain
- Applying Emergent Design
- Applying Test-Driven Development
- Exploring Aggregates and Repositories
- Structuring code into well-defined modules

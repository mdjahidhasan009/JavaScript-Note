
# Lecture 15 - Backend 2 | Introduction to Backend Development

Before starting with the backend, we need to know its beginning and end. The start is understandable, but it's never possible to know where the end is. We need to reach a certain level where we can learn the rest on our own. What should the learning path for backend development look like?

The responsibilities of a backend developer can be very small or very large, depending on the size of the company you work for. If you design your product yourself, you will have to handle the frontend, backend, database, API, architecture, cloud, security, and documentation all by yourself. If you work in a small team of 5-6 people, you will still have a lot of work, but some tasks will be shared. If you wo...

We are currently building ourselves. To shape ourselves, we need to plan what topics we need to learn initially. Here is the plan:

- API Design: API design is about passing data, creating a medium for communication between the client and the server. We can do this in several ways:
  - REST API: Most of the time, we use REST API for designing APIs.
  - GraphQL: Another popular tool after REST API is GraphQL.
  - gRPC: A third method is gRPC.
  - SOAP: Previously, there was SOAP. Nowadays, it's used less than 1%. You might need it if you work with a service that used SOAP 15 years ago.
  - Web Socket: This is used for real-time communication and is difficult to scale.
  - Message Broker: This is needed for communication between two APIs. It's a higher-level concept and not beginner-friendly.
- API Security
  - JWT Token
  - Refresh Token: Used in highly secured systems.
  - OAuth2: Allows login through Gmail, Facebook, GitHub, etc. Not needed for beginners.
  - SAML (Security Assertion Markup Language): Used for single sign-on. Not needed for beginners.
  - Identity Providers: Includes Cognito, Auth0, Firebase, Okta, etc. Not needed for beginners.
  - Role Based Authorization: Authentication vs. Authorization. E.g., Facebook group roles (member, moderator, admin).
- API Testing
  - Unit Testing
  - Acceptance Testing
  - Load Testing
- API Documentation
  - Swagger: Used for auto-generated documentation.
  - Postman: Used daily for API testing and documentation.

To learn the above topics, we need to know a few things:

- Database: No need to be a database engineer or administrator, but basic knowledge is necessary. Writing database queries is challenging, but we can use ORMs (Object Relational Mapping) to work with databases easily. Some common databases are:
  - NoSQL
    - MongoDB
    - AWS DynamoDB
  - SQL
    - PostgreSQL
    - MySQL
    - MSSQL / Oracle
  - In Memory: Must work with in-memory databases for caching.
    - Redis: Preferred for its versatility.
    - Memcached: Used only for caching.
  - Graph Database: Used for complex data models, e.g., product recommendations in e-commerce.
    - Neo4j
- Linux Server: Basic knowledge required.
- Cloud Computing: Basic understanding needed.
- DevOps: Basic knowledge needed.

No need to worry about Linux Server, Cloud Computing, DevOps now. We will think about them later.

The long list above might seem intimidating, but everything here is easy. The most challenging part of backend development is designing the system based on requirements. Clients will provide requirements that are difficult to translate into programming. We need to analyze and relate everything to decide what to use. This is the hardest part; the rest is easy.

What do we need to design an API? Which programming language to use, what to handle, and how to handle it.

First, we need to understand what a server does. The server serves requests. Let's look at the server application responsibilities. Backend mainly has three tasks: listening to requests, processing them, and responding.

To do these three tasks, we choose a framework because every API task will require these three things. Let's create our first server.

Lecture 13 covered npm, yarn, package.json, package installation, etc. So, they won't be discussed here.

First, create a file named server.js. Let's work with raw Node.js without any framework.

```js
const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('<h1>Hello World</h1>');
		res.statusCode = 200;
		res.end();
	} else if (req.url === '/hello') {
		res.write('<h1>Hello Guest</h1>');
		res.statusCode = 200;
		res.end();
	} else {
		res.write('<h1>404 not found!</h1>');
		res.statusCode = 200;
		res.end();
	}
});

server.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
```

First, import the http module from Node.js. Then, create a server using `http.createServer`. It takes a callback function with two parameters: req and res. We wrote a condition that should be understandable. If we hit '/', it shows `Hello World`. If we hit '/hello', it shows `Hello Guest`. If we hit any other route, it shows `404 not found!`. Finally, we make the server listen on port `8000`.

Let's check if the server performs the three tasks mentioned earlier. The server listens to requests, processes them, and responds. Listening and responding are always the same, but processing involves complexity. Let's get an overview.

- Listen Request
  - Always Same
- Process
  - Algorithm
  - Data Structure
  - Database
  - Problem Solving
  - CRUD
- Response
  - Always Same



Here, we see that these tasks need to be written repeatedly. So, we will install a framework called Express.

How to create a server in Express is beautifully explained in Lecture 13. Here, only examples will be shown. Details are discussed there. You can learn from there.

```js
const express = require('express');

const app = express();
app.use(express.json());

const books = [
	{
		id: '1',
		name: 'Personal Finance',
		price: 500,
	},
	{
		id: '2',
		name: 'Javascript for dummies',
		price: 1000,
	},
	{
		id: '3',
		name: 'JavaScript the definitive guide',
		price: 1500,
	},
	{
		id: '4',
		name: "You don't know js yet",
		price: 2500,
	},
	{
		id: '5',
		name: 'Atomic Habits',
		price: 100,
	},
	{
		id: '6',
		name: 'JavaScript the good parts',
		price: 1200,
	},
];

app.get('/books', (req, res) => {
	if (req.query.show === 'all') {
		return res.json(books);
	}

	if (req.query.price === '500') {
		const result = books.filter((book) => book.price <= 500);
		return res.json(result);
	}

	if (req.query.price === '1000') {
		const result = books.filter((book) => book.price <= 1000);
		return res.json(result);
	}

	return res.json(books);
});

app.post('/books', (req, res) => {
	const book = req.body;
	books.push(book);

	res.json(books);
});

app.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
```

There are some common HTTP request methods, such as:

- GET - want to read data from server
- POST - create new data
- PUT/PATCH - update existing content
- DELETE - delete data from database

Now, let's see a routing pattern for different tasks:

- GET Everything - /books
- Get one book - /books/bookId
- POST new book - /books
- Update Book - /books/bookId
- Delete Book - /books/bookId

In the example above, an array named books is taken. This array contains several book objects, each with a book ID, name, and price. We want to show all books when we hit '/books', show all books when we hit '/books?show=all', show books priced up to 500 when we hit '/books?price=500', and show books priced up to 1000 when we hit '/books?price=1000'. We did this through the get method. Now, we want to add new books to the list. For that, we need to use the post method. We will push the object we get from the request body to the array.

Let's check in Postman to see if our server is working correctly.

First, run our server by writing `yarn start`. You will write what you give in package.json instead of start.

Below are snapshots of the results of '/books', '/books?show=all', '/books?price=500', and '/books?price=1000' sequentially.

![books](./images/books.png)
![all](./images/all.png)
![500](./images/500.png)
![1000](./images/1000.png)

Now, let's see if our POST method works. Below is a screenshot.

![postreq](./images/postreq.png)
![postres](./images/postres.png)

Our POST request is also working successfully.

Now, let's visualize our backend tasks in a pipeline.

REQUEST -> MIDDLEWARE[logger, body parser, file parser, user ip, block ip, authentication, authorization, validation] -> CONTROLLER (Business Logic) -> MIDDLEWARE[error handler] -> RESPONSE

We will discuss middleware and controllers in subsequent classes.

To understand the next class, having a basic understanding of Express is essential. For this understanding, there is a small playlist on the Stack Learner channel called [Express Js Crash Course In Bangla](https://youtube.com/playlist?list=PL_XxuZqN0xVDm9HkiP4h_76qNBZix6XME). Completing this playlist will give you a basic idea about Express. It is recommended to complete this playlist before watching the next lecture.

## Resource for this lecture

All resources for this lecture are available at [Lecture 15](../../resources/lecture-15/README.md).

## Source Code

All source code for this lecture is available at this [link](../../src/lecture-15/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

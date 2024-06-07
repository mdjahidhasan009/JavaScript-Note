
# Lecture 13 - Create Models, Write Pseudo Code and Discussion

In today's class, we will create the models based on the to-do list we created in Notion in the last class. Our Create Models to-do was like this.

![Create Models](./images/Screenshot_2.png)

First, let's talk about the project structure. We will create a directory named `attendance-system`. This project will have two applications: one for the client and one for the server. If we were creating separate applications for Student and Admin, we would have three applications. But two will suffice for our needs. Since we are not working on the client side yet and have not properly defined the client requirements, we will first work on the API. Some might wonder why we are doing the backend first. Previously, we always worked with HTML, CSS, and then moved to the backend. Now the world has changed a bit. In single-page applications, the backend work is done first, then the UI. It can also be done in parallel if we had a ready template or another frontend developer. Since I am the only one working on this application, I will first create the part that doesn't depend on anyone else, which is the backend. The frontend depends on the backend, so we will create the dependencies first. Now, in our `attendance-system` directory, we will create another directory named `server`. Later, when we work on the client, we will create another directory named `client`.

Creating a Node.js project means having a `package.json` file. How do we create it? There are two ways: using npm or yarn. When we install Node.js, npm is installed along with it. But we need to install yarn globally. How do we do that?

```sh
npm install --global yarn
```

Adding `--global` means it will be installed globally on the machine, and we won't need to install it again for this machine. If we didn't add `--global`, it would only be installed for this project. Now, let's create our `package.json` file using npm.

```sh
npm init -y
```

Adding `-y` means npm will ask us some questions, and we have answered all of them with yes. Running this command will create our `package.json` file. Now, let's see how to create it using yarn. The same command is used, just replace npm with yarn.

```sh
yarn init -y
```

Now, let's look at what's inside the `package.json` file.

```json
{
	"name": "server",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo "Error: no test specified" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

There are many things here, but the most important ones are `scripts`, `dependencies`, and `devDependencies`. dependencies and devDependencies are not visible yet. They will appear when we install a package.

What can we create now? Node.js is a powerful tool that allows us to run our code on our machine. This means we can create anything we want. We can create desktop applications, mobile applications, or anything. But right now, we want to create a web application. We could create an entire server using the methods provided in the [NodeJS API](https://nodejs.org/api). But why would we do that when we have a framework? The best framework for Node.js is [Express JS](https://expressjs.com/) because there's not much to learn. With just two or three concepts, we can do everything. It's called a Minimalist Web Framework or Micro Framework. When we hear micro framework, we might think it doesn't include everything. The concept of a micro framework is that it includes everything in small sizes. We can use whatever we need by attaching it as needed. In Django, everything is provided. You don't need to think about anything. If you have less time, Django is best. But if you need the best performance, best optimization, the best modules for login, the best modules for authentication, and flexibility, then Express is for you. It has one downside, which is also its advantage. The downside? As a beginner, it's hard to keep the steps in mind. If you have less time, keeping these steps in mind while working is tough. But by keeping these steps in mind, you will become a web developer without even realizing it. If you want to use Flask for a task, you can. If you want to use GO, you can. By learning Express, you know how to create middleware, what request and response are, how to handle them, and you are not dependent on any framework. You can work with any framework in the world. Just read the documentation and figure out how to use it. For these reasons, Express is best. It gives flexibility.

From now on, we will use yarn because it caches many things, making subsequent installations faster. It's also faster than npm. Let's install express.

```sh
yarn add express
```

One thing to keep in mind is to never use both npm and yarn in a single project. This will create conflicts when deploying. So, if you use npm, use it throughout the system, and if yarn, then use yarn.

Now, we need to create the server. A server is something that serves, much like a waiter in a restaurant. You give it an order, it takes it to the chef, and when the food is ready, it serves it to you. The server is a system in the application that listens to requests. We will create a file named `server.js` in our server directory.

First, we will import express into this file.

```js
const express = require('express');
```

Express is a function that returns our Express constructor, which helps us create an application. How?

```js
const app = express();
```

We called `express()` and stored the returned application in `app`. This `app` is powerful and contains everything we need. But writing it this way won't show anything. If we run the following command, we will see nothing.

```sh
node server.js
```

To display something, it needs to listen to requests. Now, it can't listen to requests from everywhere, so we need to specify a port number, say `4000`. It will listen to everything that comes from this port. After providing the port number, we will add a callback function to log that it's listening.

```js
app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});
```

If we run `server.js` now, we will see it doesn't stop. It's running. If we go to the browser and search `localhost:4000`, we will see `Cannot get /`. This means it can't find the route but doesn't give an error. If we close the terminal and run it in the browser, we will get an error saying it can't find the site. This means the above code has a lot of value.

Now, let's address the `Cannot get /` issue. We need to create a route for `/` as we did for the routes in the last class. The app can do this.

```js
app.get('/', (req, res) => {
	res.send('Thanks for your request');
});
```

The app will take a `get` request and return a callback function containing three things: req, res, and next. We don't need next for now. We will work with res. If we send a request to the `/` route, it will send a response. What will it send? Whatever we want. We want it to show "Thanks for your request" when someone hits `/`.

If we check in the browser now, we will see nothing because we changed the file but didn't restart the server. We need to restart the server every time we change the file. This is very tedious. To overcome this, we will use a package called nodemon.

```sh
yarn add -D nodemon
```

-D means it will be saved in devDependencies. It has no relation to our project. We are using it to make our development easier. For those related to the project, we will not use -D. After installing, we need to add a line to the "scripts" section in our package.json.

```json
{
	"scripts": {
		"dev": "nodemon server.js"
	},
}
```

Now, if we run `yarn dev` in the command line, we won't need to restart the server every time we change the file.

If we now run `localhost:4000` in the browser, we will see "Thanks for your request" displayed. It won't show this for any other route. If we add anything after `/`, it will say "Cannot get [that route]."

We can send anything instead of "Thanks for your request." HTML, CSS, JSON, video, audio, PDF, anything. Let's send some HTML.

```js
app.get('/', (req, res) => {
	res.send(`<h1>Thanks for your request</h1>`);
});
```

Running this in the browser will return an h1 tag.

Since we are building an API, we will consider sending JSON.

```js
app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});
```

Running this in the browser will show our object in JSON format. Our basic web server is ready.

Let's assume our application has a database. There are many ORMs (Object Relational Mappings) for database communication with models, including [Mongoose](https://mongoosejs.com/), [Sequelize](https://sequelize.org/), [TypeORM](https://typeorm.io/), and [Prisma](https://www.prisma.io/). If we want to work with [MongoDB](https://www.mongodb.com/), we will use [Mongoose](https://mongoosejs.com/). Let's install [Mongoose](https://mongoosejs.com/).

```sh
yarn add mongoose
```

Now, we will create our models. We will create a directory named `models` inside our server directory. In this `models` directory, we will create model files named User.js, Profile.js, AdminAttendance.js, and StudentAttendance.js.

First, let's work on the User model. In the last class, we saw what our user model would include:

```txt
- Name
- Email
- Password
- Roles
- AccountStatus
```

To create a model with Mongoose, we first need a Schema. A Schema is a shape, a structure. For example, whatever will be in the User model is its shape; nothing outside this shape can be there. First, let's import mongoose. We don't need everything, just model and Schema.

```js
const { model, Schema } = require('mongoose');
```

Now, let's create our Schema.

```js
const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	roles: [String],
	accountStatus: String,
});
```

The types we wrote here can be understood from Mongoose's documentation. Roles can have multiple roles, which is an array of strings. The rest are strings. Now, let's create our model.

```js
const User = model('User', userSchema);
```

The first argument must be the variable name given as a string. The second argument is our Schema. Then, we export our model so that it can be used anywhere in the project.

```js
module.exports = User;
```

There is a problem here because there is no validation. We will learn validation later. It is outside the context of today's class.

Now, let's create our profile model.

```js
const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
	firstName: String,
	lastName: String,
	phone: String,
	avatar: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
```


Everything is the same, but the user is of a different type. We need to determine whose profile it is. To do this, we use this special type of data in mongoose.

Now, let's create our Admin Attendance and Student Attendance models.

```js
// AdminAttendance.js
const { Schema, model } = require('mongoose');

const adminAttendanceSchema = new Schema({
	timeLimit: Number,
	status: String,
	createdAt: Date,
});

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);

module.exports = AdminAttendance;
```

```js
// StudentAttendance.js

const { Schema, model } = require('mongoose');

const studentAttendanceSchema = new Schema({
	createdAt: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	adminAttendance: {
		type: Schema.Types.ObjectId,
		ref: 'AdminAttendance',
	},
});

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;
```

We have completed the Create Models task from our to-do list. Next, we will start with Authentication. Before that, there will be seven backend classes covering the details of express. After completing those, try writing all the pseudocode yourself. Two examples of pseudocode are shown below.

**Registration Process:**

```txt
Start
name = input()
email = input()
password = input()
if name && email && password is invalid:
  return 400 error

user = find user with email
if user found:
  return 400 error

hash = hash password
user = save name, email, hash to user model
return 201
End
```

**Login Process:**

```txt
Start
email = input()
password = input()

user = find user with email
if user not found:
  return 400 error

if password not equal to user hash:
  return 400 error

token = generate token using user
return token
End
```

## Resource for this lecture

All resources for this lecture are available at [Lecture 13](../../resources/lecture-13/README.md).

## Source Code

All source code for this lecture is available at this [link](../../src/lecture-13/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

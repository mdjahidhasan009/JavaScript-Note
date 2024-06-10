
# Lecture 20 - Backend 7 | Start Working with Mongoose

In the previous class, we gave an overview of databases. We mentioned that we would first learn MongoDB and had given a task in Lecture 17 to get an idea about MongoDB. Developers, for some reason, tend to avoid databases. In our projects, we don’t write raw MongoDB code; we use ORM (Object Relational Mapper). Every framework has some ORM. For those working with PHP/LARAVEL, there’s an ORM called Eloquent, and for Java, there's Hibernate. Similarly, every framework has some way to easily communicate with databases in a programmer-friendly way. Programmers don’t like writing queries because it’s a separate concept that needs to be learned separately. To avoid this hassle, we use ORM. With ORM, we can perform database-related tasks by calling functions or classes. Does this mean we can do deep database work without learning databases? Never. But we can perform basic daily tasks. Since we are still beginners, there is no need to dive too deep into databases. For now, we will work with Mongoose.

To work with Mongoose, our machine must be connected to MongoDB. There are many ways to connect MongoDB. We can download and install [Compass](https://www.mongodb.com/products/compass) to connect. We can follow the [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) guide to install and connect MongoDB. We can also use [Docker](https://www.docker.com/) to connect. Any method can be used to connect. In VS Code, there’s an extension named MongoDB to view our data. Docker is a new concept here. We will discuss it in detail later. For now, know that if you create an app on Windows and give it to me, and I use Linux, it won’t work on my machine. Docker solves this problem. You create an image of the application in Docker and give it to me. I will run it in Docker. Docker allows code to run on any machine without compatibility issues.

Let me show you how to connect using Compass. First, install Compass. Then, run it. You’ll see a screen like the one below.

![mongodb](./images/mongodb-1.png)

Write `mongodb://localhost:27017` in the URI field and press the connect button. Your database will connect.

Now, let’s see how to connect using the command line. Follow the steps in [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). After completing the steps, open PowerShell or your command line. Type `mongod` and press enter. Your database will connect.

To work with Mongoose, we first need to install Mongoose by writing `yarn add mongoose`. Now, let's see how Mongoose works.

First, we need to understand the basic tasks of a database: CRUD (Create, Read, Update, Delete). How can we perform these tasks? By creating a schema for the data. Why do we need a schema in MongoDB if it's schemaless? There are several points to consider:

- Storing data in the database is expensive. Without data validation, storing junk data increases costs unnecessarily. We use schemas to ensure only meaningful data is stored.
- As developers, we understand the need for certain constraints. Just as TypeScript provides limitations that help prevent errors by enforcing data types, Mongoose provides structure, relationships, and validation systems for structured data in MongoDB.

Another nice term for a schema is Entity. In SQL courses or work, you’ll encounter the concept of an Entity Diagram, which looks like the image below.

![Entity Diagram](./images/entity-diagram.png)

Highlighted above are table names. When working with SQL, these are tables; with NoSQL, they are collections. SQL databases require a primary key (PK), but NoSQL databases don’t. Next are the properties, and you can specify data types if you wish. You’ll also see various connecting lines indicating relationships: One to One, One to Many, Many to Many. Let’s understand these relationships:

- **One to One Relationship** - One user has one profile, and one profile belongs to one user.
- **One to Many Relationship** - One user can have many posts, but each post belongs to one user.
- **Many to Many Relationship** - A course can be created by multiple people, and each person can create multiple courses.

Now, let's work with Mongoose by creating a JavaScript file. The [Mongoose documentation](https://mongoosejs.com/docs/guide.html) is extensive. If we understand it well, working with databases will become much easier. First, we'll import Mongoose in our file and connect according to the documentation.

```js
// index.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-demo');
```

Here, `mongo-demo` is the name of our database. You can replace it with any name you like. The documentation stops here, but we will go a bit deeper. This function returns a promise, so we can use then-catch blocks.

```js
// index.js

const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	});
```


# Lecture 20 - Backend 7 | Start Working with Mongoose

In the previous class, we gave an overview of databases. We mentioned that we would first learn MongoDB and had given a task in Lecture 17 to get an idea about MongoDB. Developers, for some reason, tend to avoid databases. In our projects, we don’t write raw MongoDB code; we use ORM (Object Relational Mapper). Every framework has some ORM. For those working with PHP/LARAVEL, there’s an ORM called Eloquent, and for Java, there's Hibernate. Similarly, every framework has some way to easily communicate with databases in a programmer-friendly way. Programmers don’t like writing queries because it’s a separate concept that needs to be learned separately. To avoid this hassle, we use ORM. With ORM, we can perform database-related tasks by calling functions or classes. Does this mean we can do deep database work without learning databases? Never. But we can perform basic daily tasks. Since we are still beginners, there is no need to dive too deep into databases. For now, we will work with Mongoose.

To work with Mongoose, our machine must be connected to MongoDB. There are many ways to connect MongoDB. We can download and install [Compass](https://www.mongodb.com/products/compass) to connect. We can follow the [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) guide to install and connect MongoDB. We can also use [Docker](https://www.docker.com/) to connect. Any method can be used to connect. In VS Code, there’s an extension named MongoDB to view our data. Docker is a new concept here. We will discuss it in detail later. For now, know that if you create an app on Windows and give it to me, and I use Linux, it won’t work on my machine. Docker solves this problem. You create an image of the application in Docker and give it to me. I will run it in Docker. Docker allows code to run on any machine without compatibility issues.

Let me show you how to connect using Compass. First, install Compass. Then, run it. You’ll see a screen like the one below.

![mongodb](./images/mongodb-1.png)

Write `mongodb://localhost:27017` in the URI field and press the connect button. Your database will connect.

Now, let’s see how to connect using the command line. Follow the steps in [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). After completing the steps, open PowerShell or your command line. Type `mongod` and press enter. Your database will connect.

To work with Mongoose, we first need to install Mongoose by writing `yarn add mongoose`. Now, let's see how Mongoose works.

First, we need to understand the basic tasks of a database: CRUD (Create, Read, Update, Delete). How can we perform these tasks? By creating a schema for the data. Why do we need a schema in MongoDB if it's schemaless? There are several points to consider:

- Storing data in the database is expensive. Without data validation, storing junk data increases costs unnecessarily. We use schemas to ensure only meaningful data is stored.
- As developers, we understand the need for certain constraints. Just as TypeScript provides limitations that help prevent errors by enforcing data types, Mongoose provides structure, relationships, and validation systems for structured data in MongoDB.

Another nice term for a schema is Entity. In SQL courses or work, you’ll encounter the concept of an Entity Diagram, which looks like the image below.

![Entity Diagram](./images/entity-diagram.png)

Highlighted above are table names. When working with SQL, these are tables; with NoSQL, they are collections. SQL databases require a primary key (PK), but NoSQL databases don’t. Next are the properties, and you can specify data types if you wish. You’ll also see various connecting lines indicating relationships: One to One, One to Many, Many to Many. Let’s understand these relationships:

- **One to One Relationship** - One user has one profile, and one profile belongs to one user.
- **One to Many Relationship** - One user can have many posts, but each post belongs to one user.
- **Many to Many Relationship** - A course can be created by multiple people, and each person can create multiple courses.

Now, let's work with Mongoose by creating a JavaScript file. The [Mongoose documentation](https://mongoosejs.com/docs/guide.html) is extensive. If we understand it well, working with databases will become much easier. First, we'll import Mongoose in our file and connect according to the documentation.

```js
// index.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-demo');
```

Here, `mongo-demo` is the name of our database. You can replace it with any name you like. The documentation stops here, but we will go a bit deeper. This function returns a promise, so we can use then-catch blocks.

```js
// index.js

const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	});
```

We have added a message to indicate when the database is connected and included a catch block for errors. Let's run the code to see if our database connects. If you see 'Database connected' after running, it means your database is connected. If you check Compass, you'll see nothing under mongo-demo because the database is connected but not closed, so it just stays connected without doing anything. We need to close it after connecting. You still won't see anything because no data has been created yet. Once you create data, it will appear.

```js
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

After connecting to the database, we will do all our tasks inside the then block.

If there's an error in the database, for example, if we make a mistake in the connection string, Mongoose will keep trying to connect until its default timeout is reached, then it will throw an error. We want it to give an error immediately if there's a mistake. Mongoose has a system for this. We can set this timeout as an argument in the connect method.

```js
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo', {
		serverSelectionTimeoutMS: 10,
	})
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

You will see an instant error. But setting such a low timeout is not good because not everyone has the same internet speed. If someone with slow internet tries to connect to our database, they will get an error after just 10 milliseconds. So, we should set a logical timeout to allow those with slow internet to connect.

Next, let's go to Mongoose's official documentation. The first thing we need to know when working with Mongoose is the schema. To create a model, we need a schema. This means the most important element in Mongoose is Schemas. Next is SchemaTypes, which is related to schemas. Connections are not very important right now, but we will need them for error handling in production. After that, there are Models, which are created from schemas. We don't work directly with schemas; schemas are just definitions of what our data will look like. Models are created from schemas, and we work with those models. The model mentioned in the MVC (Model View Controller) pattern is the same model here. Then there are Documents, which refer to the data we get back after a query or the data returned after inserting something new. It's essentially a JSON object storing all our information. A document can have subdocuments, and Mongoose allows us to work with subdocuments properly and flexibly, which MongoDB does not. When we query, we will work with documents and subdocuments. Then there are Queries, followed by Validation. This comes into play when we want to insert or update data. For example, you don't want to store an empty string as a name, but a user has entered an empty string. You don't want to store that in the database, and that's where validation comes in. After that, there's Middleware, similar to Express middleware. After sending data from the server to the database, we can transform or delete that data before saving it in the database. Then there's the most important system, Populate. To work with relationships, we need to work with populate. Discriminators are not very important. Plugins are important in some cases; we can create custom plugins to work with. Transactions are an advanced concept we will learn about later. For example, when withdrawing money from an ATM, after inserting the card, entering the password, and selecting the amount, your money is deducted. If there's a problem while dispensing the money, the money is deducted but not dispensed. There are two ways: either the money is deducted after dispensing, or if there's a problem, the money is reversed. Transactions are used for operations that depend on each other to either return success if both succeed or rollback if one fails.

We will start with SchemaTypes. First, we need to know which data types can be used. They are listed below.

![SchemaTypes](./images/schematypes.png)

The format for writing SchemaTypes is given in the documentation, with a snapshot below.

![example](./images/example.png)

Now, let's create a schema in our file. We will create a schema for a person as follows.


# Lecture 20 - Backend 7 | Start Working with Mongoose

In the previous class, we gave an overview of databases. We mentioned that we would first learn MongoDB and had given a task in Lecture 17 to get an idea about MongoDB. Developers, for some reason, tend to avoid databases. In our projects, we don’t write raw MongoDB code; we use ORM (Object Relational Mapper). Every framework has some ORM. For those working with PHP/LARAVEL, there’s an ORM called Eloquent, and for Java, there's Hibernate. Similarly, every framework has some way to easily communicate with databases in a programmer-friendly way. Programmers don’t like writing queries because it’s a separate concept that needs to be learned separately. To avoid this hassle, we use ORM. With ORM, we can perform database-related tasks by calling functions or classes. Does this mean we can do deep database work without learning databases? Never. But we can perform basic daily tasks. Since we are still beginners, there is no need to dive too deep into databases. For now, we will work with Mongoose.

To work with Mongoose, our machine must be connected to MongoDB. There are many ways to connect MongoDB. We can download and install [Compass](https://www.mongodb.com/products/compass) to connect. We can follow the [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) guide to install and connect MongoDB. We can also use [Docker](https://www.docker.com/) to connect. Any method can be used to connect. In VS Code, there’s an extension named MongoDB to view our data. Docker is a new concept here. We will discuss it in detail later. For now, know that if you create an app on Windows and give it to me, and I use Linux, it won’t work on my machine. Docker solves this problem. You create an image of the application in Docker and give it to me. I will run it in Docker. Docker allows code to run on any machine without compatibility issues.

Let me show you how to connect using Compass. First, install Compass. Then, run it. You’ll see a screen like the one below.

![mongodb](./images/mongodb-1.png)

Write `mongodb://localhost:27017` in the URI field and press the connect button. Your database will connect.

Now, let’s see how to connect using the command line. Follow the steps in [MongoDB Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). After completing the steps, open PowerShell or your command line. Type `mongod` and press enter. Your database will connect.

To work with Mongoose, we first need to install Mongoose by writing `yarn add mongoose`. Now, let's see how Mongoose works.

First, we need to understand the basic tasks of a database: CRUD (Create, Read, Update, Delete). How can we perform these tasks? By creating a schema for the data. Why do we need a schema in MongoDB if it's schemaless? There are several points to consider:

- Storing data in the database is expensive. Without data validation, storing junk data increases costs unnecessarily. We use schemas to ensure only meaningful data is stored.
- As developers, we understand the need for certain constraints. Just as TypeScript provides limitations that help prevent errors by enforcing data types, Mongoose provides structure, relationships, and validation systems for structured data in MongoDB.

Another nice term for a schema is Entity. In SQL courses or work, you’ll encounter the concept of an Entity Diagram, which looks like the image below.

![Entity Diagram](./images/entity-diagram.png)

Highlighted above are table names. When working with SQL, these are tables; with NoSQL, they are collections. SQL databases require a primary key (PK), but NoSQL databases don’t. Next are the properties, and you can specify data types if you wish. You’ll also see various connecting lines indicating relationships: One to One, One to Many, Many to Many. Let’s understand these relationships:

- **One to One Relationship** - One user has one profile, and one profile belongs to one user.
- **One to Many Relationship** - One user can have many posts, but each post belongs to one user.
- **Many to Many Relationship** - A course can be created by multiple people, and each person can create multiple courses.

Now, let's work with Mongoose by creating a JavaScript file. The [Mongoose documentation](https://mongoosejs.com/docs/guide.html) is extensive. If we understand it well, working with databases will become much easier. First, we'll import Mongoose in our file and connect according to the documentation.

```js
// index.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-demo');
```

Here, `mongo-demo` is the name of our database. You can replace it with any name you like. The documentation stops here, but we will go a bit deeper. This function returns a promise, so we can use then-catch blocks.

```js
// index.js

const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	});
```

We have added a message to indicate when the database is connected and included a catch block for errors. Let's run the code to see if our database connects. If you see 'Database connected' after running, it means your database is connected. If you check Compass, you'll see nothing under mongo-demo because the database is connected but not closed, so it just stays connected without doing anything. We need to close it after connecting. You still won't see anything because no data has been created yet. Once you create data, it will appear.

```js
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

After connecting to the database, we will do all our tasks inside the then block.

If there's an error in the database, for example, if we make a mistake in the connection string, Mongoose will keep trying to connect until its default timeout is reached, then it will throw an error. We want it to give an error immediately if there's a mistake. Mongoose has a system for this. We can set this timeout as an argument in the connect method.

```js
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo', {
		serverSelectionTimeoutMS: 10,
	})
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

You will see an instant error. But setting such a low timeout is not good because not everyone has the same internet speed. If someone with slow internet tries to connect to our database, they will get an error after just 10 milliseconds. So, we should set a logical timeout to allow those with slow internet to connect.

Next, let's go to Mongoose's official documentation. The first thing we need to know when working with Mongoose is the schema. To create a model, we need a schema. This means the most important element in Mongoose is Schemas. Next is SchemaTypes, which is related to schemas. Connections are not very important right now, but we will need them for error handling in production. After that, there are Models, which are created from schemas. We don't work directly with schemas; schemas are just definitions of what our data will look like. Models are created from schemas, and we work with those models. The model mentioned in the MVC (Model View Controller) pattern is the same model here. Then there are Documents, which refer to the data we get back after a query or the data returned after inserting something new. It's essentially a JSON object storing all our information. A document can have subdocuments, and Mongoose allows us to work with subdocuments properly and flexibly, which MongoDB does not. When we query, we will work with documents and subdocuments. Then there are Queries, followed by Validation. This comes into play when we want to insert or update data. For example, you don't want to store an empty string as a name, but a user has entered an empty string. You don't want to store that in the database, and that's where validation comes in. After that, there's Middleware, similar to Express middleware. After sending data from the server to the database, we can transform or delete that data before saving it in the database. Then there's the most important system, Populate. To work with relationships, we need to work with populate. Discriminators are not very important. Plugins are important in some cases; we can create custom plugins to work with. Transactions are an advanced concept we will learn about later. For example, when withdrawing money from an ATM, after inserting the card, entering the password, and selecting the amount, your money is deducted. If there's a problem while dispensing the money, the money is deducted but not dispensed. There are two ways: either the money is deducted after dispensing, or if there's a problem, the money is reversed. Transactions are used for operations that depend on each other to either return success if both succeed or rollback if one fails.

We will start with SchemaTypes. First, we need to know which data types can be used. They are listed below.

![SchemaTypes](./images/schematypes.png)

The format for writing SchemaTypes is given in the documentation, with a snapshot below.

![example](./images/example.png)

Now, let's create a schema in our file. We will create a schema for a person as follows.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({});

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo', {
		serverSelectionTimeoutMS: 10,
	})
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

Mongoose is a class. We will create a schema using new mongoose.Schema(). We need to pass an object to define what will be included in this schema. It will contain a person's first name, last name, email, age, bio, and marital status.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	bio: String,
	single: Boolean,
});

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

We have created our schema. Now, let's create a model.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

Next, we will insert data into our database. This must be done inside the then block. First, let's see the output by passing an empty object without any data.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
		const person = new Person({});
		await person.save();
		console.log('Person created');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```


Now, let's see what is saved in the database. You can check it in Compass. I am using the MongoDB VS Code extension and showing the output from there.

![Database](./images/database-1.png)

As you can see, there is nothing except the ID. Now, let's try with the first name and last name.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
		const person = new Person({
		        firstName: 'Aditya',
       			lastName: 'Chakraborty'
		});
		await person.save();
		console.log('Person created');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

![db2](./images/db-2.png)

Now, we can see only the first name and last name are saved. We can input any data here because we haven't done any validation. Without validation, users can enter incomplete data, which we don't want. So, let's add some validation options in our schema.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	lastName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.endsWith('.com');
			},
			message: 'Invalid email formats',
		},
	},
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');

		await person.save();
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

For the first name, we have set the data type as String, required it with `required: true`, and set minimum and maximum lengths. The same applies to the last name. For the email, we have set it as a required String with a validation function to check if it ends with '.com'. Other fields like age, bio, and single don't need validation. We want users to provide at least their first name, last name, and email.

Now, let's see what happens if we provide all fields except the email.


Now, let's see what is saved in the database. You can check it in Compass. I am using the MongoDB VS Code extension and showing the output from there.

![Database](./images/database-1.png)

As you can see, there is nothing except the ID. Now, let's try with the first name and last name.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://loclhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
		const person = new Person({
		        firstName: 'Aditya',
       			lastName: 'Chakraborty'
		});
		await person.save();
		console.log('Person created');
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

![db2](./images/db-2.png)

Now, we can see only the first name and last name are saved. We can input any data here because we haven't done any validation. Without validation, users can enter incomplete data, which we don't want. So, let's add some validation options in our schema.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	lastName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.endsWith('.com');
			},
			message: 'Invalid email formats',
		},
	},
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');

		await person.save();
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

For the first name, we have set the data type as String, required it with `required: true`, and set minimum and maximum lengths. The same applies to the last name. For the email, we have set it as a required String with a validation function to check if it ends with '.com'. Other fields like age, bio, and single don't need validation. We want users to provide at least their first name, last name, and email.

Now, let's see what happens if we provide all fields except the email.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	lastName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.endsWith('.com');
			},
			message: 'Invalid email formats',
		},
	},
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
		const person = new Person({
			firstName: 'Aditya',
			lastName: 'Chakraborty',
			age: 30,
			bio: 'Backend Developer',
			single: true,
		});
		await person.save();
		console.log('Person created');
		console.log(person);
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

You will see it won't save in the database and will throw a big error like the one below.

![error](./images/error.png)

Now, let's see what happens if we provide all fields correctly.

```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	lastName: {
		type: String,
		required: true,
		minlength: [3, 'Minimum 3 chars'],
		maxlength: [20, 'Maximum 20 chars'],
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return v.endsWith('.com');
			},
			message: 'Invalid email formats',
		},
	},
	age: Number,
	bio: String,
	single: Boolean,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect('mongodb://localhost:27017/mongo-demo')
	.then(async () => {
		console.log('Database connected');
		const person = new Person({
			firstName: 'Aditya',
			lastName: 'Chakraborty',
			email: 'aditya@example.com',
			age: 30,
			bio: 'Backend Developer',
			single: true,
		});
		await person.save();
		console.log('Person created');
		console.log(person);
	})
	.catch((e) => {
		console.log(e);
	})
	.finally(() => {
		mongoose.connection.close();
	});
```

Now, it will be successful, and the data will be created in the database.

![success](./images/success.png)
![db-3](./images/db-3.png)

Today, we learned how to connect to the database using Mongoose, create schemas, create models, and validate data. This is the last class of the previous backend lessons. Next, we will return to our attendance model project. Your task is to study and practice Schemas, SchemaTypes, Connections, Models, Documents, Subdocuments, Queries, and Validation from the [MongooseJs Docs](https://mongoosejs.com/docs/).

## Resource for this lecture

All the resources for this lecture can be found [Lecture 20](../../resources/lecture-20/README.md).

## Source Code

The source code for this lecture can be found at this [link](../../src/mongo-demo/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

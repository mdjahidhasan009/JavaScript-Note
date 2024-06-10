
# Lecture 22 - Authentication System from Pseudo Code to Real Code

In [Lecture 13](../Lecture-13/README.md), we created the model for the attendance system project and wrote the pseudocode for the registration and login processes of authentication. The pseudocode for these, along with the reset password process, is given below. We will then convert this pseudocode into code.

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

**Reset Password:**

```txt
Start
new-password = Input()
old-password = Input()
TODO

if old-password not equal to user.hash password:
   return 400 error
else hashNewPassword = hash new-password
   save hashNewPassword
   return 201
End
```

Many might wonder why we create models. To answer this question, we need to understand databases a bit. What is the relationship between models and databases? We often hear the term MVC. M stands for Model. A model is the shape of our data. How we store data in the database is defined by the model. We could work directly with the database. For instance, MongoDB returns JSON. We can convert that JSON into a JavaScript object and work with it. This means we can work smoothly with MongoDB without any intermed...

Now, our system does not have a database. We need to connect to the database first; otherwise, we won't be able to store data. How to connect to the database was shown in detail in [Lecture 20](../Lecture-20/README.md). For those who had trouble installing, a video showing the installation system has been provided. You can refer to it.

We will create a file named db.js in our folder. In it, we will connect to the database using Mongoose. You already know how to connect as shown in the previous lecture.

```js
// db.js

const mongoose = require('mongoose');

function connectDB(connectionStr) {
	return mongoose.connect(connectionStr);
}

module.exports = connectDB;
```

Here, we are not directly connecting Mongoose. We are creating a function that we can use to connect wherever needed in the application.

Next, we will import this function into server.js.

```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});
```

Now, let's connect to the database.

```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

Now, let's look at the drawings we made for the registration process in Lecture 12.

![registration](./images/registration-process.jpg)

Our first task is to handle the /register route. We can handle it separately in the routes folder. However, for now, we will handle it in server.js. We will convert the pseudocode we wrote into code.

```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.post('/register', async (req, res, next) => {});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

Our pseudocode shows that the name, email, and password will come from somewhere. An input in a request can come from mainly five places:

- req Body
- req Param
- req Query
- req Header
- req Cookies

The data sent from the user form usually comes from the body of the request. First, let's see what is in our body. You can send the request using Postman. I am using the Thunder Client extension in VS Code.


```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	console.log(req.body);
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

![register1](./images/register1.png)

Now, the router can handle what we wrote in the body, but it won't send any response back. This is because we haven't written any code to send a response. So, what it will do is hang and log the data we wrote in the body to the console. Let's see that for now.

![reg2](./images/reg-2.png)
![console](./images/console.png)

As you can see, when we send the request, it keeps spinning, and the body is logged to the console. We wrote a middleware named express.json() to log the body. Now, let's get the name, email, and password from the body.

```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

We used object destructuring. Now, let's do data validation. The pseudocode says that if any input is not provided, it will return 400.

```js
// server.js

const express = require('express');
const connectDB = require('./db');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid Data' });
	}
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```


If any of the three inputs are not provided, it will return the message `{ message: 'Invalid Data' }`.

![reg-3](./images/reg-3.png)

As you can see, not providing the password shows `{ message: 'Invalid Data' }`. Now, we've handled what happens if the data is invalid. This is a pattern called the error-first pattern. The error-first pattern means handling all possible errors first. Now, let's write what will happen if the data is valid. The pseudocode says to find the user using the email. This means checking the email provided by the user. If the email exists, we won't allow account creation. If it doesn't exist, we'll assume the user is new and allow account creation. Now, to find the user, where is the user? In the database. And communicating with the database is the responsibility of the model. Once the model is created, Mongoose's job is done. Creating the model means Mongoose has given all its power to the model. From now on, we can work with the model. We will bring our User model to our server. There is a method in MongoDB called `findOne` to find anything. We will use that to find the email from the user model.

```js
// server.js

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid Data' });
	}

	let user = await User.findOne({ email });
	if (user) {
		return res.status(400).json({ message: 'User already exists' });
	}

	user = new User({ name, email, password });
	await user.save();

	return res.status(201).json({ message: 'User Created Successfully', user });
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

As you can see above, if the email exists, it will return a 400 status. If it doesn't exist, it will create a new user with the name, email, and password for now. And it will save it to the database. Once the user is saved, we return the created user. Now, let's check.

![reg-4](./images/reg-4.png)

As you can see, it gave us a success message. If we check the database, we will see it is saved there as well.

![db-1](./images/db-1.png)

Now, there is a problem here; we can easily see the password. If someone gets access to our database, they can easily hack our account. To solve this, we need to hash the password. There is a library called `bcrypt` for this. First, we will install it. Then we will import it into our server.

```js
// server.js

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid Data' });
	}

	let user = await User.findOne({ email });
	if (user) {
		return res.status(400).json({ message: 'User already exists' });
	}

	user = new User({ name, email, password });

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	user.password = hash;

	await user.save();

	return res.status(201).json({ message: 'User Created Successfully', user });
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

First, we need to specify how many rounds of password hashing we want. We set it to 10. Then we hash the password and save the hashed password as the password. Let's check it now.

Notice that when we sent the request with an existing email, it returned an error.

![reg-5](./images/reg-5.png)

Now, let's try with a different name and email.

![reg-6](./images/reg-6.png)
![reg-6](./images/db-2.png)

As you can see, the password is hashed. Even if we get this password, we cannot log in with it, and it is impossible to retrieve our password from it.

We will use validation in the user model as we did in the previous class.

```js
// User.js

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 10,
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: (prop) => `Invalid Email: ${prop.value}`,
		},
	},
	password: {
		type: String,
		minlength: [6, 'Password is too short'],
		required: true,
	},
	roles: {
		type: [String],
		required: true,
		default: ['STUDENT'],
	},
	accountStatus: {
		type: String,
		enum: ['PENDING', 'ACTIVE', 'REJECTED'],
		default: 'PENDING',
		required: true,
	},
});

const User = model('User', userSchema);

module.exports = User;
```

I don't think there's a need to analyze these further. Just a word about enum: enum is an array that will not accept any value other than the values within it.

You can check these validations in Postman or Thunder Client as you like.

Now, we will create a global error handler in our server so that if there is any server-related error, it will show it. We will also bring our routes into a try-catch block and send the request to the global error handler in the catch block.

```js
// server.js

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid Data' });
	}

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}
		user = new User({ name, email, password });
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;
		await user.save();
		return res.status(201).json({ message: 'User Created Successfully', user });
	} catch (error) {
		next(error);
	}
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Server Error Occurred' });
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

Now, we will work on the login route.

```js
// server.js

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

app.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid Data' });
	}

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}
		user = new User({ name, email, password });
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;
		await user.save();
		return res.status(201).json({ message: 'User Created Successfully', user });
	} catch (error) {
		next(error);
	}
});

app.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid Credential' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credential' });
		}

		delete user._doc.password;
		return res.status(200).json({ message: 'Login Successful', user });
	} catch (e) {
		next(e);
	}
});

app.get('/', (req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.listen(4000, () => {
	console.log("I'm listening on port 4000");
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Server Error Occurred' });
});

connectDB('mongodb://localhost:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
```

According to the pseudocode, we took the email and password from the body. Then we will check if the email matches. If it doesn't match, it will return an error. If it matches, it will then check if the password matches. To compare the password, we will use bcrypt.compare(). If the password doesn't match, it will return an error. If it matches, it will return a success message along with the user object. Now, I don't want to show the hashed password to the client. So, we will delete our password before r...

Let's try and see if our code works.

![login](./images/login-1.png)

It works. Notice that the password is not shown in the object because we deleted it before returning the response.

If the password is incorrect, it returns an error. This means our code is working.

![login](./images/login-2.png)

The login pseudocode mentions generating a token. We will do that in the next class.

We will also work on the reset password in the next class.

## Resource for this lecture

All the resources for this lecture can be found [Lecture 22](../../resources/lecture-22/README.md).

## Source Code

The source code for this lecture can be found at this [link](../../src/lecture-22/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

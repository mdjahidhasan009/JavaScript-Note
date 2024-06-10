
# Lecture 23 - Implement JWT and Refactor The Project Structure

We completed all the authentication tasks in the last class. The only thing left was generating a JWT Token. We will see that today.

To work with JWT, we first need to understand what JWT is and why it is used. Why not use session cookies?

In the current API era, what is happening? We are fetching data from Facebook, Google, AWS, and merging them into one application. For example, if we are building a weather application, we are fetching weather data from different sources. If we are building a banking system application, we are gathering data from various bank servers. If we want to store session cookies on their servers, they won’t allow us. And even if we stay on their servers, we can’t verify it. So, we need a system that allows us to easily verify that we are verified users in a portable way. This is why tokens are used, which we call JSON Web Tokens (JWT). This is an industry standard, used by everyone. It is not a hashed or encrypted system. It is open, meaning it is encoded. Encoded means it looks different but the data is open. It is possible to decode it and get the correct data. But it is never possible to retrieve the original data from hashed or encrypted data. Just like we hashed the password, it is never possible to retrieve it. But in this case, the data is encoded.

Now we will generate a JWT. There is a package called [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). We will install it in our application. Then we will import it into our server.

Next, we will generate a token. To generate a token, we will use the jwt.sign() method. We can pass the user information that is not secret as arguments to the payload. Here we will pass `user._doc` because we saw in the last class that all user data is stored in `_doc`. As the second argument, we need to use jwt.Secret key. The secret key used here will also be used for verification later. This is very important. If this secret key is exposed, anyone can gain access to our system. Anyone can assign a token, and using that token, they can log in. So, this key needs to be kept very secure. Although we will keep this key in the most insecure way now. Then as the third argument, we can pass an object with various options. We can change our preferred algorithm. By default, the HS256 algorithm is used, which is very strong, so we don’t need to worry about it. We don’t need to customize anything right now. We will keep the default system. **However, for future reference, note that you should not use the algorithms starting with RS. They have had some issues. They are not very good.**

```js
const express = require('express');
const connectDB = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

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

		const token = jwt.sign(user._doc, 'secret-key');

		return res.status(200).json({ message: 'Login Successful', token });
	} catch (e) {
		next(e);
	}
});

app.get('/', (_req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.use((err, _req, res, _next) => {
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

Just writing this much code will generate a token for us. Basically, we need this token now. Instead of sending the user object in the response message, we will send the token. The remaining work of our login is complete. Now let’s see what happens after doing this work. First, we need to run the server. Then we will send our request through Postman or Thunder Client. We will see that the user object we received earlier has been replaced with some gibberish in the token property. This gibberish is our generated token.

![token](./images/token-1.png)

Now this token is not secure at all. If we copy this token and paste it into [jwt.io](https://jwt.io/), we will see all the information we provided.

![decode](./images/decode.png)

You see, it shows our entire user object. There is no password because we deleted the password before generating the token. The data is available here, but it doesn’t mean that someone else can verify this data from another server. They can’t do it unless the secret key in our sign method matches. Now we can do some work with this token. Where can we do it? In the third argument object. For now, we will work with expiresIn. We told it to generate a token only for 2 hours.


```js
const express = require('express');
const connectDB = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

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

		const token = jwt.sign(user._doc, 'secret-key', { expiresIn: '2h' });

		return res.status(200).json({ message: 'Login Successful', token });
	} catch (e) {
		next(e);
	}
});

app.get('/', (_req, res) => {
	const obj = {
		name: 'Ayman',
		email: 'ayman@example.com',
	};
	res.json(obj);
});

app.use((err, _req, res, _next) => {
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

Now, if we log in again, we will see that a new token has been generated. Every time we log in, a token will be generated. It will not match the previous one. If we decode it now, we will see that an extra property has appeared. It is "exp", which means when it will expire.

![decode](./images/decode-1.png)

Although the time is not understandable. If you go to the console and write `new Date(1656580042 * 1000)`, you will see when it will expire. The reason for multiplying by 1000 is that this time is in seconds. Our Date object counts in milliseconds. To convert to milliseconds, we multiplied by 1000.

![date](./images/date.png)

Now let's discuss JWT. If you go to [JWT Introduction](https://jwt.io/introduction), you will see an overview of JWT. It shows that JWT is used for authorization and information exchange. At the beginning, there is a Header which tells us what algorithm is used. Then there is the Payload, which contains the user’s basic information that the frontend developer can use to extract information. Finally, there is the Signature, which is very secure and we don’t have to deal with it. Our work is mainly with the payload. You should read the [JWT Introduction](https://jwt.io/introduction) link carefully. It explains everything in detail.

Now we want to create a private route to see how the login system works. We will create a get route in our server below the login route and before the '/' route. I am not showing the whole file here. You will find the source code link at the end of this article.

```js
// server.js

app.get('/private', (req, res) => {
	return res.status(200).json({ message: 'I am a private route' });
});
```


If we go to the browser and search for `localhost:4000/private`, we will see this message. But this shouldn't happen since our system is private. Now we will create a public route to understand how private and public routes work.

```js
app.get('/private', (req, res) => {
	return res.status(200).json({ message: 'I am a private route' });
});

app.get('/public', (req, res) => {
	return res.status(200).json({ message: 'I am a public route' });
});
```

If we send a request, it will give this message. Now how can we make a route private? If the token does not come in the request headers, we will not allow access to that route. We will not let it reach the return statement. In the last class, we saw that data can come from the request in many ways. One such system is the request body. But how can we get the body in a get request? The solution here is the request header. Let’s log the headers to the console and see what we get.

```js
app.get('/private', (req, res) => {
	console.log(req.headers);
	return res.status(200).json({ message: 'I am a private route' });
});
```

We will see an object.

![header](./images/header.png)

Now where did this object come from? We didn’t send it. It came from the browser. If you go to the network tab in the inspect tool, you will see these as headers. Now we need to pass the token as a header. We can’t do this from the browser at the moment, but we can from Postman. Once our application is ready from the browser, we can send it. In the case of JWT, it will be in the authorization key of the header. Let’s log this and see.

```js
app.get('/private', (req, res) => {
	console.log(req.headers.authorization);
	return res.status(200).json({ message: 'I am a private route' });
});
```

We will see it returns undefined. Now, if it is undefined, we will not let it go further. Let's write a condition.

```js
app.get('/private', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	return res.status(200).json({ message: 'I am a private route' });
});
```

Now you won’t be able to enter the private route. It will give you `{ message: 'Unauthorized' }` if you try to access it.

![pvt](./images/pvt.png)

Now what if we pass the token here? We need to give it in the Authorization property in the header.

![auth](./images/auth.png)

Now see, giving the token in Authorization, it is getting access to the private route. Although we haven’t verified it in the backend yet. We have just ensured that it won’t go further if there is no token.

There is another way, which is actually the formal way and the way we usually work. That is to give it as a bearer token in Authorization.

![bearer](./images/bearer.png)

```js
app.get('/private', (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	console.log(token);
	return res.status(200).json({ message: 'I am a private route' });
});
```

If we print the token this way, we will see that the console shows "Bearer" before the token with a space in between. This is a convention. This works for us in Postman or Thunder Client. But when we work on the frontend, we will add it ourselves. This is a convention. It doesn’t matter if it is added or not.

So far we have worked on what happens if the token is not found. Now if it is found, we need to verify whether it is the token we generated. For this, there is a method called verify in the jsonwebtoken package. We will use it to verify. First, we need to remove the word "Bearer" from the token. Then we will verify that token, otherwise, it will show an error.

```js
app.get('/private', (req, res) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		token = token.split(' ')[1];
		const user = jwt.verify(token, 'secret-key');
		console.log(user);
	} catch (e) {
		return res.status(400).json({ message: 'Invalid Token' });
	}

	return res.status(200).json({ message: 'I am a private route' });
});
```

If the token is correct, it will give the response below.

![tkn1](./images/tkn-1.png)

If the token is wrong, it will give the response below.

![tkn2](./images/tkn-2.png)

Now, there is another problem. If someone somehow gets our secret key, they can generate a token. Now generating a token alone won’t work. We need to see if the user ID matches. We will try to find the user in the database with the ID.


```js
app.get('/private', async (req, res) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return res.status(200).json({ message: 'I am a private route' });
    } catch (e) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
});
```

In the case of a public route, there is no token, and there is no issue.

Now, if we look at our requirement analysis, we will see that most of the routes are private routes. If we create a private route for each one, you can understand how much code repetition there will be. And repetition of code is not the main issue. The issue is what happens if there is a mistake or an update. To solve this problem, we will create a controller, which we call middleware. The basic difference between a controller and middleware is that middleware will send authorized data to the controller only if it receives it. Otherwise, it will return straight from there. Now we will create a folder named middleware in our server folder. In this folder, we will create a file named authenticate.js and create a middleware function in it. And we will export this.

```js
function authenticate(req, res, next) {}

module.exports = authenticate;
```

Now we will move the function we wrote in the private route from our server to our middleware function. We will only keep one line in our private route, which is `return res.status(200).json({ message: 'I am a private route' });`.

```js
// authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
}

module.exports = authenticate;
```

Here, how will the controller understand that there is a user object in the request? The req object is a mutable object. You can add any property to it. So we put the user inside it. Finally, we called next().

Now we will use this middleware in our server.

```js
// server.js
const authenticate = require('./middleware/authenticate');

app.get('/private', authenticate, async (req, res) => {
    console.log('I am authenticated', req.user);
    return res.status(200).json({ message: 'I am a private route' });
});
```

Now you can send a request and check. You will see it is working.

If the token expires, what will happen? You can check by reducing the time. If it expires, it will show an invalid token. It will not work.

Now we can create thousands of private routes using this middleware.

One of the most challenging tasks of our application is complete.

We will work with many routes, and if everything is in one file, it will be a mess to maintain later. Now we have to refactor the code.

First, we will create a directory named routes. Then we will create a controller directory. After that, we will create a service directory.

First, let's separate our controllers. A controller is the functions written inside the routes. Now create a file named auth.js in the controller directory. We will cut and paste the functions of the register and login routes here and export them.



```js
app.get('/private', async (req, res) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		token = token.split(' ')[1];
		const decoded = jwt.verify(token, 'secret-key');
		const user = await User.findById(decoded._id);

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		return res.status(200).json({ message: 'I am a private route' });
	} catch (e) {
		return res.status(400).json({ message: 'Invalid Token' });
	}
});
```

In the case of public routes, there is no need for tokens, no hassle.

Now, if we look at our requirement analysis, we see that most of the routes are private routes. If we try to create a private route for each of them, think of how much code repetition will occur? Code repetition is not the main issue; the issue is what happens if there is a mistake or an update. To avoid this problem, we will create a controller, which we call middleware. The basic difference between a controller and middleware is that middleware will send the request to the controller only if it receives authorized data. If not, it will directly send a response back from there. Now we will create a folder named `middleware` in our server folder. In this folder, we will create a file named `authenticate.js`

```js
function authenticate(req, res, next) {}

module.exports = authenticate;
```

Now we will move the function we wrote in the server's private route to our middleware function. We will only keep one line in our private route, which is `return res.status(200).json({ message: 'I am a private route' });`.

```js
// authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
	try {
		let token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		token = token.split(' ')[1];
		const decoded = jwt.verify(token, 'secret-key');
		const user = await User.findById(decoded._id);

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		req.user = user;
		next();
	} catch (e) {
		return res.status(400).json({ message: 'Invalid Token' });
	}
}

module.exports = authenticate;
```

How will the controller know that this request has a user object? The req object is a mutable object. You can add any property to it. So, we put the user in it. Finally, we call next().

Now we will use this middleware in our server.

```js
// server.js
const authenticate = require('./middleware/authenticate');

app.get('/private', authenticate, async (req, res) => {
	console.log('I am authenticated', req.user);
	return res.status(200).json({ message: 'I am a private route' });
});
```

Now you can check by sending a request. You will see it is working.

Now, if the token expires, what will happen? You can check by reducing your time. If it expires, it will show an invalid token. It will not work.

Now we can create thousands of private routes with this middleware.

One of the most difficult tasks in our application is completed.

We will work with many routes; if everything is in one file, it will be a disaster to maintain later. We need to refactor the code now.

First, we will create a directory named `routes`. Then we will create a `controller` directory. After that, we will create a `service` directory.

First, we will separate our controllers. A controller is just the functions inside the route. Now let's create a file named `auth.js` in the `controller` directory. Cut and paste the functions of the register and login routes here and export them.

```js
// auth.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res, next) => {
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
};

const loginController = async (req, res, next) => {
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

		const token = jwt.sign(user._doc, 'secret-key', { expiresIn: '2h' });

		return res.status(200).json({ message: 'Login Successful', token });
	} catch (e) {
		next(e);
	}
};

module.exports = { registerController, loginController };
```

Now we will use this controller in our server.

```js
// server.js
const { registerController, loginController } = require('./controller/auth');

app.post('/register', registerController);

app.post('/login', loginController);
```

If the application runs without any errors, we can assume our refactor is correct. Now we want to keep the routes in the `routes` folder.

We will create two files in the `routes` folder named `auth.js` and `index.js`. The authentication routes will be in `auth.js`.

```js
// routes/auth.js

const router = require('express').Router();
const { registerController, loginController } = require('../controller/auth');

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
```

If you notice, our routing system is very bad. Routes are directly with the domain name. This is not done in large applications. Prefixing is done. We can write like `/api/v1/auth/register`, `/api/v1/auth/login`. But if there are a thousand routes, it will be a problem. So, we will create a route in the index file in the `routes` folder for prefixing.

```js
// routes/index.js

const router = require('express').Router();
const authRoutes = require('./auth');

router.use('/api/v1/auth', authRoutes);

module.exports = router;
```

We import this route in our server.

```js
const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);
```

Now we will write our routes like in the picture below. We tested to see if everything is okay. Since we can log in, it means everything is fine.

![v1](./images/v1.png)

Now the way we wrote our controller function is not the purpose of the controller. The controller will only take requests, and someone else will handle them on its behalf, after which it will respond back. Working with business logic is not the controller's job. So, we will extract these from the controller. We will go to the `service` folder. There we will create two files named `auth.js` and `user.js`. We will keep the matters of the auth controller in `auth.js`. And since there are issues related to user data updates, we will keep them in `user.js`.



```js
// service/auth.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerService = async ({ name, email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
};

const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid Credential' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credential' });
    }

    delete user._doc.password;

    const token = jwt.sign(user._doc, 'secret-key', { expiresIn: '2h' });
};

module.exports = { registerService, loginService };
```

Now let's clean up our auth controller. One thing to keep in mind is that we will only use the services that we are working on in the controller. We will not use other services. Here we are working with the auth controller, so we will use the auth service, not the user service. One service can use another service, which is not a problem.

Our controller has now become very clean, see.

```js
// controller/auth.js

const { registerService, loginService } = require('../service/auth');

const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid Data' });
    }
    try {
        const user = await registerService({ name, email, password });
        return res.status(201).json({ message: 'User Created Successfully', user });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await loginService({ email, password });
        return res.status(200).json({ message: 'Login Successful', token });
    } catch (e) {
        next(e);
    }
};

module.exports = { registerController, loginController };
```

Our auth service contains some tasks related to the User model, such as fetching the user from the database. These are the responsibilities of the user service, not the auth service. Therefore, we will move these tasks from the auth service to the user.js file. We will write functions in user.js to find a user and create a new user.

```js
// service/user.js

const User = require('../models/User');

const findUserByProperty = (key, value) => {
    if (key === '_id') {
        return User.findById(value);
    }
    return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password }) => {
    const user = new User({ name, email, password });
    return user.save();
};

module.exports = {
    findUserByProperty,
    createNewUser,
};
```

Now let's refactor our register service in the auth service.

```js
// service/auth.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByProperty, createNewUser } = require('./user');

const registerService = async ({ name, email, password }) => {
    let user = await findUserByProperty('email', email);
    if (user) {
        const error = new Error('User already exists');
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash });
};

module.exports = { registerService };
```


# Let's see if our refactored code works.

![new-reg](./images/new-reg.png)
![new-db](./images/new-db.png)

The code works and it is also saved in the database.

Now let's work on the login service a bit.

```js
// /service/auth.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByProperty, createNewUser } = require('./user');

const registerService = async ({ name, email, password }) => {
    let user = await findUserByProperty('email', email);
    if (user) {
        const error = new Error('User already exists');
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
    const user = await findUserByProperty('email', email);

    if (!user) {
        const error = new Error('Invalid Credential');
        error.status = 400;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid Credential');
        error.status = 400;
        throw error;
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };

    return jwt.sign(payload, 'secret-key', { expiresIn: '2h' });
};

module.exports = { registerService, loginService };
```

Now let's see if our code works.

![new-login](./images/new-login.png)

It works perfectly.

But we had to write the same error handling code every time in our auth service. For that, we can simply create a utility function. We will create a folder named utils. There we will create a file named error.js. Then we will write our error handling code there.

```js
// /utils/error.js

function error(msg = 'Something Went Wrong', status = 500) {
    const e = new Error(msg);
    e.status = status;
    return e;
}

module.exports = error;
```

Now we will use this in our auth service.

```js
// /service/auth.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { findUserByProperty, createNewUser } = require('./user');

const registerService = async ({ name, email, password }) => {
    let user = await findUserByProperty('email', email);
    if (user) {
        throw error('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
    const user = await findUserByProperty('email', email);

    if (!user) {
        throw error('Invalid Credential', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw error('Invalid Credential', 400);
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };

    return jwt.sign(payload, 'secret-key', { expiresIn: '2h' });
};

module.exports = { registerService, loginService };
```

We will work a bit on the global error handler that we had in the server.

```js
// server.js

app.use((err, _req, res, _next) => {
    console.log(err);
    const message = err.message ? err.message : 'Server Error Occurred';
    const status = err.status ? err.status : 500;

    res.status(status).json({
        message,
    });
});
```

Now our code is 100% reusable. It is written in a very organized manner. If there is any error, it will be very easy to find out where the error occurred.

## Source Code

You can find the source code for this lecture at this [link](../../src/lecture-23/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

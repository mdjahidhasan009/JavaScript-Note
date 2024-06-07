
# Lecture 16 - [Backend 3] Understand Express Middleware

In the last class, we created a backend step pipeline. It looked like this:

REQUEST -> MIDDLEWARE[logger, body parser, file parser, user ip, block ip, authentication, authorization, validation] -> CONTROLLER (Business Logic) -> MIDDLEWARE[error handler] -> RESPONSE

First, we send the request. Then we pass through many middlewares. Then the controller. After that, there may be another middleware for error handling. Finally, the response is sent back. We have understood the concepts of request and response fairly well. But we still have issues with middleware and controller. Those who have watched the [Express Js Crash Course In Bangla](https://youtube.com/playlist?list=PL_XxuZqN0xVDm9HkiP4h_76qNBZix6XME) might understand a bit. Those who have completed the playlist have practically learned 75% of the backend. And if you can learn the remaining 25%, you can build 90% of the backend applications in the world.

Whether we use Express, Laravel, Django, Spring Boot, Flask, Nest, or Ruby on Rails for backend work, we need to use this pipeline everywhere. So if we can learn this pipeline well, we can work with any backend framework in the world. Because we will have the concept. The rest we can learn by reading the documentation. If we can learn Express, working with other frameworks becomes easier. In some frameworks, certain tasks are pre-done. For example, in Nest, request and response are handled automatically. You just need to work with the controller. In Express, we will do everything ourselves. If we know everything, switching to any other framework will be easy.

Databases have no direct connection with the application. If we want to store our data for future use, then we will connect a database to our application. Otherwise, we don't need a database. There are many applications in the world where databases are not needed at all.

Today's discussion topics are given below:

- Middleware
- Project Structure
- Project

In this playlist, the template engine used was ejs. But nowadays, almost all applications are single-page, so we need frameworks like React, Vue, Angular. We no longer need template engines like ejs, handlebar, pug, etc. We are working with nodejs, meaning we are building an API. So our main focus will be on the API. And we have frameworks like React and Vue for the frontend.

Now let's come to what middleware is.

- What is Middleware?

It is a function. What kind of function? It is a controller function. We wrote a function in the last class.

```js
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
```

There is no basic difference between this function and a middleware function. Middleware can send a response from anywhere.

Req -> M1 -> M2 -> M3 -> Res

Here, M1 has the same power, M2 has the same power, M3 has the same power, and the response also has the same power. If everyone has the same power, why are there different middlewares? The reason for different middlewares is their responsibility. If we wanted, we could do all these tasks with the response without creating these three middlewares. We could have created the response with the first middleware M1 itself. So why are we creating middleware? The concept of middleware comes from the DRY (Don't repeat yourself) principle. We have to do many tasks. These tasks are the same for every request. So should we write these codes for every request repeatedly? Or should we write them once somewhere and reuse them wherever needed? Of course, we will reuse the code. This reusable code is kept in a function. This function is called middleware. I will write it once. But if I want, I can use it for all requests, or I can use it for some routes and not for others. In other words, I have control. Middleware is a kind of controller function.

To create middleware, there is a signature. Let's see it first. Then we will analyze it.

```js
// We will never call it, express will automatically invoke for us.
// This is middleware
function xyz(req, res, next) {
	next();
}

// This is controller
function xyz(req, res, next) {
	res.send();
}
```

We took a function. We will not call this function. We will just pass it as a reference. Express will call this function for us. Now, when Express calls this function, it will give three parameters: req, res, next. Express can call any method of the request and response objects here. We will call the next function. If we do not call it, the middleware will stop after completing all its tasks. It cannot go anywhere else. Suppose in the pipeline above, we received a request. Then it saw M1 next. It handed over everything to M1. Now, M1 processes the request object and checks what is next. If it sees next() written, it will hand over the modified data to the next middleware. If we do not call the next function here, the middleware will stop after completing its processing. Because we did not tell it what to do next. Now there is one thing to understand here. We are saying that middleware is a controller function. What is a controller function? A controller function is one that responds back at the end. It does not go anywhere else. And middleware is one that calls the next() function at the end and hands over the modified data to someone else.

In the last class, we wrote `app.use(express.json())` in server.js. express.json() is a kind of middleware. Interestingly, the routes written in Express are also a kind of middleware. We will discuss them later.

Now let's go to the code. We will create a file named server.js. Then we will create the app by importing express as usual.

```js
const express = require('express');

const app = express();
```

Now we will listen.

```js
app.listen(8000, () => {
	console.log('Application running on port 8000');
});
```

The listen function is usually written at the end of the file. This is a convention. So we will keep it at the end. We will do other work on top of this.

Now our task is to understand how to create middleware and how to create routers. We have already learned how to create routers. Let's create a router first.

```js
const express = require('express');

const app = express();

app.get('/hello', (req, res, next) => {
	res.json({ message: 'Hello' });
});

app.get('/', (req, res, next) => {
	res.json({ message: 'Sweet Home' });
});

app.listen(8000, () => {
	console.log('Application running on port 8000');
});
```



### Logging Middleware Example

If we run the server and hit '/' in the browser, it will display `{ message: 'Sweet Home' }`. If we hit '/hello', it will display `{ message: 'Hello' }`.

Every time I hit these routes, I get the data. However, I want to log these hits in my console. To achieve this, I can add the following line in our two routes:

```js
console.log(`${req.url} - ${req.method} - ${new Date().toISOString()}`);
```

`req.url` refers to our route, `req.method` refers to the request method, and `new Date().toISOString()` gives us the timestamp. If we hit '/' in the browser, the console will output something like `/ - GET - 2022-06-26T07:43:17.067Z`. Similarly, hitting '/hello' will output `/hello - GET - 2022-06-26T07:43:22.746Z`.

I might have 1000 controllers. Do I need to write this line in each of them? Not at all. This is where creating a middleware comes in. We can create a middleware and use it across all routes. Let's create a middleware:

```js
const express = require('express');

const app = express();

const simpleLogger = (req, res, next) => {
    console.log(`${req.url} - ${req.method} - ${new Date().toISOString()}`);
    next();
};

app.get('/hello', (req, res, next) => {
    res.json({ message: 'Hello' });
});

app.get('/', (req, res, next) => {
    res.json({ message: 'Sweet Home' });
});

app.listen(8000, () => {
    console.log('Application running on port 8000');
});
```

Now, how do we use it? There are two ways to use it: globally and locally. Globally means using it for all requests, and locally means using it for specific routes. Let's say we want to use it only for the '/' route. We will use it locally:

```js
const express = require('express');

const app = express();

const simpleLogger = (req, res, next) => {
    console.log(`${req.url} - ${req.method} - ${new Date().toISOString()}`);
    next();
};

app.get('/hello', (req, res, next) => {
    res.json({ message: 'Hello' });
});

app.get('/', simpleLogger, (req, res, next) => {
    res.json({ message: 'Sweet Home' });
});

app.listen(8000, () => {
    console.log('Application running on port 8000');
});
```

Here, we place the middleware before our controller function. We won't call it; Express will call it for us. We only pass the reference to our function. We can place as many middlewares as we want side by side without any problem.

Now, if we want to use this middleware for all routes, do we need to write it inside each route? No need. We can do it globally by writing `app.use(simpleLogger);` before the routes.

```js
const express = require('express');

const app = express();

const simpleLogger = (req, res, next) => {
    console.log(`${req.url} - ${req.method} - ${new Date().toISOString()}`);
    next();
};

app.use(simpleLogger);

app.get('/hello', (req, res, next) => {
    res.json({ message: 'Hello' });
});

app.get('/', (req, res, next) => {
    res.json({ message: 'Sweet Home' });
});

app.listen(8000, () => {
    console.log('Application running on port 8000');
});
```

Now, this will work for all routes. You can check and verify this.

If we want to use two global middlewares, we can do that as well by placing them in an array:

```js
const express = require('express');

const app = express();
```


app.use(express.static(__dirname + '/public'));

const simpleLogger = (req, res, next) => {
	console.log(`${req.url} - ${req.method} - ${new Date().toISOString()}`);
	next();
};

const secondMiddleWare = (res, req, next) => {
	console.log('I am second middleware');
	next();
};

app.use([simpleLogger, secondMiddleWare]);

app.get('/hello', (req, res, next) => {
	res.json({ message: 'Hello' });
});

app.get('/', (req, res, next) => {
	res.json({ message: 'Sweet Home' });
});

app.listen(8000, () => {
	console.log('Application running on port 8000');
});

Now, if we hit, we can see the output of both middlewares in the console.

Let's try to understand the use cases of middleware. For that, we need to go to the Express middleware [documentation](https://expressjs.com/en/resources/middleware.html). Here are some built-in middlewares, let's discuss them.

- body-parser: It is mainly used to send data from the client to the server. It can be an image, file, or a single argument.
- compression: When the size of our response becomes very large, it takes a lot of time. We use this middleware to compress and reduce the response size.
- connect-rid: When we work with microservices, a request circulates through multiple servers. For example, you need an image. The client application requests an image. First, it goes to your authorization server to check authentication and permission, then finds where the image is stored, and finally goes to a storage server to retrieve the image. Although it communicates through multiple servers, it mainly works for one request. Because you generated one request from the client. Here, the request ID is useful. With a request ID, we can verify which requests were generated for the main request. Request ID is useful for filtering. We use this middleware to generate a request ID.
- cookie-parser: If we find a cookie in the request header, it is in string format. This middleware parses the cookie and keeps it as an object in req.cookies.
- cookie-session: When we work with cookies, we also need to manage sessions. This middleware is used for session management.
- CORS (Cross-Origin Resource Sharing): The browser has a behavior where it blocks all client requests to a server if the client and server domains are different. It assumes there might be hacking or other issues. We use this middleware to specify which domains are allowed to access our application.
- csrf: When you submit a form, the form data can be manipulated. Using this middleware, when the form is rendered, the submitted form ID is matched with the rendered form ID. It is used for multi-page applications, not for single-page applications.
- errorHandler: Usually, we handle errors manually for each route. However, some errors are global. This middleware is used to handle those global errors.
- method-override: This middleware can convert one method to another. For example, we can convert the GET method to the POST method.
- morgan: The logger we created doesn't have any functionalities. We don't need to create them either. We can use this middleware for logging.
- multer: This middleware is used to extract data from a form and save it to a file.
- response-time: This middleware is used to measure the time it takes to generate a response. By knowing the response time, we can identify which controller needs more optimization. It is mainly used for performance optimization.
- serve-favicon: When we work with requests or responses, favicons don't go by default. If we need to send favicons separately, we use this middleware.
- serve-index: To serve index files.
- serve-static: If we want to make a file publicly available, we can use this middleware. Suppose we create a directory named public in our project directory and create an index.html file in it.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Hello NodeJS</title>
	</head>
	<body>
		<h1>I am from public directory</h1>
	</body>
</html>
```

We want the user to see this file. If someone enters our address and types /index.html, they will see the contents of this file. To do this, we need to make it public in our server.js using `app.use(express.static(__dirname + '/public'));`.

```js
// Demo Code
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8000, () => {
	console.log('Application running on port 8000');
});
```

Here, you don't necessarily need to name it public. Configure it with the name you provide.

- timeout: Suppose a user is sending a request, but the data is on another server, and it is not responding. After waiting for 10 seconds, we can send a message to the user that the data is not available now, and we are looking into it. This can be done using this timeout.

These are the use cases for built-in middleware. There are more real-time use cases. Suppose you create a form. Now the user can input anything. They might upload a video instead of an image, write age instead of name, or name instead of email. We have no control over it. What can we do? We can create middleware for validation to check some worst cases. It will only allow the correct data to pass; otherwise, it will not accept it. We need to send a message to the user. Before reaching the main controller, everything is checked, and only valid data is allowed. Incorrect data is not allowed to reach the main controller. This is the concept of middleware.

Again, suppose in our application, only logged-in users can like or comment. The middleware will check if the user is logged in before reaching the controller. If logged in, it will go to the controller; otherwise, not.

Let's bring the entire backend development together. A user sends a request. It goes to middleware. If valid, it goes to the next middleware. This continues until it is understood that it is a valid request, and then it reaches the main controller. Otherwise, the request ends wherever validation fails. This is the concept of backend development.

The concept of Express ends here. There is not much to understand in Express. Now what remains is setting up the project structure and project setup.

## Project Structure

Creating a project file structure is a very difficult task. How will we structure our project's files? There is a design principle for this. It is called [Clean Code Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). It discusses how to structure files. If the file structure of a project is not correct, you will face problems repeatedly while working on the project. Although we will not dive into Clean Code Architecture now. It is an advanced concept. We will discuss it later. It is the best concept for Monolithic applications. The application we are creating now is monolithic because everything is in one place. The technical name for this monolithic architecture is Layred architecture, but it is commonly known as monolithic architecture.

I will not say which project structure is the best for a monolithic application. First, we will create separate folders or files for everything we need. Let's discuss what folders/files we need to create and why.

1. app: In this folder, we will keep application-related errors, database connections, app files, routes (global, all), etc. It has no relation with server.js.
2. routes: We will keep all our routes here.
3. models: We will keep all our data models here.
4. controller: Where there are routes, there will be controllers. All controllers will be in this folder.
5. service: We will never let our controller communicate with the database. That’s why we created this directory to communicate with the database. Although the controller can also communicate, we will separate database connection logic and business logic for better understanding.
6. middleware: We will write our custom middleware here.
7. util: If we need any utility files, we will keep them in this folder.
8. db: We will keep all database-related tasks here.
9. config: We will use this for configuration management.
10. log: All application logs will be kept here.
11. error: We will write all our custom errors here.
12. test: We will write the code to test our application here.
13. server.js: All server-related code will be in this folder.
14. .env & default.env: All secret information that only I will know, and no one else, will be in this file.


In the app folder, we will take a file named app.js. We will create our application in it just like before. Now, there is a route that must exist in all applications' APIs, which we may not know about and rarely use. However, without it, our API won't be considered a perfect API in many cases. It doesn't serve any purpose, but it must be there. That is the '/health' route. Typically, when we work with a Kubernetes cluster or deploy using third-party services, they send a request to '/health' to check the API. If it doesn't return 200, they assume the API is not perfect.

```js
const express = require('express');

const app = express();

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```

Notice we didn't use our req parameter here. If you have unused variables like this, prefix them with an underscore (\_). Otherwise, some platforms may throw an error.

So far, in all the work we've done, we have always listened after the route. But from now on, we will export the app. The reason is that after creating an application, we need to test it. For testing, we need the structure of our application, not the running application. If we had listened here, our job would be done. We wouldn't be able to get our application and, without it, how could we test it? So here, we only keep the structure of the application. We won't keep the run option here. When we need to test, we can import and test it in our test folder later. We can also import it to the server if we want. So, how will our server look?

```js
// server.js

const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
```

Here we have statically given that it will run on port 8000. But what if the port changes during deployment? For this, we can do one thing. When a server is deployed, there is some sensitive data that we cannot keep in our code. We can't allow exposing it. These are sent to our application from the process.env file. Here we will install a package called dotenv. After taking it, we will create a file named .env. In this file, we will keep the data that is in our environment variables. When we deploy on the server, we either specify these environment variables there or open an .env file there. Now, we need to create two files in our directory: .env and default.env. In default.env, we will give dummy data of our .env file variables so that even if someone gains access to my code, they won't get my data. In the .env file, we will store the following variable.

```env
PORT = 4444
```

Now in server.js, instead of writing the port directly, we will use this port from there. First, we will check if process.env.PORT exists. If not, we will use 8000. It will be clearer when you see the code.

```js
// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
```

We will also require the environment variable at the top in app.js.

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```

app.js is our entry file. Some people write up to a thousand lines in this file. If I write a thousand lines in my entry file, it becomes very difficult to maintain. So our goal will be to keep this file as clear as possible. First, we write everything, and then we will show how to keep it clear. We will first install cors and morgan. Then we will import them into app.js.

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const middleware = [morgan('dev'), cors(), express.json()];

app.get('/health', (_req, res) => {
    throw new Error('Error');
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```


In the `app` folder, we will take a file named `app.js`. There, we will create our application as before. Now, there is one route that must exist in the API of all applications which we don’t know about and often don’t use. But if this isn’t present, our API won’t be considered a perfect API in many places. It doesn’t serve any function, but it must be there. This is the `/health` route. Typically, when we work with Kubernetes clusters or deploy using third-party services, they usually send a request to `/health` to check the API. If it doesn’t return 200, they assume the API isn’t perfect.

```js
const express = require('express');

const app = express();

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```

Notice here, we did not use our `req` parameter. For such unused variables, you should prepend them with an underscore (`_`). Otherwise, some platforms may throw an error.

Until now, we have always listened after the route. But from now on, we won’t do that anymore. We will export `app`. The reason for this is that we need to test the application we created. Now, for that, we need the shape of my application, not a running application. If we had listened here, then the job would be done. We would not get our application anymore. And if we couldn’t get it, how would we test it? So, we have only kept the shape of the application here, not the option to run it. When we need to test it, we can later import it into our test folder to test it. We can also import it into the server if we want. So, what will our server look like then?

```js
// server.js

const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
```

Now, here we have statically given that it will run on port 8000. But what will we do if the port changes during deployment? For this, we can do one thing. When a server is deployed, there is some sensitive data that we cannot keep in our code. We cannot allow these to be exposed. These are sent to our application from the `process.env` file. Here, we will install a package named `dotenv`. After taking it, we will create a file named `.env`. And there, we will keep the data that resides in our environment variable. When we deploy on the server, we either declare these environment variables there, or open an `.env` file there. Now, we need to create two files in our directory: `.env` and `default.env`. In `default.env`, we will give the variables of our `.env` file as dummy data so that if someone even gets access to my code, they won’t get my data. Now, we will store the following variable in the `.env` file.

```env
PORT = 4444
```

Now in `server.js`, we will use this port from there instead of writing the port directly. First, we will check if `process.env.PORT` exists. If not, we will give it 8000. You will understand better if you see the code.

```js
// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
```

We will also require the environment variable at the top in `app.js`.

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```

`app.js` is our entry file. Often, people write up to a thousand lines in this file. If I write a thousand lines in my entry file, it becomes very difficult to maintain. Therefore, our goal will be to keep this file as clear as possible. First, we will write everything, then I will show you how to keep it clear. First, we will install `cors` and `morgan`. Then, we will import them into `app.js`.

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const middleware = [morgan('dev'), cors(), express.json()];

app.get('/health', (_req, res) => {
    throw new Error('Error');
    res.status(200).json({ message: 'Success' });
});

module.exports = app;
```

Let’s assume if, for some reason, `/health` throws an error, its appearance will be like this.

![error](./images/error.png)

Now, will I show this error to the client? Never. We will manually show a formatted error message wherever an error occurs. We will create an error for 404 and a global error.

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const middleware = [morgan('dev'), cors(), express.json()];

app.get('/health', (_req, res) => {
    throw new Error('Error');
    res.status(200).json({ message: 'Success' });
});

app.use((_req, _res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
});

app.use((error, _req, res, _next) => {
    if (error.status) {
        res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
```

The first one will handle only the 404 errors. If no route is found, it will return this. And if there is any other error, our global error handler will handle it.

Now we will distribute the codes for our convenience. It doesn’t matter if you don’t, but if there are thousands of lines of code, it will be very difficult to manage them. So, we will now distribute these codes.

First, we have three middleware. There may be more in the future. If all these middleware are here, the file will become very heavy. So, we will first create a file named `middleware.js` inside the `app` folder and move the middleware code from `app.js` there. Then we will import it into `app.js`.

```js
// middleware.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const middleware = [morgan('dev'), cors(), express.json()];

module.exports = middleware;
```

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const app = express();

app.use(require('./middleware'));

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

app.use((_req, _res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
});

app.use((error, _req, res, _next) => {
    if (error.status) {
        res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
```

Now we will separate our routes. Even though there is only one route here now, we will put it in a file named `routes.js`.


```js
// routes.js

const router = require('express').Router();

router.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = router;
```

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');

const app = express();

app.use(require('./middleware'));
app.use(require('./routes'));

app.use((_req, _res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
});

app.use((error, _req, res, _next) => {
    if (error.status) {
        res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
```

```js
// error.js

const notFoundHandler = (_req, _res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
};

const errorHandler = (error, _req, res, _next) => {
    if (error.status) {
        res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({ message: 'Something went wrong' });
};

module.exports = {
    notFoundHandler,
    errorHandler,
};
```

```js
// app.js

require('dotenv').config('../.env');
const express = require('express');
const { errorHandler, notFoundHandler } = require('./error');

const app = express();

app.use(require('./middleware'));
app.use(require('./routes'));

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
```

Now see how clean the file looks. If we need to manage anything, we can go to the respective file and manage it. If we divide everything into small files like this, it will be much easier for us to work.

## Single Page vs Multi Page Application

A single-page application means an application with only one HTML file, no HTML is generated on the backend, communication with the backend is only done via APIs, and all pages are dynamically generated on the frontend using JavaScript. On the other hand, a multi-page application means where HTML is generated on the backend, as we did in the previous class playlist.

## Resource for this lecture

All resources for this lecture can be found at [Lecture 16](../../resources/lecture-16/README.md).

## Source Code

Source code for this lecture can be found at [this link](../../src/lecture-16/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

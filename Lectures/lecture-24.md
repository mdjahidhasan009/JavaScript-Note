
# Lecture 24 - Implement User CRUD Operations

In the last class, we worked on registration, login, project refactoring, and creating an authentication middleware. Today, we will work on user CRUD operations. Let's see what user CRUD operations we have in our notion.

![user-crud](./images/user-crud.png)

It appears there are 5 endpoints here. We need to create these.

- Get Users /users
- Get User by ID /users/userId
- Create User /users
- Update User /users/userId
- Delete User /users/userId

We are working on a new service called User. First, we will create the routes. We will go to the routes folder and create a file named `users.js`. Then, we will import our router from Express and export it.

```js
const router = require('express').Router();

module.exports = router;
```

Now we need a total of 5 routes. We will create them one by one. First, we will create the route for Get Users. We can get users through filter, sorting, pagination, and select properties. For now, these will be on our to-do list. Our route will be `api/v1/users?sort["by","name"]`, the method will be GET, and this will be a private route. We will now write this in `users.js`.

```js
const router = require('express').Router();

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method Get
 * @route api/v1/users?sort["by","name"]
 * @visibility private
 */

router.get();

module.exports = router;
```

For prefixing, we will import the user route in `index.js` and write the following code.

```js
// routes/index.js

const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', usersRoutes);

module.exports = router;
```

Now we will write the remaining routes in the user route one by one.

```js
// router/users.js

const router = require('express').Router();

/**
 * Get user by id or email
 */

router.get('/:userId', () => {});

/**
 * update user by id
 * @method PUT
 */

router.put('/:userId', () => {});

/**
 * update user by id
 * @method PATCH
 */

router.patch('/:userId', () => {});

/**
 * Delete user by id
 */

router.delete('/:userId', () => {});

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method Get
 * @route api/v1/users?sort["by","name"]
 * @visibility private
 */

router.get('/', () => {});

/**
 * Create new user
 */

router.post('/', () => {});

module.exports = router;
```

One thing to remember is that when writing, the common route, meaning the route that will be with everything, should always be written below. Suppose you want to hit the `/users/:userid` route. Now, if it is not above but below, and the `/users` route is above, many times it can find the route above and give a response back. So `/users` should always be written below. Both put and patch are methods of updating. Using put, we can update the entire existing data. Using patch, we can partially update. Now we need a controller and a service. Let's first go to the controller and create a file named `users.js`.


```js
// controller/users.js

const User = require('../models/User');

const getUsers = (req, res, next) => {};

const getUserById = (req, res, next) => {};

const postUser = (req, res, next) => {};

const putUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById,
};
```

Now we will add the functionalities one by one. To add functionalities, we need to perform some tasks related to the database. The controller will not do those. It was discussed in the previous class. For that, we need a service. We already have a service called user service. We can do these tasks there. First, let's write a function to find users. Remember, each function must be written and exported.

```js
// service/user.js

const User = require('../models/User');

const findUsers = () => {
    return User.find();
};

module.exports = {
    findUsers,
};
```

Now we will complete our getUsers function.

```js
const userService = require('../service/user');

const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort, pagination, select
     */

    try {
        const users = await userService.findUsers();
        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};
```

Now we will use this controller in our route.

```js
// routes/users.js
const usersController = require('../controller/users');

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method Get
 * @route api/v1/users?sort["by","name"]
 * @visibility private
 */

router.get('/', usersController.getUsers);

module.exports = router;
```

Now let's see if our function works.

![get-users](./images/get-users.png)

We see that we have got all our users.

But if we go to our requirement analysis and look at the routes, we will see that all user-related requests will be private. So, we can go to each route and write the authenticate middleware. But since all user routes will be private, instead of writing in so many places, we can go to our index route and write in the user prefix route, which will make all user routes private.


```js
// controller/users.js

const User = require('../models/User');

const getUsers = (req, res, next) => {};

const getUserById = (req, res, next) => {};

const postUser = (req, res, next) => {};

const putUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById,
};
```

Now we will add the functionalities one by one. To add the functionalities, we need to perform some database-related tasks. The controller will not do these tasks. This was discussed in the previous class. For this, we need a service. We already have a user service. We can do these tasks there. First, let's write a function to find users. Remember, we need to export each function.

```js
// service/user.js

const User = require('../models/User');

const findUsers = () => {
    return User.find();
};

module.exports = {
    findUsers,
};
```

Now we will complete our getUsers function.

```js
const userService = require('../service/user');

const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort, pagination, select
     */

    try {
        const users = await userService.findUsers();
        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};
```

Now we will use this controller in our route.

```js
// routes/users.js
const usersController = require('../controller/users');

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method Get
 * @route api/v1/users?sort["by","name"]
 * @visibility private
 */

router.get('/', usersController.getUsers);

module.exports = router;
```

Now let's check if this function works.

![get-users](./images/get-users.png)

We see we have received all our users.

But if we look at the routes in our requirement analysis, we see all user-related requests will be private. So, we can write our authenticate middleware in each route. But since all user routes will be private, instead of writing it in so many places, we can write it in our index route where the user's prefixing route is, and all user routes will be private.

```js
const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, usersRoutes);

module.exports = router;
```

Now if we send a request, it will give us the message Unauthorized.

![unauth](./images/unauth.png)

Now if we want to see our user information, we will need a token. And to get the token, we need to log in. Let's log in and see.

![login-1](./images/login-1.png)

We got the token. Now let's see if we get our user information with the token.

![user-token](./images/user-token.png)

Now we will create the getUserById controller. For this, we need an ID. Now that will come from params. Whatever we write after /users is the params. We had already created a service for our controller in the user service. That is findUserByProperty. Now we will use it in our controller.

```js
// controller/users.js

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if (!user) {
            throw error('User not found', 404);
        }
        // TODO: we have to delete the password from user object
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
};
```

Now we will pass this controller function to our router.

```js
// routes/users.js

/**
 * Get user by id or email
 */

router.get('/:userid', usersController.getUserById);
```

Now it's time to check. Let's get an ID from the database. We will check with that. If the ID is correct, it will give the correct output.

![getid](./images/getid.png)

And if it's a different ID, it will give an error.

![getiderr](./images/getiderr.png)

Now we will work on the postUser controller. We already have a service for this in the user service. That is createNewUser. Now let's create our controller using it. But before that, we need to change the createNewUser function a bit. If we see now, this function can only create an account with name, email, and password. But if we want to give roles or accountStatus, we can't. So now we will create this option here. We see in the user model that by default roles will be 'STUDENT' and accountStatus will be 'PENDING'.

```js
// service/user.js

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
    const user = new User({
        name,
        email,
        password,
        roles: roles ? roles : 'STUDENT',
        accountStatus: accountStatus ? accountStatus : 'PENDING',
    });
    return user.save();
};
```

```js
// controller/users.js

const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;

    try {
        const user = await userService.createNewUser({
            name,
            email,
            password,
            roles,
            accountStatus,
        });
        return res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};
```


Now, the password is not hashed here. The hashing needs to be done in our service. But our register service in the auth service already has password hashing. So we will use that here. But first, we need to make a small change.

```js
// service/auth.js

const registerService = async ({
    name,
    email,
    password,
    roles,
    accountStatus,
}) => {
    let user = await findUserByProperty('email', email);
    if (user) {
        throw error('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash, roles, accountStatus });
};
```

```js
// controller/users.js

const authService = require('../service/auth');

const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;

    try {
        const user = await authService.registerService({
            name,
            email,
            password,
            roles,
            accountStatus,
        });
        return res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};
```

Since we have made some changes to the register service, let's check if it works properly.

![reg](./images/reg.png)

It's working fine.

Now, let's pass this controller to the user routes.

```js
// routes/users.js

/**
 * Create new user
 */

router.post('/', usersController.postUser);
```

Let's create a new user and see.

![new-user](./images/new-user.png)

One thing to keep in mind, if you don't provide the token, it won't work as this is a private route.

Now, let's create a controller for delete.

```js
// controller/users.js

const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if (!user) {
            throw error('User not found', 404);
        }

        await user.remove();
        return res.status(203).send();
    } catch (e) {
        next(e);
    }
};
```


```js
// routes/users.js

/**
 * Delete user by id
 */

router.delete('/:userId', usersController.deleteUserById);
```

![del](./images/del.png)

Our delete task is complete. Now, only the update tasks remain. There are two methods for update: put and patch. Let's start with the patch method. First, we decide what we will allow to be updated. We will not allow email and password to be updated with the patch method. We will allow all other fields to be updated.

```js
// controller/users.js

const patchUserById = async (req, res, next) => {
	const { userId } = req.params;

	const { name, roles, accountStatus } = req.body;

	try {
		const user = userService.findUserByProperty('_id', userId);

		if (!user) {
			throw error('User not found', 404);
		}

		user.name = name ?? user.name;
		user.roles = roles ?? user.roles;
		user.accountStatus = accountStatus ?? user.accountStatus;

		await user.save();
		return res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};
```

```js
// routes/users.js

/**
 * update user by id
 * @method PATCH
 */

router.patch('/:userId', usersController.patchUserById);
```

![patch](./images/patch.png)

Now, let's work on the put method. First, we need to create an update function in the user service.

```js
// service.user.js

const updateUser = async (id, data) => {
	const user = await findUserByProperty('email', data.email);

	if (user) {
		throw error('Email already in use', 400);
	}

	return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
	updateUser,
};
```

```js
// controller/users.js

const putUserById = async (req, res, next) => {
	const { userId } = req.params;
	const { name, email, roles, accountStatus } = req.body;

	try {
		const user = await userService.updateUser(userId, {
			name,
			email,
			roles,
			accountStatus,
		});

		if (!user) {
			throw error('User not found', 404);
		}

		return res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};
```


```js
// routes/users.js

/**
 * update user by id
 * @method PUT
 */

router.put('/:userId', usersController.putUserById);
```

![put](./images/put.png)

Everything is working properly. Our user CRUD management is complete. Some tasks are left in the to-do, which we will do later.

## Source Code

You can find all the source codes for this lecture at this [link](../../src/lecture-24/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
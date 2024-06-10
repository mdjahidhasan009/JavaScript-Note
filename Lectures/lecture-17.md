
# Lecture 17 - Backend 4 | Raffle Draw Project

In the last class, we discussed Express, middleware, controllers, and project structure in detail. In this class, we will create a project. That project will be a raffle draw project. We will analyze everything step-by-step and create the backend for this project.

Now, if we need to design an application for a raffle draw, what features might it have?

- Sell lottery ticket
- Update lottery ticket
- Delete lottery ticket
- Get all tickets
- Get ticket by ID
- Bulk buy (user can buy multiple tickets at a time)
- Raffle draw

With this application, tickets can be sold, updated, deleted, and there will be a feature to get all tickets at once, get a ticket by ID, a feature for a user to buy multiple tickets at once, and finally, a raffle draw.

The first task before creating any application is requirement analysis. Then, extend the requirements. Why extend? Because we cannot design the application based on the client's general language. We need to transform that general language into technical terms. Then, we need to identify what database models we might need. Then establish relationships between those models. Now, we won't go into such complexity. First, we identify our requirements.

Here, if we want to sell lottery tickets, we need a storage system for tickets. Because to conduct the draw, we need ticket information, and if we don't store them, how will we conduct the draw, and how will we verify the user's ticket? So, we will keep a storage system. If the tickets are stored, we can do all the above tasks. That means our application has only one requirement, which is `Ticket`. Now, what might the shape of this ticket be? By shape, we mean what the ticket model might contain.

- Number (unique)
- Username
- Price
- Timestamp

First, we need a unique number for the ticket. Then, we need the name of the ticket buyer. Next, we need the ticket price. Finally, we need a record of when the ticket was bought.

Now, we want to transform this model into code. For that, we will follow the structure and files we discussed in the last class. Now, we will create a file named Ticket.js inside the models folder and create a class there.

```js
// /models/Ticket.js

const shortid = require('shortid');

class Ticket {
    /**
     * Constructor function
     * @param {string} username
     * @param {number} price
     */
    constructor(username, price) {
        this.id = shortid.generate();
        this.username = username;
        this.price = price;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Ticket;
```

In this class, we will take a constructor with parameters username and price. We will install a package named shortid to generate IDs. You can understand the rest of the code. Why did we take username and price as parameters? Because these two variables will change. The user will be different, and the price can vary.

Now, if we look at our requirements, we see we need a delete option. Now, this file is for a single ticket. We cannot delete from here. We can delete from the database where there will be many tickets. Here, we can update at most.

Now let's go to the database. Now only the model is created. This model will not be a single one; there will be many. Let's create that in the database for now. We will create a file named db.js inside the db folder.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {}

const myDB = new MyDB();
module.exports = myDB;
```

First, we import our model because we need it. Then, we take a class. We will neither export this class nor use it in multiple places. If we do, what will happen? Our information will be scattered. The user will be able to create multiple databases. But we want all our information to be in one database. So, we kept our class in an object and exported that object. The module system of JavaScript follows the singleton pattern. What is this again? The singleton pattern means that an object will not update in multiple places, it will update in one place only. This is called the singleton pattern. Now, we will take a constructor in our class. Here, we will take only an array of tickets. Initially, this is an empty array in which we will later keep tickets.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
    constructor() {
        this.tickets = [];
    }
}

const myDB = new MyDB();
module.exports = myDB;
```

Now, first, we will write a method to create a ticket.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
    constructor() {
        this.tickets = [];
    }

    /**
     * Create and save a new ticket
     * @param {string} username
     * @param {number} price
     * @returns {Ticket} return a ticket object
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this.tickets.push(ticket);
        return ticket;
    }
}

const myDB = new MyDB();
module.exports = myDB;
```


Here we have commented in jsDocs style. It is a powerful tool that allows you to specify the types of your parameters since JavaScript does not have a built-in type system. Now, in the `create` function, we took `username` and `price` as parameters. Then we created a ticket object from the ticket model. We pushed it into the tickets array and returned it. It's quite simple.

Next, we will create a method to allow a user to buy multiple tickets, i.e., bulk ticket purchase. Everything will remain the same except for the number of tickets. And since the ticket ID changes for each purchase, multiple tickets will be created.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```

Nothing complex is done here. A loop runs according to the quantity to create tickets, and all tickets are returned as an array.

Now we will create a method to find tickets.

```js
// /db/db.js

const Ticket = require('../.models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```


Actually, there is nothing to do here. When the `find` method is called, we just return the tickets array.

Now, let's create a method to find a specific ticket by its ID.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```

Here, we use the array's `find` method to return the ticket with the specified ID.

Now, let's write a method to find tickets by username.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}

	/**
	 * find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */
	findByUser(username) {
		const tickets = this.tickets.filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);
		return tickets;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```


Actually, there is nothing to do here. When the `find` method is called, we just return the tickets array.

Now, let's create a method to find a specific ticket by its ID.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```

Here, we use the array's `find` method to return the ticket with the specified ID.

Now, let's write a method to find tickets by username.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}

	/**
	 * find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */
	findByUser(username) {
		const tickets = this.tickets.filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);
		return tickets;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```


First, we will check the index of the given ID. If the index is not -1, meaning the ID is found, we will delete it using the splice method.

Now, the only method left to create is for the draw.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}

	/**
	 * find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */
	findByUser(username) {
		const tickets = this.tickets.filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);
		return tickets;
	}

	/**
	 * update ticket by id
	 * @param {string} ticketId
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket}
	 */
	updateById(ticketId, ticketBody) {
		const ticket = this.findById(ticketId);
		ticket.username = ticketBody.username ?? ticket.username;
		ticket.price = ticketBody.price ?? ticket.price;
		ticket.updatedAt = new Date();
		return ticket;
	}

	/**
	 * delete ticket from db
	 * @param {string} ticketId
	 */
	deleteById(ticketId) {
		const index = this.tickets.findIndex(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		if (index !== -1) {
			this.tickets.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}
}


First, we will check the given ID's index. If the index is not -1, meaning the ID is found, we will delete it using the splice method.

Next, we will create a method for drawing the winners.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * Returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * Find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}

	/**
	 * Find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */
	findByUser(username) {
		const tickets = this.tickets.filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);
		return tickets;
	}

	/**
	 * Update ticket by id
	 * @param {string} ticketId
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket}
	 */
	updateById(ticketId, ticketBody) {
		const ticket = this.findById(ticketId);
		ticket.username = ticketBody.username ?? ticket.username;
		ticket.price = ticketBody.price ?? ticket.price;
		ticket.updatedAt = new Date();
		return ticket;
	}

	/**
	 * Delete ticket from db
	 * @param {string} ticketId
	 */
	deleteById(ticketId) {
		const index = this.tickets.findIndex(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		if (index !== -1) {
			this.tickets.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Find winners
	 * @param {number} winnerCount
	 * @returns {Array<Ticket>}
	 */
	draw(winnerCount) {
		const winnerIndices = new Array(winnerCount);
		let index = 0;
		while (index < winnerCount) {
			let winnerIndex = Math.floor(Math.random() * this.tickets.length);
			if (!winnerIndices.includes(winnerIndex)) {
				winnerIndices[index++] = winnerIndex;
				continue;
			}
		}

		const winners = winnerIndices.map((index) => this.tickets[index]);
		return winners;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```

We will first provide the number of winners we want as an argument. We will create an array of that length. Initially, we will set the index to 0. Then, we will run a while loop until the index is smaller than the winnerCount. Inside the loop, we will generate a random index based on the ticket length. If the winnerIndices array does not already contain this index, we will add it. Finally, we will map the winnerIndices to return the ticket information based on those indices as winners.

Next, we can test our functions to ensure they work correctly by creating a test file in the test folder with some dummy data.

```js
// /test/test.js

const myDB = require('../db/db');
myDB.create('user 1', 10);
myDB.create('user 2', 10);
myDB.create('user 3', 10);
myDB.create('user 4', 10);
myDB.create('user 5', 10);
const bulk = myDB.bulkCreate('test', 10, 5);
console.log('Bulk', bulk);
const tickets = myDB.find();
console.log('All Tickets', tickets);
const winners = myDB.draw(3);
console.log('Winners', winners);
```

Running this file will help us verify if our functions are working correctly.

Next, we will create routes for our application. Routes are very important for an application because they handle various tasks. We need to determine how many routes our application will have. We will create routes for each resource we want to provide access to the user. 

Here are the routes we will create:

- /tickets/t/:ticketId GET - find a single ticket
- /tickets/t/:ticketId PATCH - update ticket by id
- /tickets/t/:ticketId DELETE - delete ticket by id
- /tickets/u/:username GET - find tickets for a given user
- /tickets/sell - create tickets
- /tickets/bulk - bulk sell tickets
- /tickets/draw - find winners
- /tickets/ - find all tickets

We need to ensure that the common path /tickets is written at the bottom. If we write it at the top, the application might return the result for /tickets without considering what comes after it.

Let's write these routes in the routes folder.

```js
// /routes/tickets.js

const router = require('express').Router();
const db = require('../db/db');

module.exports = router;
```

Now, we have three methods for `/tickets/t/:ticketId`. We can write these methods in two ways. Both methods are given below, but we will use the first method.

```js
router.get('/t/:ticketId', (req, res) => {});
router.patch('/t/:ticketId', (req, res) => {});
router.delete('/t/:ticketId', (req, res) => {});
```

Or

```js
router
	.route('/t/:ticketId')
	.get(() => {})
	.patch(() => {})
	.delete(() => {});
```

We will use this file in the routes.js file in the app folder.


### First, we will check the index of the given ID. If the index is not -1, meaning the ID is found, we will delete it using the splice method.

Now, the last method left to create is for the draw.

```js
// /db/db.js

const Ticket = require('../models/Ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}

	/**
	 * Create and save a new ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket} return a ticket object
	 */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}

	/**
	 * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
	 */
	bulkCreate(username, price, quantity) {
		const result = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			result.push(ticket);
		}
		return result;
	}

	/**
	 * returns all available tickets
	 */
	find() {
		return this.tickets;
	}

	/**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		return ticket;
	}

	/**
	 * find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */
	findByUser(username) {
		const tickets = this.tickets.filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);
		return tickets;
	}

	/**
	 * update ticket by id
	 * @param {string} ticketId
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket}
	 */
	updateById(ticketId, ticketBody) {
		const ticket = this.findById(ticketId);
		ticket.username = ticketBody.username ?? ticket.username;
		ticket.price = ticketBody.price ?? ticket.price;
		ticket.updatedAt = new Date();
		return ticket;
	}

	/**
	 * delete ticket from db
	 * @param {string} ticketId
	 */
	deleteById(ticketId) {
		const index = this.tickets.findIndex(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		if (index !== -1) {
			this.tickets.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * find winners
	 * @param {number} winnerCount
	 * @returns {Array<Ticket>}
	 */
	draw(winnerCount) {
		const winnerIndices = new Array(winnerCount);
		let index = 0;
		while (index < winnerCount) {
			let winnerIndex = Math.floor(Math.random() * this.tickets.length);
			if (!winnerIndices.includes(winnerIndex)) {
				winnerIndices[index++] = winnerIndex;
				continue;
			}
		}

		const winners = winnerIndices.map((index) => this.tickets[index]);
		return winners;
	}
}

const myDB = new MyDB();
module.exports = myDB;
```

We will first provide the number of winners we want as an argument. Then, we will create an array of that length. Initially, we will assume the index is 0. Now, we will run a while loop until the index is smaller than winnerCount. What will be inside the loop? First, we will generate a random index based on the ticket length. Then, if this index is not in winnerIndices, we will add it there. Finally, we will map winnerIndices to the ticket information based on that index and return them as winners.

Now, to check if these functions are working correctly, we can create a test file named test.js inside the test folder and test with some dummy data.

```js
// /test/test.js

const myDB = require('../db/db');
myDB.create('user 1', 10);
myDB.create('user 2', 10);
myDB.create('user 3', 10);
myDB.create('user 4', 10);
myDB.create('user 5', 10);
const bulk = myDB.bulkCreate('test', 10, 5);
console.log('Bulk', bulk);
const tickets = myDB.find();
console.log('All Tickets', tickets);
const winners = myDB.draw(3);
console.log('Winners', winners);
```

By running this file, we can see if our functions are working correctly. It seems they are working fine.

Now, we can create routes for our application. Routes are very important for an application because many tasks depend on them. So, we need to find out how many routes our application might have. We will create as many routes as we provide resources to our users. For example, if our application has 40 models and each model requires 500 routes, we need to write those 500 * 40 = 20000 routes similarly. This is the problem with the backend, but there is no way around it. We have to do this.

Now, let's write our routes serially as mentioned before.

- /tickets/t/:ticketId GET - find single ticket
- /tickets/t/:ticketId PATCH - update ticket by id
- /tickets/t/:ticketId DELETE - delete ticket by id
- /tickets/u/:username GET - find tickets for a given user
- /tickets/sell - create tickets
- /tickets/bulk - bulk sell ticket
- /tickets/draw - find winners
- /tickets/ - find all tickets

One thing to note is that the common path /tickets should be written at the bottom. If written at the top, many times the application will return the result of /tickets without considering what comes after it.

Now, let's write these routes inside the routes folder.

```js
// /routes/tickets.js

const router = require('express').Router();
const db = require('../db/db');

module.exports = router;
```

Now, there are three methods for `/tickets/t/:ticketId`. We can write these three methods in two ways. Both ways are given below. But we will use the first method.

```js
router.get('/t/:ticketId', (req, res) => {});
router.patch('/t/:ticketId', (req, res) => {});
router.delete('/t/:ticketId', (req, res) => {});
```

Or

```js
router
	.route('/t/:ticketId')
	.get(() => {})
	.patch(() => {})
	.delete(() => {});
```

This file will be used in the routes.js of the app folder.

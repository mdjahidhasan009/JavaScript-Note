
# Lecture 26 - Implement Attendance System Main Functionalities

In the last class, we worked on user CRUD operations. Although we left some tasks incomplete, we will address those later. Our task in this class is Timesheet and Attendance.

![notion](./images/notion.png)

Our target is to have a button. I am an admin. When I click the button, attendance will be enabled. We can enable this multiple times, but we must ensure that only one attendance is enabled at a time. Enabling attendance means creating a data entry in the database indicating that attendance was enabled at this time by the admin and specifying the duration for which it will be enabled.

If we look at our attendance model, we see it is structured like this:

```js
// models/AdminAttendance.js

const { Schema, model } = require('mongoose');

const adminAttendanceSchema = new Schema({
    timeLimit: Number,
    status: String,
    createdAt: Date,
});

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);

module.exports = AdminAttendance;
```

Along with `createdAt`, we can also include `updatedAt` to know when it was last updated. We will remove the entire line for `createdAt`. The work of `createdAt` and `updatedAt` can be handled through timestamps. When data is created, `createdAt` and `updatedAt` are automatically generated within the timestamps. When we update the data, the time will be stored in `updatedAt`. So, we can slightly modify this file as follows:

```js
// models/AdminAttendance.js

const { Schema, model } = require('mongoose');

const adminAttendanceSchema = new Schema(
    {
        timeLimit: {
            type: Number,
            required: true,
            max: 30,
            min: 5,
            default: 5,
        },
        status: {
            type: String,
            required: true,
            enum: ['RUNNING', 'COMPLETED'],
            default: 'RUNNING',
        },
    },
    { timestamps: true }
);

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);

module.exports = AdminAttendance;
```

Now, we need to create routes and a controller using this model. We know that if we can create the routes first, our work will be easier. Let's go ahead and create the routes.

In the routes folder, we will create a file named `admin-attendance.js` and create routes for enabling and disabling attendance.

```js
// routes/admin-attendance.js

const router = require('express').Router();

router.get('/enable', () => {});
router.get('/disable', () => {});

module.exports = router;
```

Our next task is to create the controller. We go to the controllers folder and create a file named `admin-attendance.js`.

```js
// controller/admin-attendance.js

const getEnable = (req, res, next) => {};

const getDisable = (req, res, next) => {};

module.exports = {
    getEnable,
    getDisable,
};
```

Now, we will pass these functions into the routes.

```js
// routes/admin-attendance.js

const { getEnable, getDisable } = require('../controller/admin-attendance');

const router = require('express').Router();

router.get('/enable', getEnable);
router.get('/disable', getDisable);

module.exports = router;
```


Now we will connect our route to the main route, i.e., index.js.

```js
// routes/index.js

const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const adminAttendanceRoute = require('./admin-attendance');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, usersRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoute);

module.exports = router;
```

Since it is a private route, we have added our authenticate middleware.

Now, let's complete our getEnable controller function.

```js
// controller/admin-attendance.js

const AdminAttendance = require('../models/AdminAttendance');

const getEnable = async (req, res, next) => {
    try {
        const attendance = new AdminAttendance();
        await attendance.save();
        return res.status(201).json({ message: 'Success', attendance });
    } catch (e) {
        next(e);
    }
};
```

We are not creating a separate service, but doing the service work here for understanding purposes. Let's check if this function works. But since it is a private route, we need to log in and get our token first.

![get-enable](./images/get-enable.png)

An object has appeared. It has everything as we wanted in our model.

If we hit this route again, another timesheet will be created. But we don't want that as we mentioned earlier. So, we need to handle this in our controller. If the status is running, it will stop and give a warning and won't go further.

```js
// controller/admin-attendance.js

const AdminAttendance = require('../models/AdminAttendance');
const error = require('../utils/error');

const getEnable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });

        if (running) {
            throw error('Already Running', 400);
        }
        const attendance = new AdminAttendance();
        await attendance.save();
        return res.status(201).json({ message: 'Success', attendance });
    } catch (e) {
        next(e);
    }
};
```

![running](./images/running.png)

Here, we see that when we hit the route while running, it shows Already Running.

Now we will work on getDisable. Before that, we need to know the status. So, let's create a route for that and create a controller function for it.

```js
// routes/admin-attendance.js

const {
    getEnable,
    getDisable,
    getStatus,
} = require('../controller/admin-attendance');

const router = require('express').Router();

router.get('/enable', getEnable);
router.get('/disable', getDisable);
router.get('/status', getStatus);

module.exports = router;
```

```js
// controller/admin-attendance.js

const getStatus = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });

        if (!running) {
            throw error('Not Running', 400);
        }

        return res.status(200).json(running);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getStatus,
};
```


If we now send a request to the status route, we will see it shows us status running.

![status](./images/status.png)

Our system design is that if the timesheet is enabled, it will be disabled after a certain time. Here, if it is not running, I have written the code for that. If it is running, then first we need to check the time, whether there is time left or not. To check that, we will install a library. That is [date-fns](https://date-fns.org/).

Now we need to check the createdAt time, whether it is greater than the sum of the current time and the time limit. If it is greater, then it has expired. To add this, date-fns has a function called addMinutes. We will pass the createdAt time as the first argument and our time limit as the second argument. Since the time is stored as a string in the database, we need to convert it to a Date object. To compare the time, date-fns has a function called isAfter. Let's do these tasks.

```js
// controller/admin-attendance.js

const getStatus = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });

        if (!running) {
            throw error('Not Running', 400);
        }

        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if (isAfter(new Date(), started)) {
            running.status = 'COMPLETED';
            await running.save();
        }

        return res.status(200).json(running);
    } catch (e) {
        next(e);
    }
};
```

If we now send a request, we will see the status has changed to complete.

![status-com](./images/status-com.png)

Now we will work on getDisable.

```js
// controller/admin-attendance.js

const getDisable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });

        if (!running) {
            throw error('Not Running', 400);
        }

        running.status = 'COMPLETED';
        await running.save();

        return res.status(200).json(running);
    } catch (e) {
        next(e);
    }
};
```

Now let's check our request. It shows that hitting the disable route completes the running timesheet.

![disable](./images/disable.png)

Now, after enabling, the timesheet created can be used by students to give attendance against its ID. Now we will work on the last two routes. We will work on the timesheet later.

![notion](./images/notion-2.png)

Once these two routes are complete, we can move to the frontend. We will leave a lot of work pending on the backend. We will do those later.

First, we create the student-attendance route.

```js
// routes/student-attendance.js

const router = require('express').Router();

router.get('/status', () => {});
router.get('/:id', () => {});

module.exports = router;
```

We will connect this route to index.js.

```js
// routes/index.js

const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const adminAttendanceRoutes = require('./admin-attendance');
const studentAttendanceRoutes = require('./student-attendance');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, usersRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoutes);
router.use('/api/v1/student/attendance', authenticate, studentAttendanceRoutes);

module.exports = router;
```

Now, we will use timestamps in the StudentAttendance model as we did before with createdAt.

```js
// models/StudentAttendance.js

const { Schema, model } = require('mongoose');

const studentAttendanceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        adminAttendance: {
            type: Schema.Types.ObjectId,
            ref: 'AdminAttendance',
            required: true,
        },
    },
    { timestamps: true }
);

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;
```

Now we will create our controller.

```js
// controller/student-attendance.js

const StudentAttendance = require('../models/StudentAttendance');

const getAttendance = (req, res, next) => {};

const getAttendanceStatus = (req, res, next) => {};

module.exports = {
    getAttendance,
    getAttendanceStatus,
};
```

```js
// routes/student-attendance.js

const {
    getAttendance,
    getAttendanceStatus,
} = require('../controller/student-attendance');

const router = require('express').Router();

router.get('/status', getAttendanceStatus);
router.get('/:id', getAttendance);

module.exports = router;
```

Let's complete the getAttendance and getAttendanceStatus controllers.

```js
// controller/student-attendance

const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const StudentAttendance = require('../models/StudentAttendance');
const error = require('../utils/error');

const getAttendance = async (req, res, next) => {
    const { id } = req.params;

    try {
        /**
         * Step 1 - Find admin attendance by id
         * Step 2 - Check if it is running or not
         * Step 3 - Check already register or not
         * Step 4 - Register entry
         */

        const adminAttendance = await AdminAttendance.findById(id);

        if (!adminAttendance) {
            throw error('Invalid Attendance ID', 400);
        }

        if (adminAttendance.status === 'COMPLETED') {
            throw error('Attendance already completed');
        }

        let attendance = await StudentAttendance.findOne({
            adminAttendance: id,
            user: req.user._id,
        });

        if (attendance) {
            throw error('Already registered', 400);
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id,
        });

        await attendance.save();
        return res.status(201).json(attendance);
    } catch (e) {
        next(e);
    }
};

const getAttendanceStatus = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });

        if (!running) {
            throw error('Not Running', 400);
        }

        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if (isAfter(new Date(), started)) {
            running.status = 'COMPLETED';
            await running.save();
        }

        return res.status(200).json(running);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAttendance,
    getAttendanceStatus,
};
```

Let's enable an attendance and first try to see the status.

![st-status](./images/st-status.png)

It shows running. Now let's try to mark attendance.

![attend](./images/attend.png)

Attendance has been created. If we try to mark attendance again from this user, it will not be accepted.

![attend-fail](./images/attend-fail.png)

Now, let's log in with a different ID and try to mark attendance with its token.

![attend](./images/attend-2.png)

Successfully done. Anyone who logs in can mark attendance. But one user cannot mark attendance more than once.

Our system is almost complete. Now we will move to the frontend. There is still a lot of work left in the backend. We will proceed with those as needed. It is ready enough that we can now jump to the frontend.

## Source Code

The source code for this lecture can be found at this [link](../../src/lecture-26/).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

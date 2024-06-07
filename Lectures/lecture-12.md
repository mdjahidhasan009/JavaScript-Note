
# Lecture 12 - Attendance System Requirement Analysis

## Table of contents

- [Introduction](#introduction)
- [Client's requirements](#clients-requirements)
- [Functional Requirements](#functional-requirements)
- [Requirement Analysis](#requirements-analaysis)
  - [Models](#models)
  - [Endpoints](#endpoints)
- [Visualize our workflow](#visualize-our-workflow)
- [Decision Tree](#decision-tree)
- [Project Management](#project-management)
- [Resources for this lecture](#resource-for-this-lecture)

## Introduction

In the last class, we looked at the basic requirements we received from the client for our project. Today, we will analyze the functional requirements based on that. We will create a basic SRS (Software Requirement Specification) and choose the technologies needed for this project. Let's write down today's agenda.

- Functional Requirement Analysis
- Create A Basic SRS
- Choose Technologies

To become a programmer, the most important thing is to focus on problem creation or problem finding. We mostly focus on problem solving. But the hardest part is deriving small problems from a two-line requirement. For example, I want a ball to bounce from the bottom edge to the top edge of the screen when entering this page. Just a one-line requirement. But to do this, we developers will break down the problem in our own way. How? When the ball is at the bottom edge, it will move upwards at a specific angl...

## Client's Requirements

We need an attendance system. Students can create their own profile. Admin can see the list of students and their attendances. Admin can enable and disable the attend button. Also, this button can be disabled based on a timer. Each time the admin enables the attend button, students can participate only once. Each day, a student will have a timesheet of attendance.

Students can see their own time logs and the attend button when enabled.

## Functional Requirements

There is a difference between requirements and requirement analysis. We often mix the two. Requirements specify what features the application will have, while requirement analysis details how those features will be implemented. First, let's write down our functional requirements. Then we will analyze them. This app has two end users: Admin and Student. These two users will primarily use our app. Let's first list the requirements for Students.

**Student Roles:**

- Students can register themselves.
- The account status for a student will be:
  - Pending
  - Active
  - Reject
- Students can log in with their credentials.
- Pending and rejected students won't have anything in their profile.
- Active students can update their profile info:
  - First Name
  - Last Name
  - Email
  - Phone No
  - Profile Picture
- Active students can change/update their password.
- Active students can see their timesheet:
  - Calendar view
  - List view
  - Table view
- Active students can participate in the attendance system.
- Students can log out.

Now, let's list the tasks for Admin. When we talk about Admin, two concepts come to mind: Super Admin and Admin. The Super Admin's job is to decide who will become Admin. Without a Super Admin, anyone could sign up as Admin. There are several ways to create a Super Admin:

- We can provide the Super Admin's information in the environment variables when designing the application. When the application runs, it can automatically create the Super Admin from that information.
- The first person to deploy the application as Admin can be considered the Super Admin. This method is commonly used now.
- We can also create a CLI tool to create a Super Admin via commands.

In this application, let's assume there is only one Admin, and that Admin is the Super Admin. We should ensure our requirements don't go beyond the client's requirements. Since the client didn't mention multi-admin, we won't consider it. Now, what will the Admin's tasks be?

**Admin Roles:**

- Admin can create a student.
- Admin can delete/update/check student information.
- Admin can change the status of a student.
- Admin can check a student's timesheet.
- Admin can enable or disable the attendance button.
- Admin can check the stats of a given day.

We have listed the requirements. Now, we will analyze them.

## Requirements Analysis

If you search on Google, you'll find many well-formatted analyses. Since our application is simple, we don't need a complex, formatted analysis. We will create a simple analysis.

### Models

We have two users here: Admin and Student. We can create a model for each user. But we need Name, Email, and Password for both Admin and Student. We could create two different tables or collections in the database and connect them. But establishing relationships between two different collections or tables can be cumbersome. It could also be that, in the future, two students are made Admin for convenience. Then, they would have two different profiles and roles: one as Student and one as Admin. But there i...

**User:**

- Name
- Email
- Password
- Roles
- AccountStatus

Now, we need a model for the profile.

**Profile:**

- First Name
- Last Name
- Phone No
- Profile Picture
- UserId


Now we need a model for Student Attendance. This will primarily include the Student's ID and when their attendance was created. A student might mark attendance multiple times a day. These will be grouped under the attendance for that day. Additionally, we need an ID for the attendance record under which we are recording attendance.

**StudentAttendance:**

- UserId
- CreatedAt: DateTime
- AdminAttendanceId

Now, who will track the API through which attendance is given? Who will maintain the system that the admin clicks to enable attendance? This is also a complex issue. We need a boolean variable to track the data, indicating when it's time to enable it. After a specific time, it can be disabled. We need a model for this. Let's create a model named AdminAttendance. This will include the time when the system was created. The admin can enable the system multiple times a day, so we need to use DateTime here. ...

**AdminAttendance:**

- CreatedAt: DateTime
- Status
- TimeLimit

Our models are now created.

We can build the application in two ways - single-page and multi-page. Our application is a single-page application. For communication and working with the dashboard, we need APIs. Now we have to decide how to build the API and what endpoints we need. We need to derive these from our requirements.

### Endpoints

**Student Endpoints:**

- POST /auth/login [public]
- POST /auth/register [public]
- PATCH /profiles [private]
- PATCH /profiles/avatar [private]
- PUT /auth/change-password [private]
- GET /timesheet [private]
- GET /attendance [private]
- GET /attendanceStatus [private]

**Admin Endpoints:**

- GET /users [private]
- POST /users [private]
- PATCH /users/userId [private]
- DELETE /users/userId [private]
- GET /users/userId [private]
- GET /profiles [private]
- POST /profiles [private]
- PATCH /profiles/profileId [private]
- DELETE /profiles/profileId [private]
- GET /profiles/profileId [private]
- GET /timesheet/userId [private]
- GET /timesheet/stats [private]
- POST /attendance/enable [private]
- GET /attendance/disabled/:attendanceId [private]

These are the routes we need to build our application effectively. The terms GET, POST, PUT, PATCH, DELETE indicate how requests to specific routes will be handled. We will understand these better as we work, but here's a basic idea.

- GET: Used to retrieve data from a resource.
- POST: Used to update or change the state of a resource.
- PUT: Used to replace the current state of a resource.
- PATCH: Used to modify part of a resource.
- DELETE: Used to delete data from a resource.

Public routes mean anyone can access them, while private routes are accessible only to logged-in users.

Let's visualize our workflow.

## Visualize our workflow

First, let's talk about the registration and authentication system.

![Registration](./registration-process.jpg)

We will send a request to `/auth/register` in JSON format. Our server will validate this request, transform it into a specific form, and hash the password to protect it in case of a database hack. After processing the data, it will be sent to the database and return a message. If successful, it will return a `Success 201` message. If there's an error with the user data, it will return an `Error 400` message. If there's a server issue, it will return an `Error 500` message.

Now, let's look at the login system.

![Login](./login-process.jpg)

When we send a request to `/auth/login`, we provide our email and password. The server will validate the data, search the database for the email, and check the password. If the email is not found, it will throw a 400 error. If the password doesn't match, it will also throw a 400 error. If everything matches, it will generate a JWT token and return a success 200 message with the token. This token will be saved in local storage as it is needed for all private route requests. After saving the token, it will r...

After reaching the dashboard, the user might want to see their timesheet. They will send a request to `/timesheet`. Since this is a private route, the request will include the JWT token in the authentication header. All private routes need to authenticate this token. Should we write the code for this repeatedly? No, we will reuse the code using a middleware system. This middleware will check if the token is present on the server. If not, it will return a 401 error (authentication error). If everything i...

Now, let's talk about the attendance button.

![enable](./enable.jpg)

When the button is enabled, the user will send a request to `/attendance` with the token. The middleware will check the token as usual. If the token is not found, it will return an error. Otherwise, it will start processing. It will create an attendance record for the user and save it in the database, then return a success message.

If the button is disabled, how will the system know when to disable or enable it? It will depend on a timer. Once a user marks attendance, they don't need to do it again. This means the button will be disabled for them. How will this be done?

![disable](./disable.jpg)

When the timer is open, a request will go to `/attendanceStatus`. The middleware will authenticate the token as usual. The server will then fetch the current attendance ID from the database and check if the user has already marked attendance under that ID. If they have, the button will be disabled. If not, the button will be enabled. After logging into the dashboard, this middleware will also receive a request, changing the button's appearance based on the status. Why do this? Because when the announcem...

## Decision Tree

A decision tree is a diagram, much like a flowchart. Creating this will eliminate the need to explain the process repeatedly. Team members can understand the process from this. Here, we will look at a decision tree for the registration process.

![decision tree](./decision-tree.jpg)

Hopefully, this diagram doesn't need much explanation. The process is clear from this. Creating decision trees for everything will help anyone understand the process easily.

## Project Management

When there are many requirements, managing them properly is essential to keep track of everything. Otherwise, things might get lost over time. We need to track everything. As beginners, we can use Notion. In professional life, there are many project management tools like Github, Trello, Jira, etc. We can use those too. For now, we will use Notion. All the requirements for this project are neatly organized as tasks in this [link](https://thirsty-camelotia-a8e.notion.site/Projects-26859035fe2a4649b9556f...

## Resource for this lecture

All resources for this lecture are available at [Lecture 12](../../resources/lecture-12/README.md).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

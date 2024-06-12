
# Lecture 37 - Thinking in React

%[https://youtu.be/6PyLbaIn0tI]

## Introduction

We have seen many lectures about React so far. By now, we should have a good understanding of what React is. React is a simpler version of DOM manipulation, similar to jQuery. However, jQuery does not perform well for complex applications. For that, React is the best solution. React only deals with DOM manipulation and nothing else, not even BOM. In short, React is generally a DOM manipulation library. jQuery has some more problems. For instance, due to the lack of architecture, it was very difficult to manage code. Secondly, there was no concept of components in jQuery. We had to manage code by finding it with IDs and classes within a file, which was very difficult. There was no state in it either. If we wanted to make a change, the entire DOM had to be re-rendered repeatedly, which was very costly. React is the best solution to these problems. Angular and Vue use Shadow DOM. No one can know how their code is, how it is updated. But React uses a Virtual DOM. Let's explain the concept of Virtual DOM a little. Let's try to understand the screenshot below first.

![vd-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660574421867/LH_ALIi0m.png align="left")

Here we see we created a root element and placed a paragraph tag inside it. This root exists virtually. It is not anywhere on the page.

![vd-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660574701113/2-joNFX44.png align="left")

Now see, we removed everything from the body. Then we virtually appended our root to the body. We can also add a paragraph inside the root if we want. Everything is happening virtually. The root remains as a virtual DOM. Here, React keeps two copies like this root. One is the Virtual DOM, and the other is the real DOM that is rendering. There is no difference between these two DOMs. Then why do we need two DOMs? Because if there is any change in React, that change comes to the Virtual DOM. When this change comes to the Virtual DOM, it compares it with the real DOM to see what the difference is. If there is no change, it does nothing. And if there is a change, it will re-render only the part where it finds the change. This is the main concept or main logic of React. React does this very little work.

If we go to [babeljs](https://babeljs.io/) and click on try it out and write the following code, we will see on the screen how React transforms it behind the scenes.

![babel-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660623067328/PRg7_pixu.png align="left")

We see that React has created an element. The first argument inside it is div, then since there are no attributes, null comes, and then there are other elements. This is how React converts the JSX we write into a function. The only purpose of giving so many examples is to show that React is a utility library.

React is a DOM manipulation library. Generally, we need many things along with DOM manipulation. React does not provide those to us. So in one sense, React is very easy, and in another sense, very difficult. Since React is a DOM manipulation library, there is nothing much to learn here. If we want to create a project with just DOM manipulation, let's see what aspects of React we need.

## Things to learn in React to create a basic app

- JSX - Since this is a new concept for us, we need to learn it well.
- Rendering Elements - We need to know when an element renders and when it re-renders.
- Component
- Props
- State and Lifecycle
- Handling events
- Conditional rendering
- Lists and keys
- Forms
- State Lifting

There are more advanced concepts that we will learn later. Since React has nothing but DOM, React is a small library. But it also has a problem. It is not enough to just do DOM manipulation; we will need routing. React does not provide us with that. So we will need some other solution for that. Also, React does not provide you with any UI templates. For that, we have to go to frameworks like SCSS, Styled Components, Material UI. Then there are forms. Managing forms in React is very difficult. React does not provide us with that solution. So for basic app development, React does not provide us with many things except DOM manipulation.

Let's see which aspects of React we need to master first.

- Component, props, state, and Lifecycle
- In-depth knowledge of JSX
- Conditional rendering and list
- Forms and validation

Knowing these four things, we will be able to create features of most applications. Maybe we won't be able to create a complete application, but we can create features. These four are called the lifeblood of React.

Within Component, the thing we need to know is Component Tree and Relationship. That is, we need to know how a relationship is created between two components, which one will be the child component, who will be the child of the child component, what will be the relationship between the grandchild and the parent, etc.

To build this relationship, we need to know three things. Those are - State, Props, State Lifting.

The most important thing in the case of React is the thinking of React. For that, you can read the [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) article. The most complicated thing about React is thinking like React. Because that thought does not come to us. React works in the most different way among all the frameworks and libraries. We try to apply the traditional way we have been working to React. That's why we don't get the real thought process. So we can easily create websites, but when we want to create an application or create a complex feature, we face many problems.

When we see a UI, the first thing that comes to our mind is how to take div, how to create this layout, how to create HTML, CSS, etc. This is where we make the mistake. If we just need to do HTML, CSS, why did we come to React? To think like React, we have to think about JSON. We cannot think about HTML, CSS. Suppose we see a navbar, it should be seen as a JSON object containing menuName, menuLink, hasDropdown, etc.

If we make a mistake while working with HTML and CSS, it cannot be matched again. We have to code again from the beginning. Similarly, when we make a mistake in creating JSON in React, the application will not match. In the last lecture, we created a shopping cart and mapped it using JSON. We did it correctly, so our work was greatly reduced.

## TODO App

We will try to create a to-do app. For that, we have a UI that you can find at this [link](https://www.figma.com/community/file/876773760965602621). Now our target is to create a JSON object by looking at this UI.

Let's see how we can structure our JSON.

```jsx
const task = {
	id: 'unique_id_001',
	subtitle: 'Subtitle',
	createdAt: '2022-08-16T08:49:35.268Z',
	tags: [
		{
			id: 'tag-001',
			text: 'Its done',
			icon: 'T',
		},
		{
			id: 'tag-002',
			text: 'Its cancelled',
			icon: 'X',
		},
		{
			id: 'tag-003',
			text: 'Its in progress',
			icon: 'X',
		},
		{
			id: 'tag-004',
			text: 'Just wrote it',
			icon: 'C',
		},
	],
	comments: [
		{
			id: 'comment-id-001',
			user: {
				avatar: 'xyz.com',
				name: 'Viraj',
				id: 'user-id-001',
			},
			text: 'Eiusmod quis aute eu tempor ipsum eiusmod commodo. In ex anim nisi elit veniam cillum tempor et. Nostrud proident anim Lorem consequat ullamco commodo reprehenderit consequat incididunt. Lorem esse cupidatat id reprehenderit qui eiusmod occaecat. Aute anim irure do nulla nulla duis. Occaecat eiusmod et reprehenderit culpa id ipsum incididunt labore pariatur deserunt deserunt ipsum reprehenderit.',
		},
	],
	tasks: [
		{
			id: 'task-001',
			title: 'Foggy Nelson',
			text: "Here to clean the streets of Hell's Kitchen",
			status: 'done',
		},
		{
			id: 'task-002',
			title: 'Louis CK',
			text: 'This one is cancelled',
			status: 'cancelled',
		},
		{
			id: 'task-003',
			title: 'Albert Einstein',
			text: 'In Progress',
			status: 'progress',
		},
		{
			id: 'task-004',
			title: 'Albert Einstein',
			text: 'In Progress',
			status: 'progress',
		},
	],
};
```


### Rendering UI from JSON

We need to see how to render the UI from JSON. According to our UI, we need to show the date first. We will build it very simply, not exactly as we saw in the UI. First, we will create functions to get the day and date.

```jsx
function getDay(dateStr) {
    const date = new Date(dateStr).getDay();
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    return days[date];
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
```

Now, we will build our UI.

```jsx
const App = () => {
    return (
        <div>
            <h1>
                {getDay(task.createdAt)}, {formatDate(task.createdAt)}
            </h1>
            <h3>{task.subtitle}</h3>
            <ul>
                {task.tags.map((tag) => (
                    <li key={tag.id}>
                        <small>{tag.icon}</small> - {tag.text}
                    </li>
                ))}
            </ul>
            <hr />
            <p>Notes linked to people</p>
            <div>
                {task.comments.map((comment) => (
                    <div key={comment.id}>
                        <h4>{comment.user.name}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            <ul>
                {task.tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>
                            <small>{task.status}</small>
                        </p>
                        <p>{task.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

And it should look like the picture below -

![ui-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660643247187/J4FNJXmmq.png)

We have not styled it here. Styling is not our main goal. Our goal is to understand how React works. Now let's see what components can be created from here. First, we will create a component for our tag item.

```jsx
const TagListItem = ({ tag }) => {
    return (
        <li key={tag.id}>
            <small>{tag.icon}</small> - {tag.text}
        </li>
    );
};
```

Next, we will create a component for the comment items.

```jsx
const CommentListItem = ({ comment }) => {
    return (
        <div key={comment.id}>
            <h4>{comment.user.name}</h4>
            <p>{comment.text}</p>
        </div>
    );
};
```

Finally, we will create a component for our tasks.

```jsx
const TaskListItem = ({ task }) => {
    return (
        <li key={task.id}>
            <h3>{task.title}</h3>
            <p>
                <small>{task.status}</small>
            </p>
            <p>{task.text}</p>
        </li>
    );
};
```


Now let's use these in our App component.

```jsx
const App = () => {
	return (
		<div>
			<h1>
				{getDay(task.createdAt)}, {formatDate(task.createdAt)}
			</h1>
			<h3>{task.subtitle}</h3>
			<ul>
				{task.tags.map((tag) => (
					<TagListItem tag={tag} key={tag.id} />
				))}
			</ul>
			<hr />
			<p>Notes linked to people</p>
			<div>
				{task.comments.map((comment) => (
					<CommentListItem key={comment.id} comment={comment} />
				))}
			</div>
			<ul>
				{task.tasks.map((task) => (
					<TaskListItem key={task.id} task={task} />
				))}
			</ul>
		</div>
	);
};
```

If you go to the browser, you will see our UI remains the same.

Now let's style our app and refactor some code.

### App.css

```jsx
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: Arial, Helvetica, sans-serif;
	color: #212121;
}

.day-card {
	width: 300px;
	padding: 1rem;
	background-color: antiquewhite;
	border-radius: 0.25rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.title {
	font-size: 1.5rem;
	font-weight: 600;
	text-align: center;
}

.sub-title {
	font-size: 1.2rem;
	font-weight: 500;
	text-align: center;
	margin-top: 0.5rem;
}

.tag-ul {
	padding: 1rem;
}

.tag-ul li {
	list-style-type: none;
}

.line {
	width: 5rem;
	height: 2px;
	background-color: #212121;
}

.notes {
	line-height: 1.5;
	margin-top: 1rem;
}

.comments {
	margin-top: 1rem;
}

.comment-item h3 {
	font-weight: 600;
	font-size: 1.2rem;
}
.comment-item p {
	font-size: 0.9rem;
	margin-top: 0.5rem;
}

.tasks {
	margin-top: 1rem;
	padding: 1rem;
}

.tasks li {
	list-style-type: none;
	margin-bottom: 0.5rem;
}

.cards-group {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
}
```

### tasks object

```jsx
const tasks = [
	{
		id: 'unique_id_001',
		subtitle: 'Subtitle',
		createdAt: '2022-04-24T18:04:42.792Z',
		tags: [
			{
				id: 'tag-001',
				text: 'Its done',
				icon: 'T',
			},
		],
		comments: [
			{
				id: 'comment-id-001',
				user: {
					avatar: 'xyz.com',
					name: 'Viraj',
					id: 'user-id-001',
				},
				text: 'Duis enim tempor in sunt magna labore duis et. Amet commodo voluptate commodo sit pariatur nulla proident. Magna reprehenderit ad adipisicing mollit non dolor excepteur cupidatat amet consequat irure.',
			},
		],
		tasks: [
			{
				id: 'task-001',
				title: 'Foggy Nelson',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'done',
			},
			{
				id: 'task-002',
				title: 'Louis CK',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'cancelled',
			},
			{
				id: 'task-003',
				title: 'Albert Einstein',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'progress',
			},
			{
				id: 'task-004',
				title: 'Albert Einstein',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'progress',
			},
		],
	},
	{
		id: 'unique_id_002',
		subtitle: 'Subtitle',
		createdAt: '2022-04-24T18:04:42.792Z',
		tags: [
			{
				id: 'tag-001',
				text: 'Its done',
				icon: 'T',
			},
			{
				id: 'tag-002',
				text: 'Its cancelled',
				icon: 'X',
			},
			{
				id: 'tag-003',
				text: 'Its in progress',
				icon: 'P',
			},
			{
				id: 'tag-004',
				text: 'Just wrote it',
				icon: 'C',
			},
		],
		comments: [],
		tasks: [
			{
				id: 'task-001',
				title: 'Foggy Nelson',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'done',
			},
			{
				id: 'task-002',
				title: 'Louis CK',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'cancelled',
			},
		],
	},
	{
		id: 'unique_id_003',
		subtitle: 'Subtitle',
		createdAt: '2022-04-24T18:04:42.792Z',
		tags: [
			{
				id: 'tag-001',
				text: 'Its done',
				icon: 'T',
			},
			{
				id: 'tag-002',
				text: 'Its done',
				icon: 'T',
			},
			{
				id: 'tag-003',
				text: 'Its done',
				icon: 'T',
			},
		],
		comments: [
			{
				id: 'comment-id-001',
				user: {
					avatar: 'xyz.com',
					name: 'Viraj',
					id: 'user-id-001',
				},
				text: 'Duis enim tempor in sunt magna labore duis et. Amet commodo voluptate commodo sit pariatur nulla proident. Magna reprehenderit ad adipisicing mollit non dolor excepteur cupidatat amet consequat irure.',
			},
			{
				id: 'comment-id-002',
				user: {
					avatar: 'xyz.com',
					name: 'Viraj',
					id: 'user-id-001',
				},
				text: 'Duis enim tempor in sunt magna labore duis et. Amet commodo voluptate commodo sit pariatur nulla proident. Magna reprehenderit ad adipisicing mollit non dolor excepteur cupidatat amet consequat irure.',
			},
		],
		tasks: [
			{
				id: 'task-001',
				title: 'Foggy Nelson',
				text: 'Here to clean the streets of Hells Kitchen',
				status: 'done',
			},
		],
	},
];
```

Here we take many task.
### Utility functions

```jsx
function getDay(dateStr) {
	const date = new Date(dateStr).getDay();
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return days[date];
}

function formatDate(dateStr) {
	const date = new Date(dateStr);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
```

### Components

```jsx
const TagListItem = ({ tag }) => {
	return (
		<li key={tag.id}>
			<small>{tag.icon}</small> - {tag.text}
		</li>
	);
};

const CommentListItem = ({ comment }) => {
	return (
		<div className="comment-item" key={comment.id}>
			<h4>{comment.user.name}</h4>
			<p>{comment.text}</p>
		</div>
	);
};

const TaskListItem = ({ task }) => {
	return (
		<li key={task.id}>
			<h3>{task.title}</h3>
			<p>
				<small>{task.status}</small>
			</p>
			<p>{task.text}</p>
		</li>
	);
};

const TaskCard = ({ task }) => {
	return (
		<div className="day-card">
			<h1 className="title">
				{getDay(task.createdAt)}, {formatDate(task.createdAt)}
			</h1>
			<h3 className="sub-title">{task.subtitle}</h3>
			<ul className="tag-ul">
				{task.tags.map((tag) => (
					<TagListItem key={tag.id} tag={tag} />
				))}
			</ul>
			<div className="line" />
			<p className="notes">Notes Linked to People</p>
			<div className="comments">
				{task.comments.map((comment) => (
					<CommentListItem key={comment.id} comment={comment} />
				))}
			</div>
			<ul className="tasks">
				{task.tasks.map((task) => (
					<TaskListItem key={task.id} task={task} />
				))}
			</ul>
		</div>
	);
};
```

### App function

```jsx
import './App.css';
const App = () => {
	return (
		<div className="cards-group">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
};
export default App;
```

Let's see how our UI looks now -

![ui-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660645243397/ygr6dSHBq.png align="left")

I have created the UI once from JSON. Now, no matter how the data comes in, I don't have to touch the UI anymore. This is the power of React. Just put in the effort to get it right once, and then we have no more work. From then on, we only work with JSON. We don't have to do anything with the UI anymore.

After today's lecture, wherever you see a UI, try to extract JSON from it instead of thinking about HTML and CSS. Once this mindset clicks, your work with the frontend will become much easier.

## Source Code

All the source code for this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-37).

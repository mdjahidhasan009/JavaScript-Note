
# Lecture 31 - Frontend 4 - React Component Tree and State

## Introduction

In the last class, we learned that we will create a component whenever we need to reuse code. More specifically, when we need to reuse code with dynamic data input, we will create a component. In this class, we will discuss React component tree and state.

## Component tree

Suppose we have a root file named APP. We can put all our sections in this file. But if we put everything in one file, why do we need a framework or library? We could do it with HTML and CSS. The reason we use frameworks or libraries is so that we can reuse code, divide it into small components, and create small UIs. Let's say our app has three sections - Section 1, Section 2, Section 3. Now, these sections may have small UIs. Since we separated the sections, it means there is duplicate code. So, we creat...

![comp-tree](./images/comp-tree.jpg)

In React, this is called the component tree. Maintaining this structure is very important for React. In this component tree, we can flow data from top to bottom but never from bottom to top.

Now let's try to create a simple application.

## Application Structure

Our application will be very simple. It will have a navigation bar, some content below, and a footer. The structure of our app file will be like this -

```jsx
function App() {
    return (
        <div>
            <nav>
                <div>
                    <h3>Brand Name</h3>
                </div>
                <div>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main>
                <h1>This is a body title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                    vero fugit. Vitae adipisci aliquid aperiam iste magni maiores
                    accusamus atque ad minus ab animi non iusto eligendi, tempore, omnis
                    facilis.
                </p>
            </main>
            <footer>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
```

From this, we understand that we need to create components for the navbar and footer. We will do that later. First, let's create a CSS file. We will create a file named App.css inside the src folder and set a background.

```css
/* App.css */

.app {
    background-color: aqua;
}
```

Now we need to import this CSS file into our app file and add the className.

```jsx
import './App.css';

function App() {
    return (
        <div className="app">
            <nav>
                <div>
                    <h3>Brand Name</h3>
                </div>
                <div>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main>
                <h1>This is a body title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                    vero fugit. Vitae adipisci aliquid aperiam iste magni maiores
                    accusamus atque ad minus ab animi non iusto eligendi, tempore, omnis
                    facilis.
                </p>
            </main>
            <footer>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
```

Now if we run our application by writing `yarn start`, we will see something like this -

![UI](./images/UI-01.png)

That means everything is perfect.

### CSS Module

The way we wrote CSS above has a problem. The CSS we wrote is global CSS. If we create another style with the same class name, it will override one another. For example, let's write the inline CSS of the button we worked on in the last class as a separate file.

```css
/* /components/button/Button.css */
.button {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    margin-right: 1rem;
    cursor: pointer;
    border-radius: 0.15rem;
}
```

Now we will import and use this class name in the button component.

```jsx
// /components/button/Button.jsx

import './Button.css';

const variant = {
    primary: {
        backgroundColor: '#2196f3',
        color: '#fff',
    },
    success: {
        backgroundColor: '#4caf50',
        color: '#000',
    },
    error: {
        backgroundColor: '#f44336',
        color: '#fff',
    },
    warning: {
        backgroundColor: '#ff9800',
        color: '#000',
    },
    info: {
        backgroundColor: '#80d8ff',
        color: '#000',
    },
};

const sizes = {
    small: { padding: '0.5rem 1rem' },
    medium: { padding: '1rem 2rem' },
    large: { padding: '1.5rem 3rem' },
};

const Button = (props) => {
    const userVariant = variant[props.variant];
    const userSize = sizes[props.size];
    return (
        <button
            type={props.type}
            className="button"
            style={{
                ...userVariant,
                ...userSize,
            }}
        >
            {props.text}
        </button>
    );
};

export default Button;
```

Now let's take another component named button2. There we will create two files named Button.jsx and Button.css. Then we will paste the code of our previous button into this button. But we will modify the CSS a bit.

```css
/* /components/button2/Button.css */

.button {
    font-size: 0.9rem;
    font-weight: 700;
}
```

Now let's import the two button components in our app file.

```jsx
// App.jsx

import './App.css';
import Button from './components/button/Button';
import Button2 from './components/button2/Button';

function App() {
    return (
        <div className="app">
            <nav>
                <div>
                    <h3>Brand Name</h3>
                </div>
                <div>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main>
                <h1>This is a body title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                    vero fugit. Vitae adipisci aliquid aperiam iste magni maiores
                    accusamus atque ad minus ab animi non iusto eligendi, tempore, omnis
                    facilis.
                </p>
            </main>
            <footer>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
            <Button variant="primary" size="medium" text="Button" />
            <Button2 variant="primary" size="medium" text="Button2" />
        </div>
    );
}

export default App;
```

If we see our UI, it will look like this -

![UI](./images/UI-02.png)

That means the style of the button we created later is not found here. The style of the first button has overridden the style of the subsequent button. To get rid of this problem, we will use CSS modules in React. Let's see how to do it. For that, we need to name our CSS file in the format `{name}.module.css`. So, we need to change the filename of Button.css to Button.module.css. Then we need to import it like `import classes from './Button.module.css';`. Here classes is an object that contains all the clas...

![UI](./images/UI-03.png)

Here you can see that each has got its respective style. And if you inspect, you will see that previously where both had the same class name, now they have different classes. We are not giving this name. Webpack is doing it for us. Webpack is converting the CSS classes into objects behind the scenes, which we are importing into our file.

As a result, the CSS for each component is now scoped. No one can override anyone else.

### Creating a CSS Module File for the App

Now we will change the CSS file name for the app to a module. That is, we will change App.css to App.module.css. Then we will import it into the app file.

```jsx
// App.jsx

import classes from './App.module.css';

function App() {
    return (
        <div className={classes.app}>
            <nav>
                <div>
                    <h3>Brand Name</h3>
                </div>
                <div>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main>
                <h1>This is a body title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                    vero fugit. Vitae adipisci aliquid aperiam iste magni maiores
                    accusamus atque ad minus ab animi non iusto eligendi, tempore, omnis
                    facilis.
                </p>
            </main>
            <footer>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
```

Now we will write some CSS in the CSS file for our app.

```css
/* App.module.css */

.app {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.nav {
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.main {
    width: 70%;
    margin: 0 auto;
}

.footer {
    background-color: #666;
    color: #fff;
    padding: 2rem 4rem;
}
```

```jsx
// App.jsx

import classes from './App.module.css';

function App() {
    return (
        <div className={classes.app}>
            <nav className={classes.nav}>
                <div className={classes.brand}>
                    <h3>Brand Name</h3>
                </div>
                <div className={classes.menu}>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main className={classes.main}>
                <h1>This is a body title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                    vero fugit. Vitae adipisci aliquid aperiam iste magni maiores
                    accusamus atque ad minus ab animi non iusto eligendi, tempore, omnis
                    facilis.
                </p>
            </main>
            <footer className={classes.footer}>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
```


After doing all this, our UI will look like this -

![UI](./images/UI-04.png)

Just a basic structure.

### Deciding What Can Be Reused

Let's assume that the navbar and footer will be seen on all the pages that come when clicking on our nav links, and the main content will remain centered but the content will be different. This means we need to reuse these. How can we do that? We can create a layout component that will have the navbar, footer, and main section.

### Layout Component

We will take a folder named layout inside the components folder. There we will take two files named Layout.jsx and Layout.module.css. And we will write the following code in them.

```jsx
// /components/layout/Layout.jsx

import classes from './Layout.module.css';

function Layout() {
    return (
        <div className={classes.app}>
            <nav className={classes.nav}>
                <div className={classes.brand}>
                    <h3>Brand Name</h3>
                </div>
                <div className={classes.menu}>
                    <ul>
                        <li>Link One</li>
                        <li>Link Two</li>
                        <li>Link Three</li>
                    </ul>
                </div>
            </nav>
            <main className={classes.main}></main>
            <footer className={classes.footer}>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default Layout;
```

```css
/* /components/layout/Layout.module.css */

.app {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.nav {
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.main {
    width: 70%;
    margin: 2rem auto;
}

.footer {
    background-color: #666;
    color: #fff;
    padding: 2rem 4rem;
}
```

Now we will clean up our App.jsx file a bit and import the Layout component there and write it several times as jsx.

```jsx
// App.jsx

import Layout from './components/layout/Layout';

function App() {
    return (
        <div>
            <Layout />
            <Layout />
            <Layout />
        </div>
    );
}

export default App;
```

Now let's see how our UI looks.

![UI](./images/UI-05.png)

We see that the navbar and footer are there, but even though there is space for the main section in between, there is no content. Now let's write the Layout component as an opening and closing tag instead of a self-closing tag and put some content in between.


```jsx
import Layout from './components/layout/Layout';

function App() {
    return (
        <div>
            <Layout>
                <h3>Hello World</h3>
            </Layout>
            <Layout>
                <h3>Hello React</h3>
            </Layout>
            <Layout>
                <h3>Hello Component</h3>
            </Layout>
        </div>
    );
}

export default App;
```

Even now, nothing came up. We know that if we have different data, it will come through props. Let's log the props object in our Layout component to see what comes.

```jsx
// /components/layout/Layout.jsx

import classes from './Layout.module.css';

function Layout(props) {
    console.log(props);
    return <div className={classes.app}>...</div>;
}

export default Layout;
```

Now if we go to our browser, we will see that the props object has a property named children. That means if we pass props.children, we will get our children in the UI.

![UI](./images/UI-06.png)

```jsx
// /components/layout/Layout.jsx

import classes from './Layout.module.css';

function Layout(props) {
    console.log(props);
    return (
        <div className={classes.app}>
            ...
            <main className={classes.main}>{props.children}</main>
            ...
        </div>
    );
}

export default Layout;
```

Now see, all the content has come to our UI.

![UI](./images/UI-07.png)

Now we can change our content as we like. For example -

```jsx
import Button from './components/button/Button';
import Layout from './components/layout/Layout';

function App() {
    return (
        <div>
            <Layout>
                <h3>Hello World</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad explicabo
                    reprehenderit, exercitationem nemo rem modi dolorem minus officia
                    fugit vero cum atque iure dignissimos, eveniet veniam veritatis sunt
                    labore architecto?
                </p>
                <Button variant="primary" size="medium" text="Call to action" />
            </Layout>
            <Layout>
                <h3>Submit a form</h3>
                <input type="email" />
                <Button variant="primary" size="small" text="Subscribe" />
            </Layout>
            <Layout>
                <h3>Hello Component</h3>
            </Layout>
        </div>
    );
}

export default App;
```

Let's see how our UI looks.

![UI](./images/UI-08.png)

### Making Links Clickable

Now we will make our links clickable. Normally, we use anchor tags to make any link clickable, which takes us from one page to another. But in React, when we click on a link, we see that it shows the new page immediately without loading. How is that happening? It is because we are not going to a new page. In React, there is only one HTML file. We are seeing the same page repeatedly. So, how did the data change? React very subtly removes the old data behind the scenes and renders new data on the same page, which we don't even notice. Now we will make our links work like React. This system is called **routing**. But we will not learn React Router now because it is an advanced concept. We will learn it later. For now, we will use [Reach Router](https://reach.tech/router/). If you don't understand this concept now, it's okay. Our focus is on building components. We will learn these advanced concepts in detail later. We will install it using the comment below.

```sh
npm install @reach/router
# or
yarn add @reach/router
```

When working with routing, we need to create separate components for each page. We can keep these components in a folder named routes or pages. Here we created a pages folder. We created three files named Home.jsx, About.jsx, and Help.jsx. Now we will write the following code in these three files.

```jsx
// Home.jsx

import Layout from '../components/layout/Layout';

const Home = () => {
    return (
        <Layout>
            <h1>Hello, I am Home page</h1>
        </Layout>
    );
};

export default Home;
```

```jsx
// About.jsx

import Layout from '../components/layout/Layout';

const About = () => {
    return (
        <Layout>
            <h1>Hello, I am About page</h1>
        </Layout>
    );
};

export default About;
```

```jsx
// Help.jsx

import Layout from '../components/layout/Layout';

const Help = () => {
    return (
        <Layout>
            <h1>Hello, I am Help page</h1>
        </Layout>
    );
};

export default Help;
```

Now we will go to our App.jsx and change our code.

```jsx
import { Router } from '@reach/router';
import About from './pages/About';
import Help from './pages/Help';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Home path="/" />
            <About path="/about" />
            <Help path="/help" />
        </Router>
    );
}

export default App;
```

Now if we hit `localhost:3000`, we will see the content of the home page instead of the three.

![home](./images/home.png)

Similarly, if we hit `localhost:3000/about` and `localhost:3000/help`, we will see the content of the About and Help pages respectively.

![about](./images/about.png)

![help](./images/help.png)

Now we will go to our Layout component and link our routers.

```jsx
// Layout.jsx

import { Link } from '@reach/router';
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={classes.app}>
            <nav className={classes.nav}>
                <div className={classes.brand}>
                    <h3>Brand Name</h3>
                </div>
                <div className={classes.menu}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/help">Help</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Layout;
```

Now, when we click on the nav button, it will take us to that page without any reload. Amazing technology of React. Normally, we would have to do this work on three pages. But in React, we can do these things in one place.

Now we will check which path is active. We will highlight the active one separately, meaning we will add an active class.

The router can easily do the path-finding work. But since we are not diving deep into the router now, we will do this manually. That is through `window.location.pathname`.

First, we will create a class in the CSS file.

```css
/* Layout.module.css */

.navItemActive {
    color: #ff0000;
    text-decoration: underline;
    font-weight: bold;
}
```

Now we will write the logic in our layout component.

```jsx
// Layout.jsx

import { Link } from '@reach/router';
import classes from './Layout.module.css';

function Layout(props) {
    const path = window.location.pathname;
    return (
        <div className={classes.app}>
            <nav className={classes.nav}>
                <div className={classes.brand}>
                    <h3>Brand Name</h3>
                </div>
                <div className={classes.menu}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={
                                    path === '/' ? classes.navItemActive : classes.navItem
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={
                                    path === '/about' ? classes.navItemActive : classes.navItem
                                }
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/help"
                                className={
                                    path === '/help' ? classes.navItemActive : classes.navItem
                                }
                            >
                                Help
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className={classes.main}>{props.children}</main>
            <footer className={classes.footer}>
                <h3>Footer</h3>
                <ul>
                    <li>Footer Link One</li>
                    <li>Footer Link Two</li>
                    <li>Footer Link Three</li>
                </ul>
            </footer>
        </div>
    );
}

export default Layout;
```

Now if we see our UI, we will see that the nav button of the page we are on is shown as active.

![active](./images/active.png)

### Home Page Decoration and Code Reuse

Suppose we want some content like this on our home page.

```jsx
// Home.jsx

import Layout from '../components/layout/Layout';

const Home = () => {
    return (
        <Layout>
            <section>
                <h1>Experience</h1>
                <ul>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
                        sed.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Doloremque, pariatur.
                    </li>
                </ul>
            </section>

            <section>
                <h1>Education</h1>
                <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                </ul>
            </section>
        </Layout>
    );
};

export default Home;
```

We can see that both have a title and some list items. If we can extract them, we can reuse the code. For that, we will create a folder named section in the components folder and create a file named Section.jsx.

```jsx
// Section.jsx

const Section = ({ title, items }) => {
    const itemsArray = items.map((item) => <li>{item}</li>);
    return (
        <section>
            <h1>{title}</h1>
            <ul>{itemsArray}</ul>
        </section>
    );
};

export default Section;
```

```jsx
// Home.jsx

import Layout from '../components/layout/Layout';
import Section from '../components/section/Section';

const experiences = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
];

const educations = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sed.',
];

const Home = () => {
    return (
        <Layout>
            <Section title="Experiences" items={experiences} />
            <Section title="Educations" items={educations} />
        </Layout>
    );
};

export default Home;
```

![section](./images/section.png)

You can see how easily code can be reused dynamically.

Understanding this much, we can build many complex applications based on this theory. But there is a slight problem. For example, we have used data statically in an array. But in real-life applications, data will come from some server. Managing that data is the main thing. Let's break down what we have learned so far in React in simple terms and see what we get -

- Designing Component
  - Props
  - Component tree
  - State

## State

State is simply an isolated piece of data. Suppose we define a state within a UI or component, then that state cannot be accessed outside of that specific component. In other words, the data specific to a component is called the state. Now, how can we define state? Since we are saying state is a type of data, we can define it with a variable. If we define a variable in About.jsx and want to see it, we will write it like this -

```jsx
// About.jsx

import Layout from '../components/layout/Layout';

const About = () => {
    let count = 1;
    return (
        <Layout>
            <h1>Hello, I am About page</h1>
            <h1>COUNT: {count}</h1>
        </Layout>
    );
};

export default About;
```

![state](./images/state-01.png)

We have been able to show our variable. So, is the state work done? No, it's not done yet. Because we just showed it. But if we want to update it, what will happen?

```jsx
import Layout from '../components/layout/Layout';

const About = () => {
    let count = 1;

    function increment() {
        count++;
        console.log(count);
    }
    return (
        <Layout>
            <h1>Hello, I am About page</h1>
            <h1>COUNT: {count}</h1>
            <button onClick={increment}>Increase by 1</button>
        </Layout>
    );
};

export default About;
```

![state](./images/state-02.png)

We see that the count value is increasing, which is logging in the console but not showing in the UI. Why? Because one characteristic of React is that it does not consider any change in the world as a change until it sees a change in its own data. In other words, React will only accept the change if we define the variable in its own way; otherwise, it will not accept it. React has two DOMs, one virtual which is in RAM, and another is the browser DOM. When something changes, the first change will come to the virtual DOM. The virtual DOM will compare with the actual DOM and only change the data if it sees a change. The problem with our code is that when we declare a variable, React does not understand that it also needs to track this variable. Because we can declare thousands of variables in our application. Now, React does not try to understand which variable to track and which to keep. It will only track the variables declared in its system; otherwise, it will not even look at them. And this system is called **state**. Whenever we click a button or interact with a component, React re-renders. We need to understand this concept. When does a component re-render?

- When a prop changes.
- When a state changes.
- When the parent component re-renders.

There are no props in our code, so there is no question of change. We did not define state, so there is no question of that change either. And there is no logic for the parent component to re-render. Now, we will declare the variable we declared in the React way using the `useState` hook.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const About = () => {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }
    return (
        <Layout>
            <h1>Hello, I am About page</h1>
            <h1>COUNT: {count}</h1>
            <button onClick={increment}>Increase by 1</button>
        </Layout>
    );
};

export default About;
```

Now if we click the button, we will see the data being updated.

## What is useState

useState is a React function that returns an array and takes the initial value as an argument. The first element of this array is the data or state, and the second element is the updater function. We can use the state anywhere, but it must be updated through the updater function. And when the state is updated, the UI will change.

## Using State in External Component

Suppose we have a separate component named DisplayCount. Its job is to show our counter. Now how will we use our state here? We can do this through props. Let's see.

```jsx
const DisplayCount = ({ count }) => {
    return <h1>COUNT: {count}</h1>;
};

export default DisplayCount;
```

```jsx
import { useState } from 'react';
import DisplayCount from '../components/display-count/DisplayCount';
import Layout from '../components/layout/Layout';

const About = () => {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }
    return (
        <Layout>
            <h1>Hello, I am About page</h1>
            <DisplayCount count={count} />
            <button onClick={increment}>Increase by 1</button>
        </Layout>
    );
};

export default About;
```

We will see that our counter will be updated properly. The reason is that the props are changing. We said that it will re-render if the props change. Although the count state is limited to the About component, it can pass this data to its child component as props if desired.

Now, if the button component is in another place, can't we update our state from there? We can, but in a slightly different way. We will go into that later. Let's create our button component first.

```jsx
const Buttons = ({ increment, decrement }) => {
    return (
        <div>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Buttons;
```

```jsx
import { useState } from 'react';
import Buttons from '../components/buttons/Buttons';
import DisplayCount from '../components/display-count/DisplayCount';
import Layout from '../components/layout/Layout';

const About = () => {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <Layout>
            <DisplayCount count={count} />
            <Buttons increment={increment} decrement={decrement} />
        </Layout>
    );
};

export default About;
```

If we go to our UI, we will see that clicking the increment button increases by 1 and clicking the decrement button decreases by 1. Here we are just passing the function as props. But the update is happening in the About component.

Now we will add a twist. The increment or decrement will be done through user input. We will take two input fields. One for increment and one for decrement. First, we need to take two states. Then we will create a component.

```jsx
const UpdateIncrementDecrement = ({
    incrementValue,
    decrementValue,
    handleIncrementChange,
    handleDecrementChange,
}) => {
    return (
        <div>
            <label>Increment</label>
            <input
                type="number"
                value={incrementValue}
                onChange={handleIncrementChange}
            />
            <label>Decrement</label>
            <input
                type="number"
                value={decrementValue}
                onChange={handleDecrementChange}
            />
        </div>
    );
};

export default UpdateIncrementDecrement;
```

```jsx
import { useState } from 'react';
import Buttons from '../components/buttons/Buttons';
import DisplayCount from '../components/display-count/DisplayCount';
import Layout from '../components/layout/Layout';
import UpdateIncrementDecrement from '../components/update-incre-decre/UpdateIncrementDecrement';

const About = () => {
    const [count, setCount] = useState(0);
    const [incrementValue, setIncrementValue] = useState(10);
    const [decrementValue, setDecrementValue] = useState(5);

    function increment() {
        setCount(count + incrementValue);
    }

    function decrement() {
        setCount(count - decrementValue);
    }

    function handleIncrementChange(event) {
        setIncrementValue(parseInt(event.target.value));
    }

    function handleDecrementChange(event) {
        setDecrementValue(parseInt(event.target.value));
    }

    return (
        <Layout>
            <DisplayCount count={count} />
            <UpdateIncrementDecrement
                incrementValue={incrementValue}
                decrementValue={decrementValue}
                handleIncrementChange={handleIncrementChange}
                handleDecrementChange={handleDecrementChange}
            />
            <Buttons increment={increment} decrement={decrement} />
        </Layout>
    );
};

export default About;
```

Now the data will be updated as we input.

I hope everyone understands the concept of how components re-render.

## Source Code

You can find all the source code of this lecture at this [link](../../src/lecture-31/).

## Author

[Aditya Chakraborty](https://github.com/adityackr)

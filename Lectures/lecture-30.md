
# Lecture 30 [Frontend 3] - Understand React Functional Component

## Introduction

The world is gradually moving away from React's class-based components. We need to understand why this is happening a bit. When React first came out, it was object or method type. We saw a little of this in the last class. There were some methods like `React.createElement()`. Using these, we had to create our UI like objects. This was very complex. In the last class, we saw how complex it is to create a UI in this way. Then came class-based components where we were introduced to JSX, through which we could create our UI very easily just like coding in HTML. This was used up to React version 16.3. Before that, there were no functional components or hooks. Although components could be created using functions, there was no functionality in them. The name was functional component, but it had no function. How strange! Right? Only some props could be passed, and the components that had no functionality were created using functions. Moving away from this concept, React 16.3 introduced us to a concept where 99% of the work, like defining state, lifecycle event-related work, etc., which was previously done using classes, can now be done through functions. The remaining 1% of work, such as error boundary-related tasks, still requires class-based components. However, its usage is very limited.

## Why the decision to jump from class to function

- The first issue is performance. Instantiating classes is very costly. It takes a lot of CPU space to instantiate each class. Since React is a frontend library, this cost will be borne by the user. If the user has a low-end PC, they won't be able to run the application smoothly. Keeping this in mind, the concept of functional components came. The performance of functional components is much faster and takes up less CPU space compared to class-based components. So, even a low-end PC user can use the application comfortably.
- Another reason is that everything in React is virtual DOM. The virtual DOM means a clone of the DOM we see is kept in RAM. We can't see it, but it exists. The problem with class components is that they work in a mutable way. If we keep the state or address in a block of memory and keep the data in another block, when it changes, the address doesn't change, but the data does. In React's case, understanding this data change is very difficult. It requires applying many complex algorithms and doing complex tasks. These create a lot of performance issues. To avoid this, we need to work in an immutable way. Then, when the state changes, both the address and data will change. This makes it easy to understand the data changing. So, functional components were introduced instead of class-based components, resulting in better performance.

### Example of Mutable

![mutable](./images/mutable.png)

First, we defined an array named `arr`. Behind the scenes, `arr` contains the address of our array. Now, when we assign `arr` to the variable `arr2`, the address of `arr` is copied into `arr2`. Since the address of `arr` and `arr2` is the same, changing the data of `arr2` also changes the data of `arr`. This is basically called mutability.

## Advantages of Functional Components

Advantages of functional components are:

- They are developer-friendly.
- Managing state in functions is much easier than in classes. State means the basis on which React will decide how the UI will change.
- JavaScript developers tend to avoid object-oriented programming. So, after the introduction of functional components, developers could easily adapt to them.

## How to Create Components

When we start building an application, we will create just one component. No matter how big it is, no matter how much JSX it requires. As we keep writing, when we see that a functionality is needed repeatedly, we will create a reusable component for it. Let's try to build something today. Let's create a sign-up form. Let's write something in our App.jsx. How to create a React app was explained in the last class. Hopefully, you all know.

```jsx
// App.jsx

function App() {
    return (
        <div>
            <div>
                <h3>Sign Up</h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
                    similique!
                </p>
            </div>

            <form>
                <div>
                    <label htmlFor="name">What is your name?</label>
                    <input type="text" id="name" />
                </div>

                <div>
                    <label htmlFor="email">What is your email?</label>
                    <input type="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">What is your password?</label>
                    <input type="password" id="password" />
                </div>

                <div>
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default App;
```

Then we will run our application by writing the command below.

```sh
yarn start
```

Our application looks very ugly. We will now write inline CSS. Inline CSS in React is written as a JavaScript object. First, we need to write `style={}`. To write any JavaScript code, we need to give a pair of curly braces first. Inside these braces, we will write our CSS object. For example: `style={{ width: '60%', padding: '2rem' }}`. We will write just like we write an object. Some may get confused seeing two pairs of curly braces. Just remember, we need to give one pair of curly braces to write any JavaScript code. And since we are writing an object, we gave another pair of curly braces.

```jsx
// App.jsx

function App() {
    return (
        <div
            style={{
                width: '50%',
                margin: '2rem auto',
                backgroundColor: '#fff',
                padding: '2rem',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                }}
            >
                <h3 style={{ fontFamily: 'Arial', fontSize: '2rem', color: '#222' }}>
                    Sign Up
                </h3>
                <p style={{ fontFamily: 'Arial', fontSize: '1rem', color: '#666' }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
                    similique!
                </p>
            </div>

            <form>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <label
                        style={{
                            fontFamily: 'Arial',
                            fontSize: '1rem',
                            color: '#424242',
                            fontWeight: 'bold',
                        }}
                        htmlFor="name"
                    >
                        What is your name?
                    </label>
                    <input
                        style={{
                            padding: '0.5rem 1rem',
                            outline: 'none',
                            border: '1px solid #ddd',
                            borderRadius: '0.15rem',
                            fontFamily: 'Arial',
                            fontSize: '0.9rem',
                            color: '#666',
                        }}
                        type="text"
                        id="name"
                    />
                </div>

                <div>
                    <label htmlFor="email">What is your email?</label>
                    <input type="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">What is your password?</label>
                    <input type="password" id="password" />
                </div>

                <div>
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default App;
```

```css
/* index.css */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #efefef;
}
```


Now our UI will look like this.

![UI](./images/UI-01.png)

Now our email and password divs will look the same. In normal HTML, we would just copy, paste, and change the text. But since we are in React, we will create a reusable component.

- When do we decide to create a new component?
  - When we have to write duplicate code.

Now, if we try to create a component for name, email, and password in this application, what could be our challenge? The first challenge is that even though these three divs look the same, their labels are different, and their behavior is different. So, we need to create a system to manage these. First, let's create a component. For that, we will create another folder named components inside the src folder. Inside it, we will create another folder named input-group. There we will create a file named InputGroup.jsx. Component names usually start with a capital letter. Then we will create the component.

```jsx
// InputGroup.jsx

const InputGroup = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1rem',
            }}
        >
            <label
                style={{
                    fontFamily: 'Arial',
                    fontSize: '1rem',
                    color: '#424242',
                    fontWeight: 'bold',
                }}
                htmlFor="name"
            >
                What is your name?
            </label>
            <input
                style={{
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '0.15rem',
                    fontFamily: 'Arial',
                    fontSize: '0.9rem',
                    color: '#666',
                }}
                type="text"
                id="name"
            />
        </div>
    );
};

export default InputGroup;
```

Then we can import this component in App.jsx and use it as many times as we want.

```jsx
// App.jsx

import InputGroup from './components/input-group/InputGroup';

function App() {
    return (
        <div
            style={{
                width: '50%',
                margin: '2rem auto',
                backgroundColor: '#fff',
                padding: '2rem',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                }}
            >
                <h3 style={{ fontFamily: 'Arial', fontSize: '2rem', color: '#222' }}>
                    Sign Up
                </h3>
                <p style={{ fontFamily: 'Arial', fontSize: '1rem', color: '#666' }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
                    similique!
                </p>
            </div>

            <form>
                <InputGroup />
                <InputGroup />
                <InputGroup />

                <div>
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default App;
```

Now if we see our output, it will look like this.

![UI-02](./images/UI-02.png)

We see that our three components have appeared the same way. But there is a problem here. The problem is that our data is the same everywhere. It won't work if the data is the same. We need to change it.

When creating a component, we need to keep in mind which data we need to change. In this case, our labels are different, input types are different, and IDs are different. Based on these, we need to modify the component a bit.

```jsx
// InputGroup.jsx

const InputGroup = () => {
    const label = 'What is your name?';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1rem',
            }}
        >
            <label
                style={{
                    fontFamily: 'Arial',
                    fontSize: '1rem',
                    color: '#424242',
                    fontWeight: 'bold',
                }}
                htmlFor="name"
            >
                {label}
            </label>
            <input
                style={{
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '0.15rem',
                    fontFamily: 'Arial',
                    fontSize: '0.9rem',
                    color: '#666',
                }}
                type="text"
                id="name"
            />
        </div>
    );
};

export default InputGroup;
```

If we put our label text in a variable and pass that variable into the label, we won't see any changes. That means we can pass data as a variable inside JSX. So, if we can change the data of the variable, our label's data will also change. This can be done if we can pass this variable from the outside.

In this case, since we are creating a JavaScript function, we can take the variable as an argument. But React will only accept one argument. It won't accept more than one argument. This argument is called `props`, and it is an empty object. Now the question is, where will the data come from in this object? It will come from where we are calling the component. Just like in a normal function, we give data as an argument where we call the function, the concept is the same here. So, if we put the label in the ...

```jsx
// InputGroup.jsx

const InputGroup = (props) => {
    const label = props.label;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1rem',
            }}
        >
            <label
                style={{
                    fontFamily: 'Arial',
                    fontSize: '1rem',
                    color: '#424242',
                    fontWeight: 'bold',
                }}
                htmlFor="name"
            >
                {label}
            </label>
            <input
                style={{
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '0.15rem',
                    fontFamily: 'Arial',
                    fontSize: '0.9rem',
                    color: '#666',
                }}
                type="text"
                id="name"
            />
        </div>
    );
};

export default InputGroup;
```

If we do this, we will see that no label will show in our output because we haven't passed it yet in App.jsx.

![UI](./images/UI-03.png)

Now let's see how to pass the label where we called our component.

```jsx
<form>
    <InputGroup label="What is your name?" />
    <InputGroup label="What is your email?" />
    <InputGroup label="What is your password?" />

    <div>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
    </div>
</form>
```

If we do this, we will see the labels showing beautifully in our output.

![UI](./images/UI-04.png)

Now let's do the same for the type.

```jsx
// InputGroup

const InputGroup = (props) => {
    const label = props.label;
    const type = props.type;
    const id = props.id;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1rem',
            }}
        >
            <label
                style={{
                    fontFamily: 'Arial',
                    fontSize: '1rem',
                    color: '#424242',
                    fontWeight: 'bold',
                }}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                style={{
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '0.15rem',
                    fontFamily: 'Arial',
                    fontSize: '0.9rem',
                    color: '#666',
                }}
                type={type}
                id={id}
            />
        </div>
    );
};

export default InputGroup;
```

```jsx
// App

<form>
    <InputGroup label="What is your name?" type="text" id="name" />
    <InputGroup label="What is your email?" type="email" id="email" />
    <InputGroup label="What is your password?" type="password" id="password" />

    <div>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
    </div>
</form>
```

Now let's create a component for the button. For that, we will create a folder named button inside the components folder. Inside it, we will create a file named Button.jsx. We will create a button component for 5 variants. We will keep these variants inside an object.

```jsx
// Button

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

const Button = (props) => {
    const userVariant = variant[props.variant];
    return (
        <button
            type={props.type}
            style={{
                padding: '1rem 2rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                marginRight: '1rem',
                cursor: 'pointer',
                borderRadius: '0.15rem',
                ...userVariant,
            }}
        >
            {props.text}
        </button>
    );
};

export default Button;
```

Here we will create a button. But with it, we can do 5 different tasks. Now let's see how it looks if we import and use the button component in App.jsx.

```jsx
// App
import Button from './components/button/Button';

<form>
    <InputGroup label="What is your name?" type="text" id="name" />
    <InputGroup label="What is your email?" type="email" id="email" />
    <InputGroup label="What is your password?" type="password" id="password" />

    <div>
        <Button type="reset" text="Reset" variant="warning" />
        <Button type="submit" text="Submit" variant="primary" />
        <Button type="button" text="Cancel" variant="error" />
    </div>
</form>;
```

Now if we see our output, it will look like this.

![UI](./images/UI-05.png)

Now if we create an object for the size of our button like we did for the variant and have the ability to change it as we like, how would that be? Let's do it.

```jsx
// Button

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
            style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                marginRight: '1rem',
                cursor: 'pointer',
                borderRadius: '0.15rem',
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

```jsx
// App

<form>
    <InputGroup label="What is your name?" type="text" id="name" />
    <InputGroup label="What is your email?" type="email" id="email" />
    <InputGroup label="What is your password?" type="password" id="password" />

    <div>
        <Button type="reset" text="Reset" variant="warning" size="small" />
        <Button type="submit" text="Submit" variant="primary" size="medium" />
        <Button type="button" text="Cancel" variant="error" size="large" />
    </div>
</form>
```

![UI](./images/UI-06.png)

This means we can say that when we need to reuse our code, we need to create a new component. At least we understand why and how to reuse code. We could also have used arrays instead of the variant and sizes objects. But in that case, we would have to run a find operation each time. This would result in poor performance due to repeated operations.

There are more issues here. For example, what happens if the user doesn't pass the correct object key, or if they don't pass any key at all, these will be discussed later. There is a big discussion on this, so more on this later.

From this discussion, we understood when to create reusable components and how to create them. The biggest thing we learned is when to decide that we need a reusable component. That is, if a component is used more than once, then we will create a reusable component. Suppose you wrote two thousand lines of JSX code, but you didn't find any code that could be reusable, then you don't need to create a reusable component.

When creating a new component, our main focus will be on which data will be different for different situations. The data that will be different will be taken as props and represented as variables.

We can dynamically define the size, color, shape, etc., of a component using props. Various libraries define these properties based on props.

Our first target when learning React should be to learn props well.

## Task for this Lecture

Create 3 HTML templates like React. To create this, keep in mind that whenever you see a duplicate structure, make it a component.

## Source Code

All source code for this lecture can be found at this [link](../../src/lecture-30/react-app/).

## Author

[Aditya Chakraborty](https://github.com/adityackr)

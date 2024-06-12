
# Lecture 41 - Understand The Usage of useEffect Hook

## Introduction

Today, we will discuss an important React hook called `useEffect`. Two hooks in React are very important - `useState` and `useEffect`. We have already worked a lot with `useState`. Now, we will learn about the `useEffect` hook.

## useEffect

According to the official React [site](https://reactjs.org/docs/hooks-effect.html), `Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.` Previously, when we created class-based components, we couldn't add many features. It was very cumbersome to add advanced features, and in some cases, it wasn't possible. To understand what we had to use to manage components before, you can check this [link](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/). There were many tasks to perform, and maintaining them was very difficult. But now, we control all these things with just one concept: the `useEffect` hook. We can use this hook in our application by importing it. Initially, this hook might seem difficult. However, once we understand why, where, and how to use it, it becomes much easier. As beginners, it might seem challenging, but as developers, it has made our lives much easier. `useEffect` is essentially a function that accepts another function as an argument.

## The purpose of useEffect

It performs three major tasks previously handled by different lifecycle methods:

- Acts like `componentDidMount`
- Acts like `componentDidUpdate`
- Acts like `componentWillUnmount`

Additionally, it can also handle tasks similar to `shouldComponentUpdate`.

Let's look at an example of `useEffect`.

```jsx
function App() {
    console.log(document.getElementById('test').innerHTML);

    return <h1 id="test">App</h1>;
}

export default App;
```

We want to see the text of the HTML element. But when you write the above code, it will show an error.

![L41-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663130864662/vhOb9TgHF.png)

The reason is that we know the code runs from top to bottom. When we try to access the element, it hasn't been rendered yet. As a result, our code can't recognize the element with the `test` ID and throws an error. Now, if we write the code as shown below, let's see what happens.

```jsx
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        console.log(document.getElementById('test').innerHTML);
    });

    return <h1 id="test">App</h1>;
}

export default App;
```

Now, you'll see our code runs smoothly and outputs what we expected. We can also change the `innerHTML` of the `h1` using `useEffect`.

```jsx
function App() {
    useEffect(() => {
        document.getElementById('test').innerHTML = 'Hello World';
        console.log(document.getElementById('test').innerHTML);
    });

    return <h1 id="test">App</h1>;
}
```

Now, if you check in the browser, you'll see that "App" has changed to "Hello World".

We can see the purpose of `useEffect` here: if we ever need to access any HTML element after rendering and manipulate it through pure DOM manipulation within a component, we will use `useEffect`. In other words, first, our UI will render, and then `useEffect` will be called. This might be necessary in projects like animations where accessing `height`, `width`, position, etc., becomes crucial, and in such cases, we will use `useEffect`. It is also very useful for scroll effects. For instance, in some applications, new data appears after scrolling to a certain position. In such cases, `useEffect` is used. It is also used to add jQuery plugins, various third-party DOM libraries that are not related to React. Let's see an example using jQuery. First, we will install it using the command `yarn add jquery`. We want an alert to show when we click a button, and we will do this using [jQuery](https://jquery.com/).

```jsx
import $ from 'jquery';

function App() {
    $('#btn').on('click', function () {
        alert('I am jQuery. Still Alive');
    });
    return (
        <div>
            <h1 id="test">Hello World</h1>
            <button id="btn">Click Me</button>
        </div>
    );
}
```

What do you think will happen? You will see that the button doesn't work. In other words, you didn't get access to it because you are trying to access something that hasn't been rendered yet. How can you access that element if it hasn't been rendered? The solution is to use the `useEffect` hook.

```jsx
import $ from 'jquery';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        $('#btn').on('click', () => {
            alert('I am jQuery. Still Alive');
        });
    });

    return (
        <div>
            <h1 id="test">Hello World</h1>
            <button id="btn">Click Me</button>
        </div>
    );
};
```

Now you'll see that the alert message appears when you click the button.

> In other words, if you ever need to access something in the DOM in such a situation, you need to use the `useEffect` hook. Otherwise, you won't get access to that element.

Now we want to know the position of the button. This can also be done using the `useEffect` hook.

```js
useEffect(() => {
    const btn = document.getElementById('btn');
    console.log(btn.offsetHeight, btn.offsetWidth);
});
```

So you can see that this small concept will be very useful to us in the future.

Aside from accessing DOM elements, what other uses does this hook have? Simply put, to build a proper functional component, one of the most necessary things is the `useEffect` hook. It will be useful everywhere.

Let's see another example. We want a system where when counting reaches a certain number, it gets locked. Let's see how that can be done. First, we will take two states.

```jsx
const App = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    return (
        <div>
            <h1 id="count">{count}</h1>
            <button id="btn" disabled={lock} onClick={() => setCount(count + 1)}>
                Add {lock && '(locked)'}
            </button>
        </div>
    );
};
```

Now we want the `lock` value to become `true` when our count reaches 5. We can add a condition to do that.

```jsx
const App = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    if (count === 5) {
        setLock(true);
    }

    return (
        <div>
            <h1 id="count">{count}</h1>
            <button id="btn" disabled={lock} onClick={() => setCount(count + 1)}>
                Add {lock && '(locked)'}
            </button>
        </div>
    );
};
```


What did you see? Our application crashed. The reason is that when the count value becomes 5, the lock state updates. Whenever the state updates, we know the component re-renders. That means the entire code runs again from the beginning. As soon as it hits this condition again, it updates the state again. And the component re-renders once more. This might look small, but think on a larger scale. Imagine you visit a webpage that fetches data from a server and renders it for you. Now, if the logic to fetch the data is written in a part of the component itself, the component will keep re-rendering because the state is updating. This will continue until the application crashes. The solution to this problem is the `useEffect` hook.

```jsx
import { useEffect, useState } from 'react';

const App = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    useEffect(() => {
        if (count === 5) {
            setLock(true);
        }
        console.log('count', count);
    });

    return (
        <div>
            <h1 id="count">{count}</h1>
            <button id="btn" disabled={lock} onClick={() => setCount(count + 1)}>
                Add {lock && '(locked)'}
            </button>
        </div>
    );
};

export default App;
```

![L41-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663142239633/Xh1GllCF2.png)

But you can see that `count 5` is printed twice. The reason is that the first time `useEffect` is called, it prints once, and later, when it re-renders due to state update, it prints again. Because the count state is not updating, it calls again when it re-renders and gets the count value. If we can create a dependency with the count for `useEffect`, we can avoid this problem. For that, we can pass `[count]` as the second argument to `useEffect`. This means `useEffect` will be called until the count value becomes 5. Once it becomes 5, `useEffect` will no longer be called.

```jsx
useEffect(() => {
    if (count === 5) {
        setLock(true);
    }
    console.log('count', count);
}, [count]);
```

Now you will see that `count 5` is printed only once. If we pass `[]` instead of `[count]`, `useEffect` will be called only once, the first time. After that, `useEffect` will not work. In other words, passing `[]` means our `useEffect` will be called only once.

A function can also be returned from the `useEffect` callback function. We will return this function when we need to delete some events related to a component because it is being deleted. This works like the old version's `componentWillUnmount`. When we write `useEffect` without dependencies, it works like `componentDidMount`. When we write it with a dependency array, it works like `componentDidUpdate`. When we write logic to check if a state should be updated, it works like `shouldComponentUpdate`. So this single `useEffect` hook is performing a total of four tasks.

## Multiple `useEffect` in a single component

You can use `useEffect` multiple times in a single component if needed. For example, we want the lock to last for only 5 seconds when lock = true, and after 5 seconds, it will become false again. We also want to show a countdown beside the button indicating how many seconds are left.

```jsx
import { useEffect, useState } from 'react';

let timeInterval = null;

const App = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [timeCount, setTimeCount] = useState(5);

    useEffect(() => {
        if (count === 5) {
            setLock(true);
        }
        console.log('count', count);

        return () => {};
    }, [count]);

    useEffect(() => {
        if (lock && timeInterval === null) {
            timeInterval = setInterval(() => {
                setTimeCount((prev) => prev - 1);
            }, 1000);
        }
    }, [lock]);

    useEffect(() => {
        if (timeCount === 0) {
            clearInterval(timeInterval);
            setCount(0);
            setLock(false);
            setTimeCount(5);
        }
    }, [timeCount]);

    return (
        <div>
            <h1 id="count">{count}</h1>
            <button id="btn" disabled={lock} onClick={() => setCount(count + 1)}>
                Add {lock && `(locked: ${timeCount}s)`}
            </button>
        </div>
    );
};

export default App;
```

We can use multiple `useEffect` hooks as needed in a single component.

## Another Example

Now let's see why `useEffect` is so important. We will build an application that fetches data from `https://jsonplaceholder.typicode.com/users`.

```jsx
import { useState } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data));
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
```

If you check in the browser, you will see that it shows the names of all the users correctly. But if you check the network tab in the developer tools, you will see that it is making many requests to the same place every second. If this continues, the IP address will eventually get blocked. The reason, as mentioned earlier, is that the state update causes re-rendering, and re-rendering causes the state to update. An infinite loop is created. The solution is to use `useEffect`.

```jsx
useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data));
}, []);
```

Now everything is fine because we specified in the dependency array to fetch data from the server only once. It will not be called more than once.

If we wanted to see the data of a single user, how would we do that? In this case, `useEffect` wouldn't help. But there is a very nice solution for that. Before that, let's set up our application a bit.


```jsx
import { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    return (
        <div>
            <h1>User Detail</h1>
            {user && (
                <div>
                    name: {user.name}
                    <br />
                    email: {user.email}
                    <br />
                    phone: {user.phone}
                </div>
            )}
        </div>
    );
};

export default App;
```

If you check the UI, you will see that the name, email, and phone number of the user with `id: 1` have been rendered. Now, we want to create a system where we can get the details of the next user.

```jsx
import { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState({});
    const [id, setId] = useState(1);
    const max = 10;

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, [id]);

    const nextHandler = () => {
        if (id < max) {
            setId(id + 1);
        }
    };

    const prevHandler = () => {
        if (id > 1) {
            setId(id - 1);
        }
    };

    return (
        <div>
            <h1>User Detail: {id}</h1>
            {user && (
                <div>
                    name: {user.name}
                    <br />
                    email: {user.email}
                    <br />
                    phone: {user.phone}
                </div>
            )}
            <div>
                <button disabled={id === 1} onClick={prevHandler}>
                    previous
                </button>
                <button disabled={id === max} onClick={nextHandler}>
                    next
                </button>
            </div>
        </div>
    );
};

export default App;
```

When we click the next button, we will get the details of the next user, and when we click the previous button, we will get the details of the previous user.

Now, we see that it takes some time to load each piece of data. In that case, we can add a loading spinner.

```jsx
import { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(1);
    const max = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .finally(() => setLoading(false));
    }, [id]);

    const nextHandler = () => {
        if (id < max) {
            setId(id + 1);
        }
    };

    const prevHandler = () => {
        if (id > 1) {
            setId(id - 1);
        }
    };

    return (
        <div>
            <h1>User Detail: {id}</h1>
            {loading && <p>loading...</p>}
            {!loading && user && (
                <div>
                    name: {user.name}
                    <br />
                    email: {user.email}
                    <br />
                    phone: {user.phone}
                </div>
            )}
            <div>
                <button disabled={id === 1} onClick={prevHandler}>
                    previous
                </button>
                <button disabled={id === max} onClick={nextHandler}>
                    next
                </button>
            </div>
        </div>
    );
};

export default App;
```

Now, when the data is loading, it will show `loading...`.

Next, we will create a system where if any data is loaded once, it will be stored somewhere and will not be loaded again as long as the application is running, but will be fetched from the store instead.

```jsx
import { useEffect, useState } from 'react';

const cacheData = {};

const App = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(1);
    const max = 10;

    useEffect(() => {
        if (cacheData[`user-${id}`]) {
            setUser(cacheData[`user-${id}`]);
            return;
        }
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                cacheData[`user-${id}`] = data;
            })
            .finally(() => setLoading(false));
    }, [id]);

    const nextHandler = () => {
        if (id < max) {
            setId(id + 1);
        }
    };

    const prevHandler = () => {
        if (id > 1) {
            setId(id - 1);
        }
    };

    return (
        <div>
            <h1>User Detail: {id}</h1>
            {loading && <p>loading...</p>}
            {!loading && user && (
                <div>
                    name: {user.name}
                    <br />
                    email: {user.email}
                    <br />
                    phone: {user.phone}
                </div>
            )}
            <div>
                <button disabled={id === 1} onClick={prevHandler}>
                    previous
                </button>
                <button disabled={id === max} onClick={nextHandler}>
                    next
                </button>
            </div>
        </div>
    );
};

export default App;
```

If you look at the network tab while clicking the button, you will see that a fetch request is made the first time. But after that, no more requests are made to load the data; it is fetched from `cacheData`.

Now, let's create a function.

```js
const fetchUser = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
            cacheData[`user-${id}`] = data;
            return data;
        });
};
```

Next, we will use this function inside our `useEffect` function.

```jsx
useEffect(() => {
    if (cacheData[`user-${id}`]) {
        setUser(cacheData[`user-${id}`]);
        return;
    }
    setLoading(true);
    fetchUser(id)
        .then((data) => {
            setUser(data);
        })
        .finally(() => setLoading(false));
}, [id]);
```

Now, to avoid the flickering or loading... text when data is loading, we will use another `useEffect` hook.

```jsx
useEffect(() => {
    if (!cacheData[`user-${id + 1}`] && id < max) {
        fetchUser(id + 1);
    }
}, [id]);
```

If you look at the network tab, you will see that when we load the application, the first and second data are loaded. Then, when we click the next button to bring the second data, the third data is loaded at that moment. This way, the next data is loaded on each click, so we don't have to wait to see the data.

Now, let's see a new pattern. Most applications are currently created using this pattern. It is done through custom hooks.

We will create a file named `App_Hook.jsx` and place the following code there.

```jsx
import { useEffect, useState } from 'react';

const cacheData = {};

const useApp = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(1);
    const max = 10;

    useEffect(() => {
        if (cacheData[`user-${id}`]) {
            setUser(cacheData[`user-${id}`]);
            return;
        }
        setLoading(true);
        fetchUser(id)
            .then((data) => {
                setUser(data);
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!cacheData[`user-${id + 1}`] && id < max) {
            fetchUser(id + 1);
        }
    }, [id]);

    const fetchUser = (id) => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                cacheData[`user-${id}`] = data;
                return data;
            });
    };

    const nextHandler = () => {
        if (id < max) {
            setId(id + 1);
        }
    };

    const prevHandler = () => {
        if (id > 1) {
            setId(id - 1);
        }
    };

    return {
        user,
        id,
        loading,
        max,
        prevHandler,
        nextHandler,
    };
};

export default useApp;
```


Now, in the `App.jsx`, we will include our `jsx` code and import the `useApp` function from `App_Hook.jsx`.

```jsx
import useApp from './App_Hook';

const App = () => {
    const { user, id, loading, max, prevHandler, nextHandler } = useApp();

    return (
        <div>
            <h1>User Detail: {id}</h1>
            {loading && <p>loading...</p>}
            {!loading && user && (
                <div>
                    name: {user.name}
                    <br />
                    email: {user.email}
                    <br />
                    phone: {user.phone}
                </div>
            )}
            <div>
                <button disabled={id === 1} onClick={prevHandler}>
                    previous
                </button>
                <button disabled={id === max} onClick={nextHandler}>
                    next
                </button>
            </div>
        </div>
    );
};

export default App;
```

The application will run just as it did before without any issues.

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-41).

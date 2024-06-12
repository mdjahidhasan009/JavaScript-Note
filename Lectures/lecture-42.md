
# Lecture 42 - React Custom Hooks

## Introduction

So far, we have learned about the `useState` and `useEffect` hooks. In today's lecture, we will learn about custom hooks, which are a very important concept in React. Although we created a custom hook in the last lecture, we did not go into detail about it. In today's lecture, we will discuss custom hooks in detail.

## Custom hooks

In the older version of React, there were concepts like higher order component and render props. These were quite complex. Hooks have simplified those complex concepts. If we didn't have the ability to create custom hooks, we would still have to use these concepts. Then we would have to use class-based components again. Or if we wanted to use these in functional components, the patterns would become very complex. Custom hooks have freed us from that problem.

## Difference between custom hook and component

We need to understand when to call a component a custom hook and when to call it a component. We usually keep all custom hooks inside a folder named `hooks`. Let's look at the differences between custom hooks and components.

- The first difference is that the name of a component starts with a capital letter, such as `Counter`. On the other hand, the name of a custom hook starts with the word `use`, such as `useCounter`. React will understand that it is a hook just by seeing the word `use`.
- The second difference is that since a component contains `jsx` code, we give it the extension `.jsx`, such as `Counter.jsx`. But we usually do not write any `jsx` code in a custom hook, so we give it the extension `.js`, such as `useCounter.js`.

## Difference between normal function and custom hook function

The difference between a normal function and a custom hook is that we cannot use React's built-in hooks or state in a normal function. But we can use these in a hook function. All this will not make sense until we solve a problem. Let's create a problem.

## Counter app

Let's create a simple counter.

```jsx
// App.jsx

import { useState } from 'react';

const App = () => {
    const [counter1, setCounter1] = useState(0);

    return (
        <div>
            <button onClick={() => setCounter1(counter1 + 1)}>+</button>
            <span>{counter1}</span>
            <button onClick={() => setCounter1(counter1 - 1)}>-</button>
        </div>
    );
};

export default App;
```

Many may think this is very simple. But imagine there are 100 such components. Let's say we need to create another such counter. We will take another state and repeat all the work again.

```jsx
import { useState } from 'react';

const App = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    return (
        <div>
            <div>
                <button onClick={() => setCounter1(counter1 + 1)}>+</button>
                <span>{counter1}</span>
                <button onClick={() => setCounter1(counter1 - 1)}>-</button>
            </div>
            <div>
                <button onClick={() => setCounter2(counter2 + 1)}>+</button>
                <span>{counter2}</span>
                <button onClick={() => setCounter2(counter2 - 1)}>-</button>
            </div>
        </div>
    );
};

export default App;
```

This is not very complex. But imagine there are a lot of logic here. Let's say if the value of `counter` is less than 10, we will allow it to increase. And its value cannot go below 0. Let's see how to write that.

```jsx
import { useState } from 'react';

const App = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    const handleCounter1Inc = () => {
        if (counter1 < 10) {
            setCounter1(counter1 + 1);
        }
    };

    const handleCounter1Dec = () => {
        if (counter1 > 0) {
            setCounter1(counter1 - 1);
        }
    };

    const handleCounter2Inc = () => {
        if (counter2 < 10) {
            setCounter2(counter2 + 1);
        }
    };

    const handleCounter2Dec = () => {
        if (counter2 > 0) {
            setCounter2(counter2 - 1);
        }
    };

    return (
        <div>
            <div>
                <button onClick={handleCounter1Inc}>+</button>
                <span>{counter1}</span>
                <button onClick={handleCounter1Dec}>-</button>
            </div>
            <div>
                <button onClick={handleCounter2Inc}>+</button>
                <span>{counter2}</span>
                <button onClick={handleCounter2Dec}>-</button>
            </div>
        </div>
    );
};

export default App;
```

Now if another counter is added here, we have to take another state and create all the related handler functions. If another is added, we have to take another state and do all the work again. Now imagine if there is a change, we have to change all of them one by one. This is a lot of hassle. Hooks can free us from this problem. We can take custom states in hooks, add custom hooks, do whatever we want. And in the end, we can return functions or states if we want. This is the power of hooks.

Let's take a component first. To avoid UI code duplication, we will create a `CountController` component in `App.jsx`.

```jsx
import { useState } from 'react';

const CountController = ({ count, handleInc, handleDec }) => {
    return (
        <div>
            <button onClick={handleInc}>+</button>
            <span>{count}</span>
            <button onClick={handleDec}>-</button>
        </div>
    );
};

const App = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);

    const handleCounter1Inc = () => {
        if (counter1 < 10) {
            setCounter1(counter1 + 1);
        }
    };

    const handleCounter1Dec = () => {
        if (counter1 > 0) {
            setCounter1(counter1 - 1);
        }
    };

    const handleCounter2Inc = () => {
        if (counter2 < 10) {
            setCounter2(counter2 + 1);
        }
    };

    const handleCounter2Dec = () => {
        if (counter2 > 0) {
            setCounter2(counter2 - 1);
        }
    };

    const handleCounter3Inc = () => {
        if (counter3 < 10) {
            setCounter3(counter3 + 1);
        }
    };

    const handleCounter3Dec = () => {
        if (counter3 > 0) {
            setCounter3(counter3 - 1);
        }
    };

    return (
        <div>
            <CountController
                count={counter1}
                handleInc={handleCounter1Inc}
                handleDec={handleCounter1Dec}
            />
            <CountController
                count={counter2}
                handleInc={handleCounter2Inc}
                handleDec={handleCounter2Dec}
            />
            <CountController
                count={counter3}
                handleInc={handleCounter3Inc}
                handleDec={handleCounter3Dec}
            />
        </div>
    );
};

export default App;
```


Our app will still work. But we made the component reusable. However, our logic is still duplicated. For that, we will go to `src/hooks/useCounter.js` and write the following code:

```jsx
import { useState } from 'react';

const useCounter = () => {
    const [count, setCount] = useState(0);

    const handleInc = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const handleDec = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return {
        count,
        handleInc,
        handleDec,
    };
};

export default useCounter;
```

Now we will use this hook in our component.

```jsx
const App = () => {
    const { count, handleInc, handleDec } = useCounter();

    return (
        <div>
            <CountController
                count={count}
                handleInc={handleInc}
                handleDec={handleDec}
            />
        </div>
    );
};
```

You will see that our application works as before. We can use this hook not only in this component but anywhere in the entire application where a counter is needed.

If we need another counter now, we will repeat the destructuring of the custom hook. But if repeated, a naming conflict will occur. There are two ways to handle this. Both are shown below.

```jsx
const App = () => {
    const {
        count: count1,
        handleInc: handleInc1,
        handleDec: handleDec1,
    } = useCounter();
    const {
        count: count2,
        handleInc: handleInc2,
        handleDec: handleDec2,
    } = useCounter();
    const {
        count: count3,
        handleInc: handleInc3,
        handleDec: handleDec3,
    } = useCounter();

    return (
        <div>
            <CountController
                count={count1}
                handleInc={handleInc1}
                handleDec={handleDec1}
            />
            <CountController
                count={count2}
                handleInc={handleInc2}
                handleDec={handleDec2}
            />
            <CountController
                count={count3}
                handleInc={handleInc3}
                handleDec={handleDec3}
            />
        </div>
    );
};
```

```jsx
const App = () => {
    const counter1 = useCounter();
    const counter2 = useCounter();
    const counter3 = useCounter();

    return (
        <div>
            <CountController
                count={counter1.count}
                handleInc={counter1.handleInc}
                handleDec={counter1.handleDec}
            />
            <CountController
                count={counter2.count}
                handleInc={counter2.handleInc}
                handleDec={counter2.handleDec}
            />
            <CountController
                count={counter3.count}
                handleInc={counter3.handleInc}
                handleDec={counter3.handleDec}
            />
        </div>
    );
};
```

You can do it either way.

Now, if the client asks us to change the upper bound of the counter from 10 to 15, we can go to our `useCounter.js` file and change it. Even if there are 1000 counters, they will all change. So, you can understand how hooks have been a blessing for us.

By creating this hook, we get the following benefits:

- Maximum code reuse
- Can be used as many times as needed
- Can be used anywhere in the entire application

In all three of our counters, the initial value is 0, the upper bound is 10, and the lower bound is 0. That is, it starts from 0, cannot go above 10, and cannot go below 0. Now we want each counter to have different values. We can give them as arguments in our hook.

```jsx
import { useState } from 'react';

const useCounter = ({ initial = 0, lowerBound = 0, upperBound = 10 }) => {
    const [count, setCount] = useState(initial);

    const handleInc = () => {
        if (count < upperBound) {
            setCount(count + 1);
        }
    };

    const handleDec = () => {
        if (count > lowerBound) {
            setCount(count - 1);
        }
    };

    return {
        count,
        lowerBound,
        upperBound,
        handleInc,
        handleDec,
    };
};

export default useCounter;
```

We have set the default initial value to 0, the lower bound to 0, and the upper bound to 10. We can set the values as we like.

```jsx
const App = () => {
    const counter1 = useCounter({ lowerBound: -10 });
    const counter2 = useCounter({ initial: 5, lowerBound: 5, upperBound: 15 });
    const counter3 = useCounter({ initial: 10, upperBound: 20 });

    return <div>...</div>;
};
```

In the first case, it will start from 0, can go up to 10, and can go down to -10. In the second case, it will start from 5, can go up to 15, and can go down to 5. In the third case, it will start from 10, can go up to 20, and can go down to 0.

Now, we can use our hook in a separate component and use that component in the app. But like before, we will not use count, handleInc, handleDec in this component. We will just pass the arguments. Let's see how it can be done. First, we create a component.

```jsx
const CountController = (props) => {
    const { count, handleInc, handleDec } = useCounter({ ...props });
    return (
        <div>
            <button onClick={handleInc}>+</button>
            <span>{count}</span>
            <button onClick={handleDec}>-</button>
        </div>
    );
};
```

That means, in this case, we will pass the arguments of our hook function as props. So we didn't have to take the hook separately for each counter. Let's see how it can be done:

```jsx
const App = () => {
    return (
        <div>
            <CountController lowerBound={-10} />
            <CountController initial={5} lowerBound={-10} upperBound={15} />
            <CountController initial={10} upperBound={20} />
        </div>
    );
};
```


Here we just passed the arguments as props. Our application will work as before.

## Data fetch example

Now let's look at another example. In our real-life applications, we constantly fetch data. Sometimes we need to fetch user data, sometimes product data, sometimes comment data, etc. When fetching any data, we need to keep three things in mind.

- fetch and update data
- handle loading
- handle error

Let's say we want to create a system with two parts. One part for users and another part for posts.

```jsx
import React from 'react';

const App = () => {
    return (
        <div
            style={{
                width: '600px',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <h1>Users</h1>
                <hr />
            </div>
            <div>
                <h1>Posts</h1>
                <hr />
            </div>
        </div>
    );
};

export default App;
```

![l42-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663569206646/LrCqXYaqw.png)

We will fetch data from [jsonplaceholder](https://jsonplaceholder.typicode.com/) and load user data on one side and post data on the other side of the same page.

First, let's take some states.

```jsx
import { useState } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState('');
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState('');

    return <div>...</div>;
};
```

We took states for users and posts, states to handle their loading, and states to handle their errors.

Now we will create two functions to fetch users and posts.

```jsx
const fetchUsers = async () => {
    setUserLoading(true);
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUserLoading(false);
        setUserError('');
        setUsers(data);
    } catch (error) {
        setUserLoading(false);
        setUserError('Server error occurred while fetching users');
    }
};

const fetchPosts = async () => {
    setPostLoading(true);
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPostLoading(false);
        setPostError('');
        setPosts(data);
    } catch (error) {
        setPostLoading(false);
        setPostError('Server error occurred while fetching posts');
    }
};
```

Now we will call these functions inside `useEffect`. The reason for taking functions separately is that we cannot use `async await` inside `useEffect`. So, we will create functions separately and then call them inside the `useEffect` hook.

```jsx
useEffect(() => {
    fetchUsers();
    fetchPosts();
}, []);
```

Now we will render the data. Putting everything together, it will look like this:

```jsx
import { useEffect, useState } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState('');
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, []);

    const fetchUsers = async () => {
        setUserLoading(true);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setUserLoading(false);
            setUserError('');
            setUsers(data);
        } catch (error) {
            setUserLoading(false);
            setUserError('Server error occurred while fetching users');
        }
    };

    const fetchPosts = async () => {
        setPostLoading(true);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            setPostLoading(false);
            setPostError('');
            setPosts(data);
        } catch (error) {
            setPostLoading(false);
            setPostError('Server error occurred while fetching posts');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-around',
                margin: 'auto',
            }}
        >
            <div>
                <h1>Users</h1>
                <hr />
                {userLoading && <h3>Loading...</h3>}
                {userError && <h3>{userError}</h3>}
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </div>
            <div>
                <h1>Posts</h1>
                <hr />
                {postLoading && <h3>Loading...</h3>}
                {postError && <h3>{postError}</h3>}
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </div>
        </div>
    );
};

export default App;
```

And we will see the data in our UI.

![l42-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663572056913/CugmBi7Sz.png)

But we see that we have written the same code for both users and posts. That means code duplication has occurred. So we need to create a hook. We will create a file named `src/hooks/useFetchData.js`.


```jsx
import { useEffect, useState } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const result = await res.json();
            setLoading(false);
            setError('');
            setData(result);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return {
        data,
        loading,
        error,
    };
};

export default useFetchData;
```

Now we will use this hook in our App.jsx.

```jsx
import useFetchData from './hooks/useFetchData';

const App = () => {
    const users = useFetchData('https://jsonplaceholder.typicode.com/users');
    const posts = useFetchData('https://jsonplaceholder.typicode.com/posts');

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-around',
                margin: 'auto',
            }}
        >
            <div>
                <h1>Users</h1>
                <hr />
                {users.loading && <h3>Loading...</h3>}
                {users.error && <h3>{users.error}</h3>}
                {users.data.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </div>
            <div>
                <h1>Posts</h1>
                <hr />
                {posts.loading && <h3>Loading...</h3>}
                {posts.error && <h3>{posts.error}</h3>}
                {posts.data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </div>
        </div>
    );
};

export default App;
```

Our application works perfectly, but no code is repeated. We can also show comments if we want.

```jsx
import useFetchData from './hooks/useFetchData';

const App = () => {
    const users = useFetchData('https://jsonplaceholder.typicode.com/users');
    const posts = useFetchData('https://jsonplaceholder.typicode.com/posts');
    const comments = useFetchData(
        'https://jsonplaceholder.typicode.com/comments'
    );

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-around',
                margin: 'auto',
            }}
        >
            <div>
                <h1>Users</h1>
                <hr />
                {users.loading && <h3>Loading...</h3>}
                {users.error && <h3>{users.error}</h3>}
                {users.data.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </div>
            <div>
                <h1>Posts</h1>
                <hr />
                {posts.loading && <h3>Loading...</h3>}
                {posts.error && <h3>{posts.error}</h3>}
                {posts.data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </div>
            <div>
                <h1>Comments</h1>
                <hr />
                {comments.loading && <h3>Loading...</h3>}
                {comments.error && <h3>{comments.error}</h3>}
                {comments.data.map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </div>
        </div>
    );
};

export default App;
```

Comments will now be displayed on our page.

![l42-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663575445862/f68z2a0Jz.png)

Now if we go to our hook and set the initial value of `data` to `null`, our application will crash. Because `useEffect` will be called later, it will render first. While rendering, it sees that the data is `null`. And a map can never be applied on `null`. In that case, we can use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) while mapping.

```jsx
import useFetchData from './hooks/useFetchData';

const App = () => {
    const users = useFetchData('https://jsonplaceholder.typicode.com/users');
    const posts = useFetchData('https://jsonplaceholder.typicode.com/posts');
    const comments = useFetchData(
        'https://jsonplaceholder.typicode.com/comments'
    );

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-around',
                margin: 'auto',
            }}
        >
            <div>
                <h1>Users</h1>
                <hr />
                {users.loading && <h3>Loading...</h3>}
                {users.error && <h3>{users.error}</h3>}
                {users.data?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </div>
            <div>
                <h1>Posts</h1>
                <hr />
                {posts.loading && <h3>Loading...</h3>}
                {posts.error && <h3>{posts.error}</h3>}
                {posts.data?.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </div>
            <div>
                <h1>Comments</h1>
                <hr />
                {comments.loading && <h3>Loading...</h3>}
                {comments.error && <h3>{comments.error}</h3>}
                {comments.data?.map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </div>
        </div>
    );
};

export default App;
```


Optional chaining means that if the value is `null`, it will return `undefined` instead of throwing an error. In this case, the application will not crash.

## Modify the incoming data

Let's say the data we are receiving for users, posts, or comments contains some information we do not need. If we look at the state, we will see that it contains some unnecessary data. We only need the name or title. So we might need to modify the incoming data, meaning we do not keep the data we do not need in our state. Otherwise, it would just clog up the memory for no reason. In this case, what can we do? Let's see. We can map the `users` data that we are getting. But even if we map, the unnecessary data remains in our state. So what can we do? And the biggest thing is our hook should work for everyone. So how do we filter specifically? The concept that will help us here is the callback function. We can take a callback as the second parameter and check if the callback has been passed. If it has been passed, it will work accordingly. If not, it will work as it is now.

```jsx
import { useEffect, useState } from 'react';

const useFetchData = (url, cb) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const result = await res.json();
            if (cb) {
                setData(cb(result));
            } else {
                setData(result);
            }
            setLoading(false);
            setError('');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return {
        data,
        loading,
        error,
    };
};

export default useFetchData;
```

Since we have not passed any callback yet, we do not see any changes in the appearance of our application. Whatever this callback returns will be shown on our page.
For `users`, we only need the name and ID. We will only keep that in our state.

```jsx
const users = useFetchData(
    'https://jsonplaceholder.typicode.com/users',
    (data) => data.map((item) => ({ id: item.id, name: item.name }))
);
```

If we write like this, we will see that only the ID and name are stored in our state. Nothing else.

![l42-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663578599421/dIfzGhmqQ.png)

In this way, we can modify our incoming data. Now, we want to show 10 posts and comments instead of 100. And we will only store the ID and title for posts and the ID and name for comments in our state. We can do that too.

```jsx
const posts = useFetchData(
    'https://jsonplaceholder.typicode.com/posts',
    (data) =>
        data.map((item) => ({ id: item.id, title: item.title })).slice(0, 10)
);
const comments = useFetchData(
    'https://jsonplaceholder.typicode.com/comments',
    (data) => data.map((item) => ({ id: item.id, name: item.name })).slice(0, 10)
);
```

We will see that only 10 data points are shown.

![l42-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663578790972/Xzqv8U25p.png)

At the same time, only the data we want is stored in the state. No unnecessary data is stored.

![l42-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663579167853/apIYGqENz.png)

## Important Link

On the [react-use](https://github.com/streamich/react-use) link, many developers have created very nice custom hooks, and they are all tested. If you ever need to create a custom hook, you can come here and check. If you find it, you can use it from here instead of creating it yourself.

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-42).

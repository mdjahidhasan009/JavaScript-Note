
# Lecture 48.2 - Track Zone Project Breakdown | Component Tree and Clock Logic

## Introduction

In this lecture, we will start coding according to our component tree and requirement breakdown. First, we will set up our project using [vite](https://vitejs.dev/).

```sh
yarn create vite
```

## Project Structure

We will create our project structure as follows.

```txt
|- src
    |- App.jsx
    |- main.jsx
    |- components
        |- shared
        |- ui
    |- hooks
    |- utils
```

## Installing styled-components and date-fns

Now we will install _styled-components_ and _date-fns_.

```sh
yarn add styled-components
yarn add date-fns
```

## App Component

Let's look at the Component Tree we created in the last lecture.

![app.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361105359/qYcHsXUfO.jpg)

We can see that the App component has two components. One is `LocalClock`, and the other is `ClockList`. We will create these two components in the `components` directory.

![l48.1-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1666413281431/C3-mrwsrL.png)

Then we will use them in the App component.

```jsx
// App.jsx

import ClockList from './components/clock-list';
import LocalClock from './components/local-clock';

const App = () => {
    return (
        <div>
            <LocalClock />
            <ClockList />
        </div>
    );
};

export default App;
```

## Clock logic with useClock hook

We will create a file named `useClock.js` in the _hooks_ folder. Here we will write all the logic for our clock.

First, let's inspect a few things.

![l48.1-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1666416433357/tQDdzawfm.png)

Here, first, we checked what the default JavaScript `Date` object returns. We can see that our timezone is _GMT+6_. Now if we go to the official [mdn documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) of `date`, we will find a method named `Date.prototype.getTimezoneOffset()`. With this, we will get our timezone offset. We will get it in minutes and negative. We will get our timezone offset in hours by multiplying it by minus and dividing it by 60. Let me explain the minus part. The output it gives us is the difference between UTC timezone and local timezone. Our timezone is 6 hours ahead of UTC. That means our timezone is greater than UTC timezone. So, if we subtract our time from UTC, i.e., subtracting a larger number from a smaller number, it will obviously be negative. Isn't it? I hope I have cleared this confusion.

Now let's focus on building our logic.

Our first task is to display our clock in UTC timezone by default. But if we get the time using `new Date().toLocaleTimeString()`, it shows us the local time. Our task is to convert local time to UTC using offset. First, we will take an object for initial data.

```jsx
const init = {
    id: '',
    title: '',
    timezone: {
        type: '',
        offset: '',
    },
    date_utc: null,
    date: null,
};
```

Our clock will have an id. There will be a title. Then for the timezone, the type will be there, i.e., which timezone it is, and the offset will be there. The offset will only be applicable for UTC and GMT. It will not be applicable for PST and EST. Then we will keep the date in date_utc at UTC 0. It will only be used for calculation purposes. The user's clock will be kept in the date property.

Now we will take a state. We will use our `init` object as its initial value. Then we will take a state for our UTC date.

```jsx
import { useState } from 'react';

const init = {
    id: '',
    title: '',
    timezone: {
        type: '',
        offset: '',
    },
    date_utc: null,
    date: null,
};

const useClock = (timezone, offset) => {
    const [state, setState] = useState({ ...init });
    const [utc, setUtc] = useState(null);

    return {
        clock: state,
    };
};

export default useClock;
```

Now let's write the logic to get our UTC time first.

```js
const useClock = (timezone, offset) => {
    const [state, setState] = useState({ ...init });
    const [utc, setUtc] = useState(null);

    useEffect(() => {
        let d = new Date();
        const localOffset = d.getTimezoneOffset();
        d = addMinutes(d, localOffset);
        setUtc(d);
    }, []);

    return {
        clock: state,
    };
};
```

We will set UTC time only once when the page loads. First, we took a date object in a variable named `d`. Then we got the offset. Then we added the local time with the offset using the `addMinutes()` method from _date-fns_. We kept the obtained time in the utc state.

Now let's come to the process of converting time according to different time zones. Let's write the logic first, then I will explain. But first, we will take an object. You will understand why shortly.

```js
const TIMEZONE_OFFSET = {
    PST: -7 * 60,
    EST: -4 * 60,
    EDT: -4 * 60,
    BST: 1 * 60,
    MST: -6 * 60,
};
```

Here, all timezone offsets are given as an object. Keep one thing in mind, if the timezone is ahead of UTC, take the time as negative, and if it is behind, take it as positive. I have explained why above. Let's write the logic.

```js
const useClock = (timezone, offset = 0) => {
    const [state, setState] = useState({ ...init });
    const [utc, setUtc] = useState(null);

    useEffect(() => {
        let d = new Date();
        const localOffset = d.getTimezoneOffset();
        d = addMinutes(d, localOffset);
        setUtc(d);
    }, []);

    useEffect(() => {
        if (utc !== null && timezone) {
            offset = TIMEZONE_OFFSET[timezone] ?? offset;
            const newUtc = addMinutes(utc, offset);
            setState({
                ...state,
                date_utc: utc,
                date: newUtc,
            });
        } else {
            setState({
                ...state,
                date_utc: utc,
                date: utc,
            });
        }
    }, [utc]);

    return {
        clock: state,
    };
};
```

Here we first checked if our `utc !== null` and a timezone is selected, then we can get the offset from our `TIMEZONE_OFFSET`. Then we got the new utc date as before. Finally, we updated the date_utc and date properties in the state. If our condition is not met, it will show our date in utc date. Let's see if our logic works.

We will write the following code in App.jsx.

```jsx
import ClockList from './components/clock-list';
import LocalClock from './components/local-clock';
import useClock from './hooks/useClock';

const App = () => {
    const { clock: local } = useClock();
    const { clock: est } = useClock('EST');
    const { clock: pst } = useClock('PST');
    const { clock: pakistan } = useClock('UTC', 5 * 60);
    const { clock: edt } = useClock('EDT');
    const { clock: british } = useClock('BST');
    const { clock: mst } = useClock('MST');

    console.log('local', local.date);
    console.log('est', est.date);
    console.log('pst', pst.date);
    console.log('pakistan', pakistan.date);
    console.log('edt', edt.date);
    console.log('british', british.date);
    console.log('mst', mst.date);

    return (
        <div>
            <LocalClock />
            <ClockList />
        </div>
    );
};

export default App;
```

Now we will run our application and cross-check the output we get in the browser's console by searching on Google. If our obtained output matches Google's result, our logic is working correctly. My logic is working. I didn't provide a screenshot because the time when I'm writing the article won't match with the time you are reading it. So you might get confused. So, just check the output you get to ensure your logic is working or not.

## Source Code

You can find the source code of this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-48.2/track-zone).

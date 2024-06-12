
## Introduction

We have created almost all functionalities of our project. In this lecture, we will create a system to manage events and add a timer. When working with events, the first structure that comes to mind is -

```js
const events = {
	id: '1',
	title: 'Test',
	timezone: 'GMT',
	offset: -360,
	events: [
		{
			id: '123',
			title: 'something',
			start: date,
		},
	],
};
```

That means we will take an events array in our clock object and keep all events as objects there. But events have no relation to clocks. Clocks and events are two independent entities. If we keep events within the clock, the problem that will arise is that if we want to create a page with all events, we will have to extract the events from within the clocks. If for some reason we create an error in the event, the clock object will not work correctly. We don't want to put the clock at risk unnecessarily. So, we will not go with this structure.

The second structure might be -

```js
const events = {
	E1: { cid: 'C1' },
	E2: { cid: 'C1' },
	E3: { cid: 'C2' },
	E4: { cid: 'C1' },
	E5: { cid: 'C3' },
};
```

In this case, the problem is if we ever want to extract events by clock id, we do not get the clock id directly. We have to extract the clock id from within the events and then filter out the events. So, this structure does not give us an easy solution.

Let's see the third structure.

```js
const events = {
	C1: [{ id: 'E1' }, { id: 'E2' }, { id: 'E3' }],
	C2: [{ id: 'E1' }, { id: 'E2' }, { id: 'E3' }],
	C3: [{ id: 'E1' }, { id: 'E2' }, { id: 'E3' }],
};
```

In this case, the problem is if we want to create a page with all events, we will need to filter and sort them. Which is not a very good solution.

Now, let's see a new structure.

```js
const events = {
    'C1|E1': {}
    'C1|E2': {}
    'C2|E3': {}
    'C2|E4': {}
    'C1|E5': {}
    'C3|E6': {}
}
```

Here, if we know both the clock id and the event id, we can easily get the event. However, if we know the clock id but not the event id, we will need to filter by clock id. But the advantage of this structure is that we can dynamically create new event ids using the clock id and event id. Based on this structure, let's create a hook for events.

## useEvents hook

```js
import { useState } from 'react';

const useEvent = () => {
	const [state, setState] = useState({});

	return {
		events: state,
	};
};

export default useEvent;
```

### getEventsByClockId function

Let's write the function to get events using the clock id.

```js
const getEventsByClockId = (clockId) => {
	return Object.keys(state).filter((item) => item.startsWith(clockId));
};
```

Just filter all the keys and return those that start with the clock id.

### getEvents function

Now, we will write the function to get our events as an array.

```js
const getEvents = (isArray = false) => {
	if (!isArray) return state;

	return Object.values(state);
};
```

### addEvent function

Now, let's write the function to add events.

```js
const addEvent = (event) => {
	event.id = shortid.generate();
	const { id, clockId } = event;
	setState((prev) => ({
		...prev,
		[`${clockId}|${id}`]: event,
	}));

	return event;
};
```

### deleteEvent and deleteEventByClock functions

We will write functions to delete events in two ways. One in a normal way and another using the filter method.

```js
const deleteEvent = (id) => {
	const events = { ...state };
	delete events[id];
	setState(events);
};

const deleteEventByClock = (clockId) => {
	const events = Object.keys(state).filter((item) => !item.startsWith(clockId));

	setState(events);
};
```

### updateEvent function

Now, we will write the final function to update events.

```js
const updateEvent = (updatedEvent, id) => {
	const events = { ...state };
	events[id] = {
		...events[id],
		...updatedEvent,
	};

	setState(events);
};
```

### Final look of useEvent hook

Finally, our useEvent hook will look like this.

```js
import { useState } from 'react';
import shortid from 'shortid';

const useEvents = () => {
	const [state, setState] = useState({});

	const getEventsByClockId = (clockId) => {
		return Object.keys(state).filter((item) => item.startsWith(clockId));
	};

	const getEvents = (isArray = false) => {
		if (!isArray) return state;

		return Object.values(state);
	};

	const addEvent = (event) => {
		event.id = shortid.generate();
		const { id, clockId } = event;
		setState((prev) => ({
			...prev,
			[`${clockId}|${id}`]: event,
		}));

		return event;
	};

	const deleteEvent = (id) => {
		const events = { ...state };
		delete events[id];
		setState(events);
	};

	const deleteEventByClock = (clockId) => {
		const events = Object.keys(state).filter(
			(item) => !item.startsWith(clockId)
		);

		setState(events);
	};

	const updateEvent = (updatedEvent, id) => {
		const events = { ...state };
		events[id] = {
			...events[id],
			...updatedEvent,
		};

		setState(events);
	};

	return {
		events: state,
		getEventsByClockId,
		getEvents,
		addEvent,
		deleteEvent,
		deleteEventByClock,
		updateEvent,
	};
};

export default useEvents;
```


# Task for Creating a Timer Hook and Using It in Components

## useTimer hook

We will now create a hook for the timer.

```js
import { addSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

const useTimer = (date) => {
    const [timer, setTimer] = useState(date);

    useEffect(() => {
        setTimer(date);
    }, [date]);

    let timerId = null;

    useEffect(() => {
        if (!timer || timerId !== null) return;

        timerId = setInterval(() => {
            setTimer(addSeconds(timer, 1));
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    return timer;
};

export default useTimer;
```

This code should not be difficult to understand. Here we first take the date object into the timer state. Then later set the timer using setInterval.

## Using useTimer hook in LocalClock and ClockListItem components

Now we will use this hook in the LocalClock and ClockListItem components. First, let's use it in LocalClock.

```jsx
import React, { useEffect } from 'react';
import useClock from '../../hooks/useClock';
import useTimer from '../../hooks/useTimer';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const LocalClock = ({ clock, updateClock, createClock }) => {
    const { date, offset, timezone } = useClock(clock.timezone, clock.offset);
    const timer = useTimer(date);

    useEffect(() => {
        updateClock({
            date,
            timezone,
            offset,
        });
    }, [date]);

    return (
        <div>
            {timer && (
                <ClockDisplay
                    date={timer}
                    offset={offset}
                    timezone={timezone}
                    title={clock.title}
                />
            )}
            <ClockActions
                clock={clock}
                updateClock={updateClock}
                local={true}
                createClock={createClock}
            />
        </div>
    );
};

export default LocalClock;
```

Now let's use it in ClockListItem.

```jsx
import { formatDistance } from 'date-fns';
import React from 'react';
import useClock from '../../hooks/useClock';
import useTimer from '../../hooks/useTimer';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
    const { date } = useClock(clock.timezone, clock.offset);
    const timer = useTimer(date);

    if (!date || !timer) return null;

    return (
        <div>
            <ClockDisplay
                date={timer}
                offset={clock.offset}
                timezone={clock.timezone}
                title={clock.title}
            />
            <h3>Time difference: {formatDistance(localClock, timer)}</h3>
            <ClockActions
                clock={clock}
                updateClock={updateClock}
                deleteClock={deleteClock}
            />
        </div>
    );
};

export default ClockListItem;
```

With this, all the functionalities of our project are complete. The rest you will complete by creating a nice project.

## Source Code

You can find the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-52/track-zone).

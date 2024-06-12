
# Lecture 50 - Track Zone Project | Reusable Clock Form

## Introduction

In the last class, we encountered an issue where our fractional offset wasn't working. The reason was that we used `parseInt` when extracting the value in the change handler in the _ClockActions_ component. Replacing it with `Number` will resolve this issue. Today, we will create a reusable form. Let's get started.

## Move TIMEZONE_OFFSET object to a separate folder

We will move the TIMEZONE_OFFSET from the useClock hook to constants/timezone.js so that it can be used wherever needed.

```jsx
export const TIMEZONE_OFFSET = {
    PST: -7 * 60,
    EST: -4 * 60,
    EDT: -4 * 60,
    BST: 1 * 60,
    MST: -6 * 60,
};
```

## utils folder

We will create a file named timezone.js inside the utils folder and write the following code.

```js
import { TIMEZONE_OFFSET } from '../constants/timezone';

export const getOffset = (start = -11.5, ending = 12) => {
    const offsets = [];
    for (let i = start; i <= ending; i += 0.5) {
        offsets.push(i);
    }
    return offsets;
};

export const getTimezone = () => {
    return ['UTC', 'GMT', ...Object.keys(TIMEZONE_OFFSET)];
};
```

We took the offset dynamically here, which we took manually in the last class. And we took all the timezones in an array.

## ClockForm Component

We will work on this component inside the shared folder. Let's write the code first and then explain it.

```jsx
import { useEffect, useState } from 'react';
import { TIMEZONE_OFFSET } from '../../../constants/timezone';
import { getOffset } from '../../../utils/timezone';

const ClockForm = ({
    values = { title: '', timezone: 'UTC', offset: 0 },
    handleClock,
    title = true,
    edit = false,
}) => {
    const [formValues, setFormValues] = useState({ ...values });

    useEffect(() => {
        if (TIMEZONE_OFFSET[formValues.timezone]) {
            setFormValues((prev) => ({
                ...prev,
                offset: TIMEZONE_OFFSET[formValues.timezone],
            }));
        }
    }, [formValues.timezone]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'offset') {
            value = Number(value) * 60;
        }

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClock(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Enter Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    disabled={!title}
                />
            </div>
            <div>
                <label htmlFor="timezone">Enter Timezone</label>
                <select
                    id="timezone"
                    name="timezone"
                    value={formValues.timezone}
                    onChange={handleChange}
                >
                    <option value="GMT">GMT</option>
                    <option value="UTC">UTC</option>
                    <option value="PST">PST</option>
                    <option value="EST">EST</option>
                    <option value="EDT">EDT</option>
                    <option value="BST">BST</option>
                    <option value="MST">MST</option>
                </select>
            </div>
            {(formValues.timezone === 'GMT' || formValues.timezone === 'UTC') && (
                <div>
                    <label htmlFor="offset">Enter Offset</label>
                    <select
                        id="offset"
                        name="offset"
                        value={formValues.offset / 60}
                        onChange={handleChange}
                    >
                        {getOffset().map((offset) => (
                            <option key={offset} value={offset}>
                                {offset}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button>{edit ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default ClockForm;
```

First, we took a state. We temporarily kept an initial value object of our clock object in the state. Then we took the useEffect hook. Its job is to update the state with the offset data from the TIMEZONE_OFFSET object when the timezone is updated. Then we have handleChange and handleSubmit. In the case of handleSubmit, we will lift the state. The rest of the form is similar to what we created in the last lecture, with slight modifications. We used the state values for title, timezone, and offset, and we used the getOffset function we created instead of default_offset.

One more thing was done. We cannot update the title of our local clock. It should be kept disabled. Therefore, we managed the disabled attribute using the title prop. And finally, for the button, if the edit prop is true, the button will show "Update"; otherwise, it will show "Create."

## ClockActions Component

Now let's work on the ClockActions component.

```jsx
import { useState } from 'react';
import ClockForm from '../clock-form';

const ClockActions = ({ local = false, clock, updateClock }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    const handleClock = (values) => {
        console.log(values);
    };

    return (
        <div>
            <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
            {local ? (
                <button onClick={() => setIsCreate(!isCreate)}>Create</button>
            ) : (
                <button>Delete</button>
            )}
            {isEdit && (
                <>
                    <h3>Edit Clock</h3>
                    <ClockForm
                        handleClock={updateClock}
                        edit={true}
                        title={!local}
                        values={clock}
                    />
                </>
            )}
            {isCreate && (
                <>
                    <h3>Create New Clock</h3>
                    <ClockForm handleClock={handleClock} />
                </>
            )}
        </div>
    );
};

export default ClockActions;
```

Here we used our clock form. We took a state for creating the form. It will show the create clock form when clicking the create button. We will work on handleClock in the next lecture.

## Assignment

When we worked with forms previously in this project, we created a hook for form creation. Your assignment is to use that hook to create this form.


## Source Code

All the source code for this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-50/track-zone).

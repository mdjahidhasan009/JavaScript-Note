
# Lecture 44 - Create A React Custom Form Part 1

## Introduction

In the last lecture, we briefly discussed forms. Today we will go into more details. Below is a snapshot of what we did in the last lecture:

![l44-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664261910412/WmchI0BzJ.png)

What we did was just create a UI. We haven't added functionalities yet. Today we will first create a form and then add functionalities to it.

Our form will have fields for job title, bio, and skills. Let's start working on it.

## Initial works

To store this information, we need a state. We will keep this information as an object. First, we will define some initial data.

```jsx
// App.jsx
const init = {
    title: '',
    bio: '',
    skills: '',
};
```

## Define state in App.jsx

Now we will define the state.

```jsx
import { useState } from 'react';

const init = {
    title: '',
    bio: '',
    skills: '',
};

const App = () => {
    const [formState, useFormState] = useState({ ...init });
    return <div className="root"></div>;
};

export default App;
```

## Create UI

Now we will create our UI.

```jsx
import { useState } from 'react';
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/UI/buttons/Button';

const init = {
    title: '',
    bio: '',
    skills: '',
};

const App = () => {
    const [formState, setFormState] = useState({ ...init });

    const handleChange = (e) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
    };

    return (
        <div className="root">
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <InputGroup
                        value={formState.title}
                        label={'Title:'}
                        name={'title'}
                        placeholder={'Software Engineer'}
                        onChange={handleChange}
                    />
                    <InputGroup
                        value={formState.bio}
                        label={'Bio:'}
                        name={'bio'}
                        placeholder={'I am a software engineer...'}
                        onChange={handleChange}
                    />
                    <InputGroup
                        value={formState.skills}
                        label={'Skills:'}
                        name={'skills'}
                        placeholder={'JavaScript, React'}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default App;
```

Our application will now look like this:

![l44-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664264430583/k96WkBT1S.png)

## Error Handling

We want to show errors if the input fields are empty, and log the values to the console only if these fields are not empty. For error handling, we will first take a state.

```jsx
const App = () => {
    const [errors, setErrors] = useState({ ...init });
};
```

Then we will create a function to check the validity of the input.

```jsx
const checkValidity = (values) => {
    const errors = {};

    const { title, bio, skills } = values;

    if (!title) {
        errors.title = 'Invalid title';
    }
    if (!bio) {
        errors.bio = 'Invalid bio';
    }
    if (!skills) {
        errors.skills = 'Invalid skills';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
```

Now we will use this in our `handleSubmit` function.

```jsx
const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = checkValidity(values);

    if (isValid) {
        console.log(values);
        setErrors({ ...errors });
    } else {
        setErrors({ ...errors });
    }
};
```

Then we will pass the `errors` state as a prop to the `InputGroup`.

```jsx
const App = () => {
    const [values, setValues] = useState({ ...init });
    const [errors, setErrors] = useState({ ...init });

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors } = checkValidity(values);

        if (isValid) {
            console.log(values);
            setErrors({ ...errors });
        } else {
            setErrors({ ...errors });
        }
    };

    const checkValidity = (values) => {
        const errors = {};

        const { title, bio, skills } = values;

        if (!title) {
            errors.title = 'Invalid title';
        }
        if (!bio) {
            errors.bio = 'Invalid bio';
        }
        if (!skills) {
            errors.skills = 'Invalid skills';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    };

    return (
        <div className="root">
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <InputGroup
                        value={values.title}
                        label={'Title:'}
                        name={'title'}
                        placeholder={'Software Engineer'}
                        onChange={handleChange}
                        error={errors.title}
                    />
                    <InputGroup
                        value={values.bio}
                        label={'Bio:'}
                        name={'bio'}
                        placeholder={'I am a software engineer...'}
                        onChange={handleChange}
                        error={errors.bio}
                    />
                    <InputGroup
                        value={values.skills}
                        label={'Skills:'}
                        name={'skills'}
                        placeholder={'JavaScript, React'}
                        onChange={handleChange}
                        error={errors.skills}
                    />
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};
```


![l44-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664268007573/83AObJfcB.png)

Now it shows an error. Now if the border turns red along with the error message, it will look nice. For that, we will make some changes in _components/inputs/TextInput.jsx_ and _components/shared/form/InputGroup.jsx_.

```jsx
// components/inputs/TextInput.jsx

// border property changed

const TextInput = styled.input`
    width: 100%;
    border: ${(props) =>
        props.error ? '2px solid #ff0000' : '1px solid #232323'};
    outline: none;
    padding: 0.25rem 0.5rem;
    background: transparent;
    font-size: 0.9rem;
    font-family: Arial;
    color: #333;
    &:focus {
        border: 2px solid skyblue;
    }
`;
```

```jsx
// components/shared/form/InputGroup.jsx

const InputGroup = ({
    label,
    name,
    value,
    placeholder,
    error,
    onChange,
    onFocus,
    onBlur,
}) => {
    return (
        <Container>
            <Label htmlFor={name}>{label}</Label>
            <TextInput
                name={name}
                id={name}
                placeholder={placeholder ?? ''}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                error={error} // this is added
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};
```

![l44-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664268204720/B_ys8ASlh.png)

Now our UI looks much nicer.

There is a problem here. It shows the error when we click the submit button. But that's not a better user experience. The error should show when we click somewhere outside after focusing on the input. Now we will handle that. For that, we need to track whether the input is focused. We will create a function for that. But first, we need to take a state. Because to track focus, we need to see if it was focused before.

```jsx
const [focus, setFocus] = useState({
    title: false,
    bio: false,
    skills: false,
});
```

That means initially the focus will be `false`. When we focus and click outside, i.e., blur, it will become `true`. And when it's `true`, we will show our error. Now we need to create two functions. One for handling focus and the other for handling blur.

```jsx
const handleFocus = (e) => {
    setFocus((prev) => ({
        ...prev,
        [e.target.name]: true,
    }));
};
```

That means whenever `onFocus` happens on any input, the focus state of that particular input will change to `true`. We can see this through our React developer tools. For that, we need to pass this function inside the `onFocus` prop of all inputs.

```jsx
<form onSubmit={handleSubmit}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputGroup
            value={values.title}
            label={'Title:'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onFocus={handleFocus}
            error={errors.title}
        />
        <InputGroup
            value={values.bio}
            label={'Bio:'}
            name={'bio'}
            placeholder={'I am a software engineer...'}
            onChange={handleChange}
            onFocus={handleFocus}
            error={errors.bio}
        />
        <InputGroup
            value={values.skills}
            label={'Skills:'}
            name={'skills'}
            placeholder={'JavaScript, React'}
            onChange={handleChange}
            onFocus={handleFocus}
            error={errors.skills}
        />
        <Button type="submit">Submit</Button>
    </div>
</form>
```

![l44-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664269924938/U2MQe6_eN.png)

Initially, all are `false`. But as soon as we focus on Title, the title value changes to `true`.

![l44-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664269992631/E_KHcqDNQ.png)

Now we will show the error. For that, we will write a function.

```jsx
const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = checkValidity(values);

    if (errors[key] && focus[key]) {
        setErrors((prev) => ({
            ...prev,
            [key]: errors[key],
        }));
    } else {
        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    }
};
```

That means when there is an error and focus, the error state will change accordingly. Now if we pass this function inside the `onBlur` prop of the InputGroup, we will see it the way we want.

```jsx
<form onSubmit={handleSubmit}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputGroup
            value={values.title}
            label={'Title:'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.title}
        />
        <InputGroup
            value={values.bio}
            label={'Bio:'}
            name={'bio'}
            placeholder={'I am a software engineer...'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.bio}
        />
        <InputGroup
            value={values.skills}
            label={'Skills:'}
            name={'skills'}
            placeholder={'JavaScript, React'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.skills}
        />
        <Button type="submit">Submit</Button>
    </div>
</form>
```

Now if you notice, the error message will stay until we blur the focus. Even if we type, it won't go away, which is very annoying. When there is an error, it should go away when we start typing. Now let's handle that. We need to do this inside the `handleChange` function.

```jsx
const handleChange = (e) => {
    setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));

    const key = e.target.name;
    const { errors } = checkValidity(values);

    if (!errors[key]) {
        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    }
};
```


In this case, the error won't go away with the first keystroke. But it will go away with the subsequent keystrokes. At least it is functioning for now. We will keep it like this for now.

## Optimize our app

Now we will try to optimize our application a bit. Here we have worked with many states. But now we will work with a single state. We will save what we have worked on so far as App_2.jsx and work with a copy of it.

Since the keys of the object in our three states are the same, we can write our `init` object as follows.

```jsx
const init = {
    title: {
        values: '',
        errors: '',
        focus: false,
    },
    bio: {
        values: '',
        errors: '',
        focus: false,
    },
    skills: {
        values: '',
        errors: '',
        focus: false,
    },
};
```

Now we will take just one state. Along with that, we will make some changes inside.

```jsx
const App = () => {
    const [states, setStates] = useState({ ...init });

    const handleChange = (e) => {};

    const handleSubmit = (e) => {};

    const handleFocus = (e) => {};

    const handleBlur = (e) => {};

    const checkValidity = (values) => {
        const errors = {};

        const { title, bio, skills } = values;

        if (!title) {
            errors.title = 'Invalid title';
        }
        if (!bio) {
            errors.bio = 'Invalid bio';
        }
        if (!skills) {
            errors.skills = 'Invalid skills';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    };

    return (
        <div className="root">
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <InputGroup
                        value={states.title.value}
                        label={'Title:'}
                        name={'title'}
                        placeholder={'Software Engineer'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        error={states.title.error}
                    />
                    <InputGroup
                        value={states.bio.value}
                        label={'Bio:'}
                        name={'bio'}
                        placeholder={'I am a software engineer...'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        error={states.bio.error}
                    />
                    <InputGroup
                        value={states.skills.value}
                        label={'Skills:'}
                        name={'skills'}
                        placeholder={'JavaScript, React'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        error={states.skills.error}
                    />
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};
```

We will modify the handle functions one by one. First, we will create a file named _utils/object-utils.js_ and write two functions. One function is to check if the object is empty, and the other is to deep clone the object.

```js
export const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
```

First, we will modify our `handleChange` function. Let's look at our old function first.

```jsx
const handleChange = (e) => {
    setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));

    const key = e.target.name;
    const { errors } = checkValidity(values);

    if (!errors[key]) {
        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    }
};
```

Since we don't have a separate state for `values`, we need to extract them from the state. That means we need to bring it into the format of our old `init` object. For that, we can create a function.

```jsx
const mapStateToValues = (states) => {
    return Object.keys(states).reduce((acc, cur) => {
        acc[cur] = states[cur].value;
        return acc;
    }, {});
};
```

Now our `handleChange` function will look like this.

```jsx
const handleChange = (e) => {
    const { name: key, value } = e.target;
    const oldState = deepClone(state);
    const values = mapStateToValues(oldState);
    oldState[key].value = value;

    const { errors } = checkValidity(values);
    if (oldState[key].focus && errors[key]) {
        oldState[key].error = errors[key];
    } else {
        oldState[key].error = '';
    }

    setState(oldState);
};
```

First, we deep clone the state. Then we map the values from there and take them as an object. Then just modify the properties of oldState.

Now it's time to modify `handleSubmit`.

```jsx
const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValues(state);
    const { isValid, errors } = checkValidity(values);
    if (isValid) {
        console.log(state);
    } else {
        const oldState = deepClone(state);
        Object.keys(errors).forEach((key) => {
            oldState[key].error = errors[key];
        });
        setState(oldState);
    }
};
```

Now we will work on `handleFocus`.

```jsx
const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
};
```


Finally, we will work on `handleBlur`.

```jsx
const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValues(state);
    const { errors } = checkValidity(values);
    const oldState = deepClone(state);

    if (oldState[key].focus && errors[key]) {
        oldState[key].error = errors[key];
    } else {
        oldState[key].error = '';
    }
    setState(oldState);
};
```

Here, we have just modified the old functions. The old functions had three states, but here there is only one. So first, we deep clone the state and then modify the properties as needed.

Handling forms is the most complex task in React. Today we got a slight glimpse of that. There is still a lot of work to be done on forms. We will see that in the next lecture.

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-44).

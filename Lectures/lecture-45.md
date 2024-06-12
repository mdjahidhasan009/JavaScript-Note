
# Lecture 45 - React Custom Form Part 2

## Introduction

Many had difficulty understanding the form we created in the last lecture. Today, we will create a custom hook for this form, allowing us to create as many forms as we want using this hook. In the last class, we wrote a lot of logic to handle a form. If we need more forms like this, we would have to write everything again. If we need to create 10 forms, we would have to write it 10 times. Instead, it is better to create a hook with all the logic. Then we can easily create as many forms as needed using this hook without writing so much logic again.

## Mindset

We are not creating a UI now. We are creating a library for forms. That means we are not UI developers now. We are library developers. Although we are creating it for ourselves, if it is good, we can make it public later. So, our client is not the one who commissioned our application. Our client is the one who will use this hook to create forms. This mindset will help us while creating the custom hook. We learned that hooks can be created in two ways. One is a dedicated hook for a component that we cannot use elsewhere. The other is a global hook that we can use anywhere in any project. For example, the hook we created named `object-utils.js` is a global hook. Because we don't have to write this function separately for any component. We can just use the code from here.

## Create the hook

Now we will create a file named `useForm.js` inside the `hooks` directory.

The initial data we had was written like this -

```jsx
const init = {
    title: {
        value: '',
        error: '',
        focus: false,
    },
    bio: {
        value: '',
        error: '',
        focus: false,
    },
    skills: {
        value: '',
        error: '',
        focus: false,
    },
};
```

But now we don't know what kind of form will be created using our hook and what data it will contain. Our hook can be used in a form for opening a bank account, creating a blog post, or an insurance company's form. So, we don't know anything about the initial data. In this case, how will we use the hook? As library developers, we have a power. We can set rules for those who will use our hook. We can make a system where certain data must be provided to use this hook. If not, we will not allow the use of this hook.

So, we can say that to use this hook, data must be provided as an object.

Now, if we let the user provide data as before, it won't work. We will only ask the user to provide the value. We will handle the error and focus within our hook. That means the user will provide data like this -

```jsx
useForm({
    title: '',
    bio: '',
    skills: '',
});
```

From here, we will create the following object.

```jsx
{
    title: {
        value: '',
        error: '',
        focus: false,
    },
    bio: {
        value: '',
        error: '',
        focus: false,
    },
    skills: {
        value: '',
        error: '',
        focus: false,
    },
};
```

To do this, we need a helper function. This function will take the provided object as an argument and return the object as shown above.

```jsx
const mapValuesToState = (values) => {
    return Object.keys(values).reduce((acc, key) => {
        acc[key] = {
            value: values[key],
            error: '',
            focused: false,
            touched: false,
        };
        return acc;
    }, {});
};
```

Now, to see if our function works, we will write the following code.

```js
const useForm = ({ init }) => {
    const state = mapValuesToState(init);
    console.log(state);
};

// helper functions

const mapValuesToState = (values) => {
    return Object.keys(values).reduce((acc, key) => {
        acc[key] = {
            value: values[key],
            error: '',
            focused: false,
            touched: false,
        };
        return acc;
    }, {});
};

const mapStateToKeys = (state, key) => {
    return Object.keys(state).reduce((acc, cur) => {
        acc[cur] = state[cur][key];
        return acc;
    }, {});
};

export default useForm;
```

We will also create a function named `mapStateToKeys` because we will need it. Now, we will go to `App.jsx` and use this hook.

```jsx
import useForm from '../hooks/useForm';

const App = () => {
    useForm({
        init: {
            name: 'Aditya',
            email: '',
            password: '',
        },
    });

    return <div className="root"></div>;
};

export default App;
```

Now, if we run our application and check the console, we will see it returns the object as we want.

![L45-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1665117047712/eqdpN6JL6.png)

Since we are getting the state, we can put `mapValuesToState(init)` in `useState`.

```js
const useForm = ({ init }) => {
    const [state, setState] = useState(mapValuesToState(init));

    return {
        formState: state,
    };
};
```

Now, we will check if it works in _App.jsx_.

```jsx
import useForm from '../hooks/useForm';

const App = () => {
    const { formState } = useForm({
        init: {
            name: 'Aditya',
            email: '',
            password: '',
        },
    });
    console.log(formState);

    return <div className="root"></div>;
};

export default App;
```

If we check the console now, we will see the same output as before.

Now our job is to provide an option for the consumer since validation is not our job as library developers. We will give them two options. They can use our defined function or create their own function and provide a boolean value as an argument. We are giving them both options. So, we will take `validate` as a parameter in our hook.



## `handleChange` function

Now we will work on the `handleChange` function.

```jsx
import { useState } from 'react';
import { deepClone } from '../utils/object-utils';

/**
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object|boolean)} validate
 *
 * create forms using this useForm hook easily
 * @param {Param} param
 * @returns
 */

const useForm = ({ init, validate }) => {
    const [state, setState] = useState(mapValuesToState(init));

    const handleChange = (e) => {
        const { name: key, value } = e.target;

        const oldState = deepClone(state);
        if (type === 'checkbox') {
            oldState[key].value = 'checked';
        } else {
            oldState[key].value = value;
        }

        const { errors } = getErrors();

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }
        setState(oldState);
    };

    const getErrors = () => {
        let hasError = null,
            errors = null;

        const values = mapStateToKeys(state, 'value');

        if (typeof validate === 'boolean') {
            hasError = validate;
            errors = mapStateToKeys(state, 'error');
        } else if (typeof validate === 'function') {
            const errorsFromCb = validate(values);
            hasError = !isObjEmpty(errorsFromCb);
            errors = errorsFromCb;
        } else {
            throw new Error('validate property must be boolean or function');
        }

        return {
            hasError,
            errors,
            values,
        };
    };

    return {
        formState: state,
        handleChange,
    };
};

export default useForm;
```

Here, `const { errors } = checkValidity(values);` the function `checkValidity` remains as it is. We will work on it later.

## `handleFocus` function

```jsx
const useForm = ({ init, validate }) => {
    // ...

    const handleFocus = (e) => {
        const { name } = e.target;

        const oldState = deepClone(state);
        oldState[name].focused = true;

        if (!oldState[name].touched) {
            oldState[name].touched = true;
        }

        setState(oldState);
    };

    return {
        // ...
        handleFocus,
    };
};
```

## `handleBlur` function

```jsx
const useForm = ({ init, validate }) => {
    // ...

    const handleBlur = (e) => {
        const key = e.target.name;

        const values = mapStateToKeys(state, 'value');
        const { errors } = checkValidity(values);

        const oldState = deepClone(state);

        if (oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        oldState[key].focused = false;
        setState(oldState);
    };

    return {
        // ...
        handleBlur,
    };
};
```

## 'handleSubmit` function

We need to think carefully about this part. The user knows how to submit. We don't know if they will submit to an API, update a store, or change the state. Doing what we don't know is a complex task. We need to consider the tasks the user does not have to do while submitting, but we should handle them.

```jsx
const useForm = ({ init, validate }) => {
    // ...

    const handleSubmit = (e, cb) => {
        e.preventDefault();
        const { errors, hasError, values } = getErrors();

        cb({
            hasError,
            errors,
            values,
            touched: mapStateToKeys(state, 'touched'),
            focused: mapStateToKeys(state, 'focused'),
        });
    };

    return {
        // ...
        handleSubmit,
    };
};
```


## Clearing Inputs

Now we will create a function to clear the inputs.

```js
const useForm = ({ init, validate }) => {
    // ...

    const clear = () => {
        const newState = mapValuesToState(init, true);
        setState(newState);
    };

    return {
        // ...
        clear,
    };
};

const mapValuesToState = (values, shouldClear = false) => {
    return Object.keys(values).reduce((acc, key) => {
        acc[key] = {
            value: shouldClear ? '' : values[key],
            error: '',
            focused: false,
            touched: false,
        };
        return acc;
    }, {});
};
```

## Working with `useForm` hook

Now we will use this hook in our `App.jsx`.

```jsx
import useForm from '../hooks/useForm';

const init = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'First Name is required';
    }

    if (!values.lastName) {
        errors.lastName = 'Last Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

const App = () => {
    const { formState } = useForm({ init, validate });
    console.log(formState);

    return <div className="root"></div>;
};

export default App;
```

Let's complete it fully now.

```jsx
import InputGroup from '../components/shared/forms/InputGroup';
import Button from '../components/UI/buttons/Button';
import useForm from '../hooks/useForm';

const init = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'First Name is Required';
    }

    if (!values.lastName) {
        errors.lastName = 'Last Name is Required';
    }

    if (!values.email) {
        errors.email = 'Email is Required';
    }

    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 6) {
        errors.password = 'Password length must be 6 characters';
    }

    return errors;
};

const App = () => {
    const {
        formState: state,
        handleBlur,
        handleChange,
        handleFocus,
        handleSubmit,
        clear,
    } = useForm({ init, validate });

    const cb = ({ hasError, values, errors }) => {
        if (hasError) {
            alert('[ERROR]' + JSON.stringify(errors));
        } else {
            alert('[SUCCESS]' + JSON.stringify(values));
        }
    };

    return (
        <div className="root">
            <form onSubmit={(e) => handleSubmit(e, cb)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <InputGroup
                        value={state.firstName.value}
                        label={'First Name:'}
                        name={'firstName'}
                        placeholder={'John'}
                        type={'text'}
                        error={state.firstName.error}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <InputGroup
                        value={state.lastName.value}
                        label={'Last Name:'}
                        name={'lastName'}
                        type={'text'}
                        placeholder={'Doe'}
                        error={state.lastName.error}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <InputGroup
                        value={state.email.value}
                        label={'Email:'}
                        name={'email'}
                        type={'email'}
                        placeholder={'john@test.com'}
                        error={state.email.error}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <InputGroup
                        value={state.password.value}
                        label={'Password:'}
                        name={'password'}
                        type={'password'}
                        placeholder={'*****'}
                        error={state.password.error}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />

                    <div>
                        <Button type="reset" onClick={clear}>
                            Clear
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default App;
```

Now, no matter what form we need to create, we can create any form using our _useForm.jsx_ hook.

Now let's create another form as a component.


## Create Another Form

We will create a file named _components/task/Task.jsx_.

```jsx
import useForm from '../../hooks/useForm';

const init = {
    text: '',
    checked: false,
};

const Task = () => {
    const { formState, handleChange, handleSubmit } = useForm({
        init,
        validate: true,
    });

    const submitCB = ({ values }) => {
        console.log(values);
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, submitCB)}>
                <input
                    type="checkbox"
                    name={'checked'}
                    checked={formState.checked.value}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name={'text'}
                    value={formState.text.value}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Task;
```

Now we will import and use this in _App.jsx_. We will see the output correctly in the console.

As you can see, we can easily create any form using our custom hook. Now we will extend the form in _Task.jsx_ to include `select`, `radio`, and `file` inputs.

```jsx
import useForm from '../../hooks/useForm';

const init = {
    text: '',
    checked: false,
    group: 'home',
    priority: 'medium',
    file: '',
};

const Task = () => {
    const { formState, handleChange, handleSubmit } = useForm({
        init,
        validate: true,
    });

    const submitCB = ({ values }) => {
        console.log(values);
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, submitCB)}>
                <input
                    type="checkbox"
                    name={'checked'}
                    checked={formState.checked.value}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name={'text'}
                    value={formState.text.value}
                    onChange={handleChange}
                />
                <select
                    name="group"
                    value={formState.group.value}
                    onChange={handleChange}
                >
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                </select>
                <input
                    type="radio"
                    name="priority"
                    value={'low'}
                    onChange={handleChange}
                />
                Low
                <input
                    type="radio"
                    name="priority"
                    value={'medium'}
                    onChange={handleChange}
                />
                Medium
                <input
                    type="radio"
                    name="priority"
                    value={'high'}
                    onChange={handleChange}
                />
                High
                <input
                    type="file"
                    name="file"
                    value={formState.file.value}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Task;
```

Our output will look like this -

![L45-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1665148219399/Pz6f7r52Q.png)

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-45).

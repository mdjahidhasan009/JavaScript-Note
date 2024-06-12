
# Lecture 40 - State Lifting and Filtering Techniques

## Introduction

Today our first task is state lifting. For this, we have chosen a small application called Contact List because this application can be expanded in many ways. First, we will scaffold our project through vite and then start our work.

## Contact App

### Planning

We need to understand what we want to do first. For that, let's make a diagram.

![lecture-40.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1662710047301/k93dQrmyI.jpg)

We will make a simple app. First, there will be a form where we will input data. Then the contact list will output in a table format. So, apart from the app, we have two components - a form component and a table component. All our data will be in the app component. But to manage the form, some local state is needed in the form component, which will only be within this component and nowhere else, i.e., not in the app component. So, the local state in the form needs to be lifted and sent to our app. We know that state flow always goes from top to bottom, i.e., from parent to child, not from bottom to top. Now if, for some reason, a component has local state, it is that component's own data. This state will not have any access outside that component. Now if at any time this state needs to be sent to our parent, we will use state lifting.

Now what will we do by lifting the state? We will take the local states from the child to the parent and put them in some state. Let's say we are keeping all the contacts in an array in our app component. And in the local state of the form, we can only create one contact, i.e., we can create an object. That means the local state contains an object. Now we want to send this object to our parent or where the data is being distributed and put it in the array there. So, the app or parent will have a state.

We will take a handler function in the app state that can update the app state. We will pass this function as a prop to the form component. This component will call the handler function with the local state. When the form component calls the function with the local state to the app component, it will appear to be executing in the form component but actually will execute in the app component. Since it is executed in the app component, it can update the app state with the local state because the app state is accessible within this function as it is executed from the app. And since it is called from the form, it also has access to the local state. Three concepts are working here.

- The scope where the function is created
- The scope where the function is called
- The context at the time of the call

These three concepts combined are state lifting. It may seem complicated to understand, but it is not as complicated as it seems. It will be easy to understand if you see it practically.

### ContactForm Component

First, we will create a ContactForm component in `App.jsx`.

```jsx
const ContactForm = () => {
    return (
        <form>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
            </div>
            <input type="submit" value="Create New Contact" />
        </form>
    );
};

const App = () => {
    return (
        <div>
            <h1>Contact App</h1>
            <ContactForm />
        </div>
    );
};

export default App;
```

Now if we run our application, we will see the form in our browser. Now this form is uncontrolled. To make it controlled, we will take a state within this component.

```jsx
import { useState } from 'react';

const CONTACT_FORM_INIT_STATE = {
    name: '',
    email: '',
};

const ContactForm = () => {
    const [values, setValues] = useState({ ...CONTACT_FORM_INIT_STATE });
    const { name, email } = values;

    return (
        <form>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} />
            </div>
            <input type="submit" value="Create New Contact" />
        </form>
    );
};

const App = () => {
    return <div>// ...</div>;
};

export default App;
```

Now we will add the `onChange` handler.

```jsx
const ContactForm = () => {
    const [values, setValues] = useState({ ...CONTACT_FORM_INIT_STATE });
    const { name, email } = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <br />
            <input type="submit" value="Create New Contact" />
        </form>
    );
};
```

Now if we submit our form, we will see the `values` object printed in the console.

![L40-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662720707287/Sj5LAHHe6.png)

Now, although the data is created in the form, it is somehow needed in our app component because `ContactForm` is in the app component. First, we will create a function in the app.

```jsx
const getData = () => {
    console.log('Calling getData function');
};
```


This function will be called when we submit data in the input field. In other words, when `handleSubmit` is called within `ContactForm`, our `getData` function will be called. Therefore, we can pass `getData` as a prop to `ContactForm` and use it within `handleSubmit`.

```jsx
const ContactForm = ({ getData }) => {
    // ...

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        getData();
    };

    // ...
};
```

Now, within the App component where `ContactForm` is called, we need to pass this prop.

```jsx
<ContactForm getData={getData} />
```

If we submit the form now, we'll see that the values are printed first, followed by the `getData` function.

![L40-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662721393418/sAUPNi8Dz.png)

Since `getData` is called correctly, we can call it with `values` directly from `getData`. To do this, we just need to pass `values` as a parameter to the `getData` function.

```jsx
const ContactForm = ({ getData }) => {
    // ...

    const handleSubmit = (e) => {
        e.preventDefault();
        getData(values);
    };

    // ...
};

const App = () => {
    const getData = (values) => {
        console.log(values);
        console.log('Calling getData function');
    };

    // ...
};
```

If we check now, we'll see the same output. But now we are receiving `values` from the App component.

If we want to print only the name and email instead of the whole object, we can do that too.

```jsx
const App = () => {
    const getData = (values) => {
        console.log(values.name);
        console.log(values.email);
    };

    // ...
};
```

![L40-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662722040507/uLrkU4Wyy.png)

Notice one thing. The name and email are stored within the form component. There is no state in the App component. Yet, the App is receiving these data. Since we can print it, it means we can display it in our UI as well. For that, we need to have a state within the App component. We will change the `getData` function's name to something logical, like `getContact`.

```jsx
const App = () => {
    const [contacts, setContacts] = useState([]);
    const getContact = (contact) => {
        setContacts([].concat(contacts, contact));
    };

    return (
        <div>
            <h1>Contact App</h1>
            <ContactForm getContact={getContact} />
        </div>
    );
};
```

When we type in the input, it is stored in the state of `ContactForm`.

![L40-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662722776315/7l5DP3YgO.png)

The moment we click the button, the App's state is no longer empty. It is bringing data from its child component.

![L40-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662722862528/rLV5DCUce.png)

How did this happen? We wrote the function that can update the state within the App component. We called it within `ContactForm`. The data is passed to the parent as an argument of the function. This is called state lifting.

### Table Component

Now we want to render our data in a table. For that, we will create a `Table` component.

```jsx
const Table = ({ contacts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const App = () => {
    const [contacts, setContacts] = useState([]);
    const getContact = (contact) => {
        setContacts([].concat(contacts, contact));
    };

    return (
        <div>
            <h1>Contact App</h1>
            <ContactForm getContact={getContact} />
            <Table contacts={contacts} />
        </div>
    );
};
```

Now we will see our data being displayed.

![L40-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662724243831/gXJSeoveN.png)

We want the input field to be cleared as soon as we click the button. For that, after everything in the `handleSubmit` function, we need to set the `values` to its initial state. In other words,

```jsx
const handleSubmit = (e) => {
    e.preventDefault();
    getContact(values);
    setValues({ ...CONTACT_FORM_INIT_STATE });
};
```


### Move ContactForm and Table components into separate files

We will move our `ContactForm` and `Table` components into separate modules. For that, we will create a `ContactForm.jsx` and `Table.jsx` file in the `components` folder. We will cut the code related to `ContactForm` and `Table` from the App file and paste it into these files and export them.

```jsx
import { useState } from 'react';

const CONTACT_FORM_INIT_STATE = {
    name: '',
    email: '',
};

const ContactForm = ({ getContact }) => {
    const [values, setValues] = useState({ ...CONTACT_FORM_INIT_STATE });
    const { name, email } = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getContact(values);
        setValues({ ...CONTACT_FORM_INIT_STATE });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <br />
            <input type="submit" value="Create New Contact" />
        </form>
    );
};

export default ContactForm;
```

```jsx
const Table = ({ contacts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
```

Be sure to import these components in the App component.

### Add filtering option

We want to have some contacts as Home contacts and some as Office contacts. We want to filter using these options. Before that, let's add this option to the `ContactForm`.

```jsx
import { useState } from 'react';

const CONTACT_FORM_INIT_STATE = {
    name: '',
    email: '',
    group: '',
};

const ContactForm = ({ getContact }) => {
    const [values, setValues] = useState({ ...CONTACT_FORM_INIT_STATE });
    const { name, email, group } = values;

    const handleChange = (e) => {
        // ...
    };

    const handleSubmit = (e) => {
        // ...
    };

    return (
        <form onSubmit={handleSubmit}>
            // ...
            <div>
                <label htmlFor="group">Group</label>
                <select name="group" id="group" onChange={handleChange} value={group}>
                    <option value="">Select</option>
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                </select>
            </div>
            // ...
        </form>
    );
};

export default ContactForm;
```

Now, if we want to show the group in our table, we need to make some changes in the `Table` component like this:

```jsx
const Table = ({ contacts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Group</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.group}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
```

Now it will show the group in the table.

Next, we will add a filter option in the UI.

```jsx
const Table = ({ contacts }) => {
    return (
        <>
            <div>
                Filter:
                <select>
                    <option value="All">All</option>
                    <option value="">None</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                </select>
            </div>
            <table>// ...</table>
        </>
    );
};

export default Table;
```

Now we need a state and a handler function for filtering.

```jsx
import { useState } from 'react';

const Table = ({ contacts }) => {
    const [filter, setFilter] = useState('All');
    const handleChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div>
                Filter:
                <select value={filter} onChange={handleChange}>
                    // ...
                </select>
            </div>
            <table>// ...</table>
        </>
    );
};

export default Table;
```

Now we will show the data in the table based on the filter option. For that, we will take an empty array.

```jsx
let filteredContacts = [];

if (filter === 'All') {
    filteredContacts = contacts;
} else {
    filteredContacts = contacts.filter((contact) => contact.group === filter);
}
```

Here, we have explained that if `filter === 'All'`, it will show all contacts; otherwise, it will match the form's option and show the respective contacts. In the `tbody`, instead of `contacts.map`, we will use `filteredContacts.map`. Now if we check, we will see the filtering works as we select the options.

### Apply Search System

Now we will apply a search system in our application. First, we will add a search bar. Below the `select` in the Table component, we will add the following code:

```jsx
<input type="search" placeholder="Search" />
```

Its job is to search within the filtered options and bring the results. Let's see how to do that. First, we will take a state.

```jsx
const [searchTerm, setSearchTerm] = useState('');
```

Now, we will add `value` and `onChange` to our search input field.

```jsx
<input
    type="search"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>
```

Next, we will write a logic.

```jsx
if (searchTerm) {
    filteredContacts = filteredContacts.filter(
        (contact) =>
            contact.name.includes(searchTerm) || contact.email.includes(searchTerm)
    );
}
```

This works perfectly. But there is a problem: each filter is happening twice, which will create a performance issue. So we won't do that. We will extract the function inside the filter first.

```jsx
const searchCB = (contact) =>
    contact.name.includes(searchTerm) || contact.email.includes(searchTerm);
```

Then, we will modify the previous logic for filtering.

```jsx
if (filter === 'All') {
    filteredContacts = searchTerm ? contacts.filter(searchCB) : contacts;
} else {
    filteredContacts = contacts.filter(
        (contact) => contact.group === filter && searchCB(contact)
    );
}
```

Now the application will work perfectly.

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-40).

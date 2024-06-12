
# Lecture 43 - React Styling Options, Styled Component, and Project Structures

## Introduction

In today's lecture, we will see how to add styles to a React application using _styled components_. Then we will look at how to structure our React project. After that, we will work on forms. Based on what we have learned so far and what we will learn in the next two classes, we will be able to jump into a project. There are a few minor topics that we will learn as we work on the project. If we go to React's official [documentation](https://reactjs.org/docs/getting-started.html) and see the main concepts, we will see that we understand almost everything except forms. Once we understand forms, we will be able to build applications. The topics in the Advanced Guides are for building applications more easily and optimally. We will gradually learn those as well.

## How to add style in a React application

We can link a CSS file in our `index.html` file and use the `className` prop in `jsx` to write the class names.

We can also write inline CSS. React supports inline CSS by default. However, the big problem with inline CSS is code duplication. Suppose I write inline CSS in a component and render it dynamically. It renders 100 components. The CSS code is generated 100 times with each component, which is not a good solution. Why should I clog up the browser with so much data when I can write the code once and share it? So, it's not a good solution.

Another way is [jss](https://cssinjs.org/?v=v10.9.2) or _css in js_. We will write CSS in a JavaScript file instead of a separate CSS file. We will see this shortly. This is not a part of React. We will need third-party libraries for this.

There are also many libraries for animations. Among them, [react spring](https://react-spring.dev/) and [framer motion](https://www.framer.com/motion/) are very popular. We will look at them in more detail when we work on animations.

When it comes to styling in React, the best solutions are _jss_ or _SASS_. If you are proficient in SASS, you can go with that. Or you can go with JSS. It's up to you.

## JSS

When working with JSS, there are libraries like [styled components](https://styled-components.com/) and [emotion](https://emotion.sh/docs/introduction). You can use any one of them as per your preference.

Here we will discuss styled components.

## Styled components

Styled components are essentially functions. Let's see a demo code -

```jsx
const Button = styled.a`
    /* This renders the buttons above... Edit me! */
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
    color: white;
    border: 2px solid white;

    /* The GitHub button is a primary button
     * edit this to target it specifically! */
    ${(props) =>
        props.primary &&
        css`
            background: white;
            color: black;
        `}
`;
```

Here, we used a template literal string. Since we used a template string, we can write JavaScript code, apply conditions, inherit, and do everything that can be done in JavaScript. Ultimately, it returns a component.

First, we will install it using the command `yarn add styled-components`.

Since we are using the `yarn` package manager, we will add the following line to our `package.json`.

```json
{
    "resolutions": {
        "styled-components": "^5"
    }
}
```

This will help us in case of any version-related issues.

Next, we will import `styled components` in our `App.jsx` file by writing the following line:

```jsx
import styled from 'styled-components';
```

Suppose we want to style a button. If you write `styled` and give `.` you will see suggestions of all the tags. Since we want a button, we will write `styled.button`. Since it is a function, we can write CSS code inside `styled.button()`. However, writing it this way can make it difficult to maintain. So, instead of writing it that way, we can write it like `styled.button``  ` and write our code inside the `` ``.

```jsx
styled.button`
    border: none;
    outline: none;
    background: black;
    color: white;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
```

Now we need to store the component we created in a variable. When naming the variable, we must keep in mind that since it is a component, its name must start with a capital letter.

```jsx
const BaseButton = styled.button`
    border: none;
    outline: none;
    background: black;
    color: white;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
```

Now if we create a button using this component, it will show in the browser.

```jsx
const App = () => {
    return (
        <div>
            <h1>App</h1>
            <BaseButton>I am a button</BaseButton>
        </div>
    );
};
```

![l43-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663999243774/nPW1weFA2.png)

### Passing props

We want the background to be white and the text color to be black if there is a `dark` prop in the component. If not, it will be the opposite. Let's see how we can do that.

```jsx
const BaseButton = styled.button`
    border: none;
    outline: none;
    background: ${(props) => (props.dark ? '#dddddd' : '#232323')};
    color: ${(props) => (props.dark ? '#232323' : '#dddddd')};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;

const App = () => {
    return (
        <div>
            <h1>App</h1>
            <BaseButton dark>I am a button</BaseButton>
        </div>
    );
};
```

![l43-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1663999698176/kyIExwRZx.png)

See, we can dynamically change our CSS code by passing props. This is the power of styled components.

Here, writing `dark` means writing `dark={true}`.

### Inheritance

Now we will see that some properties of `BaseButton` are necessary to create a button. We will only keep those in `BaseButton`.

```jsx
const BaseButton = styled.button`
    border: none;
    outline: none;
    border-radius: 0.15rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
```

Now we want to create a primary button based on this `BaseButton`. Let's see how we can do that.

```jsx
const PrimaryButton = styled(BaseButton)`
    background: red;
    color: white;
`;

const App = () => {
    return (
        <div>
            <h1>App</h1>
            <BaseButton dark>I am a button</BaseButton>
            <PrimaryButton>Primary Button</PrimaryButton>
        </div>
    );
};
```

![l43-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664001181487/NwP8zVCb-.png)

Here we wrote `styled(BaseButton)` instead of `styled.button`. Because we are creating our `PrimaryButton` based on `BaseButton`.

Now we want to change the font size through props. Let's see how we can do that.

```jsx
const fontSizes = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.2rem',
};

const BaseButton = styled.button`
    border: none;
    outline: none;
    border-radius: 0.15rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: ${(props) => fontSizes[props.size] ?? fontSizes.md};
`;

const App = () => {
    return (
        <div>
            <h1>App</h1>
            <BaseButton size="sm">I am a button</BaseButton>
            <PrimaryButton>Primary Button</PrimaryButton>
        </div>
    );
};
```


![l43-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664001909325/dCcMFD-cu.png)

The font size will change according to the value passed as a prop to the button.

## React Project Structure

Now we will learn how to structure a React project. For this, we will create a new React project using Vite.

After that, we will delete everything inside the _src_ folder except for `main.jsx`. Then we will create some directories as shown below.

```
|- src
  |- main.jsx
  |- app
    |- App.jsx
    |- ...
  |- components
    |- UI
    |- shared
  |- pages
    |- ...
  |- states
    |- ...
  |- hooks
    |- ...
  |- api
    |- ...
  |- routers
    |- ...
  |- utils
    |- ...
  |- tests
    |- ...
```

- app: This directory will maintain everything related to the application such as routes and state. At this moment, we need the `App.jsx` file. We will create it and import this app file in our `main.jsx` file.
- components: Many types of components will be needed. All of them will be in this directory.
  - UI: Reusable UI components created with styled components will be in this folder.
  - shared: Other reusable components except for UI components will be in this folder.
- pages: An application can have many pages. If it does, all of them will be in this folder.
- states: Global state will be managed in this folder. We have not worked on it yet, but we will in the future.
- hooks: Many hooks will be needed. We will manage them in this folder.
- api: We might need to work with many APIs. We will do that in this directory.
- routers: Since there will be many pages, we will need many routers. They will be managed in this folder.
- utils: All utilities will be in this folder.
- tests: Code for testing will be written in this folder.

This is a rough structure for a root-level project.

There is no hard and fast rule to structure a project in this way. You can structure it any way you want as long as the code is easily maintainable.

## Working with form

Now we will work on forms. When working with forms, we need some UI components like buttons, input, label, and text. We will create those first.

### TextInput component

We created a file named `TextInput.jsx` inside _src/components/inputs_. Then we installed `styled components`.

```jsx
// src/components/inputs/TextInput.jsx

import styled from 'styled-components';

const TextInput = styled.input`
    width: 100%;
    border: 1px solid #232323;
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

export default TextInput;
```

Now, if we import and call this component in our `App.jsx` file, we will see an input field added to our application.

```jsx
// src/app/App.jsx

import TextInput from '../components/UI/inputs/TextInput';

const App = () => {
    return (
        <div>
            <h1>Working with Form</h1>
            <TextInput />
        </div>
    );
};

export default App;
```

### Button component

Next, we created a file named `Button.jsx` inside _src/components/buttons/_.

```jsx
// src/components/buttons/Button.jsx

import styled from 'styled-components';

const Button = styled.button`
    border: none;
    outline: none;
    background: #e1e1e1;
    color: #333;
    border-radius: 0.15rem;
    padding: 0.25rem 1rem;
    font-size: 0.9rem;
    font-family: Arial;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background: #ccc;
    }
`;

export default Button;
```

If we import and call this in `App.jsx`, we will see a button added.

```jsx
// src/app/App.jsx

import Button from '../components/UI/buttons/Button';
import TextInput from '../components/UI/inputs/TextInput';

const App = () => {
    return (
        <div>
            <h1>Working with Form</h1>
            <TextInput />
            <Button>Test Me</Button>
        </div>
    );
};

export default App;
```

### Text components

We will write the following code in _src/components/texts/Text.jsx_.

```jsx
import styled from 'styled-components';

const fontSizes = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.1rem',
};

const lineHeights = {
    sm: 1.2,
    md: 1.4,
    lg: 1.6,
};

const Text = styled.p`
    font-family: Arial;
    font-size: ${(props) => fontSizes[props.size] ?? '1rem'};
    color: #222;
    line-height: ${(props) => lineHeights[props.line] ?? 1.3};
`;

export default Text;
```


### Label Component

We will create a file named `Label.jsx` inside _src/components/UI/inputs_ and write the following code.

```jsx
import styled from 'styled-components';

const fontSizes = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.1rem',
};

const lineHeights = {
    sm: 1.2,
    md: 1.4,
    lg: 1.6,
};

const Label = styled.label`
    font-family: Arial;
    font-size: ${(props) => fontSizes[props.size] ?? '1rem'};
    color: #222;
    line-height: ${(props) => lineHeights[props.line] ?? 1.3};
    user-select: none;
`;

export default Label;
```

### InputGroup Component

So far, we have created components for different tags. Now, we will create a component using those elements. We created a file named `InputGroup.jsx` inside _src/components/shared/forms_. Here, our `label` and `input` fields will be placed side by side beautifully.

```jsx
import styled from 'styled-components';
import TextInput from '../../UI/inputs/TextInput';
import Label from '../../UI/inputs/Label';

const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ErrorMessage = styled.div`
    font-size: 0.8rem;
    color: red;
`;

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
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default InputGroup;
```

Now, we can import and use this component in our `App.jsx`.

## main.css

We will create a `main.css` file inside the src folder and put the following code inside it.

```css
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
* {
    box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}
body {
    line-height: 1;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

.root {
    padding: 2rem;
}
```

We will never write it this way. This reset CSS is used here to make the application look a bit better. Then we will import this file into `main.jsx`. Also, we will add the `root` class to the main `div` in `App.jsx`.


```jsx
// src/app/App.jsx

import InputGroup from '../components/shared/forms/InputGroup';

const App = () => {
    return (
        <div className="root">
            <InputGroup
                name="title"
                placeholder={'Enter Your Title'}
                label={'Title'}
                error={'Something went wrong'}
            />
        </div>
    );
};

export default App;
```

Our application will look like the image below.

![l43-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664011114622/ysViyH5RC.png)

## Story Book Design Systems

Creating a component and repeatedly importing it into `App.jsx` for testing is not a proper system. Developers use a tool for this purpose called [Story Book](https://storybook.js.org/tutorials/design-systems-for-developers/). We will work on it later.

## Design System

Large companies usually develop their own design systems through research. For example, Microsoft's design system is called [Fluent](https://www.microsoft.com/design/fluent/), Google's design system is [Material](https://material.io/design), and IBM's design system is [Carbon](https://carbondesignsystem.com/). These big companies have developed their own design systems. As front-end developers, it is our responsibility to know about design systems. All of these are open-source. Additionally, there are more. Research them to see what each system is like, what colors they have selected, what fonts they have used, etc.

## Source Codes

Today's source code links are -

- [Styled Component basics](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-43/react-style)
- [React Project Structure](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-43/react-structure)

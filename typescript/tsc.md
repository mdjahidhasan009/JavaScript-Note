# `tsc`
JSX (JavaScript XML) is a syntax extension for JavaScript, primarily used with React, that allows you to write HTML-like
code within your JavaScript or TypeScript code. TypeScript supports JSX and provides a seamless way to use JSX syntax 
alongside TypeScript's type checking and other features.

To use JSX in TypeScript, you need to configure your tsconfig.json file to specify some options, like:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react"
  }
}
```

Here, the "jsx" option is set to "react", which transpiles JSX content into `React.createElement()` calls, compatible
with the React library.

TypeScript also allows you to leverage its type system in your JSX code to ensure type safety when using React
components:

```typescript
import React, { FC } from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

const App: FC = () => {
  return <Greeting name="TypeScript" />;
};
```

In this example, we define a Greeting functional component with a strongly-typed prop using the GreetingProps interface. 
The FC (Functional Component) generic type is imported from the react library and used to specify the type of our
components.

Using TypeScript with JSX ensures safer, maintainable, and more efficient React code, since the TypeScript compiler 
checks for correct component usage, valid properties, and accurate types during development.


### Resources
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript#intermediate-typescript-interview-questions-and-answers)
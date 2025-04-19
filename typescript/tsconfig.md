# `tsconfig.md`

The `tsconfig.json` file is a configuration file used by TypeScript to control various aspects of the TypeScript compiler behavior when building (transpiling) TypeScript files into JavaScript. This file provides a way to define the options and settings that the TypeScript compiler (typically the `tsc` command-line interface) should use during the compilation process. It resides in the root of a TypeScript project.

Some of the common settings you can configure in `tsconfig.json` are:

* **`compilerOptions`**: This property is an object containing the core configuration options for the TypeScript 
  compiler, such as:
  * `target`: Specifies the output ECMAScript language level (e.g., `"ES5"`, `"ES6"`, `"ES2020"`, `"ESNext"`). This
    determines which JavaScript features are downleveled and which are left as is.
  * `module`: Sets the module system used in the generated JavaScript output (e.g., `"CommonJS"`, `"AMD"`, `"UMD"`, 
    `"ES2015"`, `"ESNext"`).
  * `outDir`: Indicates the output directory for the compiled JavaScript files (e.g., `"./dist"`).
  * `rootDir`: Specifies the root directory of the input TypeScript source files. Only files within `rootDir` are copied 
    to `outDir`.
  * `sourceMap`: Generates corresponding `.map` source map files alongside the JavaScript output, essential for 
    debugging the original TypeScript code. Set to `true` to enable.
  * `strict`: Enables a wide range of stricter type-checking options (`true` enables all strict mode options like 
    `noImplicitAny`, `strictNullChecks`, etc.). Highly recommended for robust code.
  * `noImplicitAny`: Raises an error when TypeScript cannot infer the type of a variable or function parameter and 
    implicitly defaults it to `any`, forcing explicit type annotations for better type safety. (Enabled by `strict: 
    true`).
  * `lib`: Specifies a list of library files to be included in the compilation (e.g., `["DOM", "ES2015"]`). These define 
    built-in APIs like `document` or `Array.prototype.map`.
  * `jsx`: Configures JSX support (e.g., `"react"`, `"react-jsx"`, `"preserve"`).
  * `esModuleInterop`: Enables compatibility helpers for importing CommonJS modules using ES Module syntax (`import` 
    instead of `require`). Often set to `true`.
  * `allowJs`: Allows JavaScript files to be compiled alongside TypeScript files.
  * `checkJs`: Reports errors in `.js` files (often used with `allowJs`).
* **`watch`**: (Note: This is typically a command-line flag (`tsc --watch`) rather than a `tsconfig.json` option, 
  although some build tools might interpret it). Enables watch mode, where the compiler monitors files and automatically
  recompiles when changes are detected.
* **`include`**: An array of glob patterns specifying which files *should* be included in the compilation (e.g., 
  `["src/**/*"]`). If `files` is not specified, `include` defaults to all TypeScript files (`**/*.ts`, `**/*.tsx`) in
  the containing directory and subdirectories.
* **`exclude`**: An array of glob patterns listing files or directories to be excluded from the compilation (e.g., 
  `["node_modules", "**/*.spec.ts"]`). This takes precedence over `include`. `node_modules` is typically excluded by 
  default.
* **`extends`**: Allows you to inherit settings from another base `tsconfig.json` file (e.g., `"./tsconfig.base.json"` 
  or a shared config from an NPM package). This promotes configuration reuse and reduces duplication in multi-project
  scenarios or monorepos.
* **`files`**: An array that explicitly lists the *exact* file paths (relative to `tsconfig.json`) to be included in the 
  compilation. This is typically used for smaller projects with few source files or when precise control over included 
  files is needed. If `files` is present, `include` is ignored.

These settings help to customize the TypeScript build process based on your project's requirements and conventions, 
resulting in consistent and maintainable code output. By configuring `tsconfig.json`, you can tailor the compilation
process to cater to multiple environments, target outputs, and module systems, ensuring your project compiles exactly as
needed.



### Resources
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript#intermediate-typescript-interview-questions-and-answers)
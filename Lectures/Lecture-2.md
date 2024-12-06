# We Need Freedom, We Have to Stop Technology War

In the last class, many of you must have been scared after seeing the names of various technologies. It’s natural to feel this way, wondering how I will learn all these things. But there is no need to worry. The best way to learn technology is not to aim to master something all at once. It should be done gradually. For example, you start with HTML. Now, if you want to learn everything about HTML and then move on to CSS, you will never get there. What’s the solution? The solution is to have a basic understanding of HTML. Like how to write HTML structure, how to layout elements, how to add text, images, etc. Just the basics, then jump to CSS. When you start learning CSS, you will definitely need HTML. At that point, when you realize you don't know something in HTML, you can go back and review it and move forward again. Similarly, when you learn JavaScript, you will need HTML and CSS. So, if you miss something, you will learn it later. There’s no need to worry.

When learning something, if you don’t understand a topic, skip it for now. At some point, you will be able to understand it with the brainstorming required, and then you can come back and learn it. This way, you will spend less time learning and won’t be afraid.

## Today’s Agenda

Now, let’s come to today’s agenda. Today’s topics are:

- We need freedom, we need to stop technology war
- Why do we need programming languages?
- Why different programming languages for client & server?
- Understanding programming paradigms.
- Programming is always the same, but the language varies.

## Why do we need programming languages?

The steps needed for an application are:

- Requirements
- Design
- Implementation
    - UI/UX Design
    - Web Design
    - Frontend Development
    - Backend Development
    - Test Code
- Testing, Deployment
- Maintenance

Out of these steps, we primarily use programming languages in the **Implementation** phase. Specifically, in **Frontend** and **Backend Development**, programming languages are required. Now, the question is why do we need them? What do we do with programming languages? Simply put, a programming language does one thing: we write some code in it that the computer understands. Through programming languages, we can explain real-life problems to the computer. Aside from this, there is no other function of any programming language. While each language has its reasons for existence, the task remains the same: to act as a translator between me and the computer.

Let’s take an example: Suppose you are an American, and you need to communicate with someone who speaks another language. The Chinese will hire a Chinese translator, Germans will hire a German translator, Spanish people will hire a Spanish translator. But the objective is the same: to communicate with the American. Naturally, the accent and language will vary, but the purpose is the same. Similarly, programming languages are designed as translators between humans and computers.

## Why different programming languages for client & server?

Here comes a big question: If all programming languages are for communicating with computers, then why are there so many languages? The answer to this can be given in various ways. For instance, let’s say we are Bangladeshis. When we need to explain something in English, we’ll appoint a translator among ourselves. Similarly, Indians will hire an Indian, Germans a German, and Chinese a Chinese. Each country will choose a translator based on their specific needs. When Microsoft created a programming language, it did so to solve their own problems. When Apple created a programming language, it was designed to work with their product. When Dennis Ritchie was stuck while designing the Unix operating system, he created a language to solve that problem. Then, when C couldn’t solve certain problems, C++ was created to address them. Later, Java was created by Sun Microsystems to solve its own set of problems. So, each programming language was created by a company to solve its specific problems.

Today, there’s a lot of noise around JavaScript. The main reason JavaScript came into existence was to add interactivity to HTML in browsers. This was the primary purpose. When Java came into being, it was meant for running programs on portable devices (embedded devices, media players, CD players). C was created for operating system design. So, it’s clear that each programming language has been created to solve a specific problem. Each language has its own flavor, but the objective is always the same: problem-solving and facilitating communication with the computer.

PHP has a fascinating history. When the web started, there was a need for a scripting language to create websites, which existing languages couldn’t handle. This was the time of Web 1.0, where only data was passed. To meet this need, PHP was created, and it later gained huge popularity.

Every programming language has a specific purpose. The changes occur based on who is creating it and their needs, but the end goal remains the same: solving problems.

Now, let’s get back to our main question: **Why different programming languages for client and server?**

The first question is: Where do programming languages run? Of course, they run on a machine. After the code is compiled by a compiler, it runs on a machine. It can be a computer, a TV, or even a fridge. Basically, anywhere there’s a processor, RAM, and memory storage where the code can be stored, and a compiler can be installed, a program can run.

So, if that’s the case, then why are there different languages for the client and the server? The frontend of a website runs in the browser. But the browser is not a computer; it’s a small software running inside the computer. On your computer, you can install any compiler for languages like C, C++, Java, Python, etc. But that’s not possible for the browser. That’s why JavaScript was included when designing the browser. So, to add interactivity to the web app, we need to learn JavaScript. No other language will work here.

That’s why there is no alternative to learning JavaScript for the frontend. If tomorrow, a new browser comes into existence that runs Python, then we’ll have to learn Python for frontend development. Some people have already decided that JavaScript is the only language they’ll support in browsers.

Now, let’s come to the server side. The server is the ultimate machine. It serves the requests we send, which is why it’s called the server. If we say, "Give me this page" or "Give me this image," it serves it. Essentially, it’s just another computer. Any programming language can run on this computer.


It seems that we cannot go beyond JavaScript for the browser or client-side. However, since the server is a computer, and we can run any language on a computer, we are open to selecting any language for the server-side. We can create a server-side application using languages like C, C++, Java, Go, Python, and even Assembly. But the days of different languages were up until 2009. Until before 2009, no one could imagine JavaScript outside the browser. So, out of necessity, we had to learn JavaScript for the browser or client-side and languages like Python, PHP, Ruby, etc., for the server-side. This was the reason why we needed multiple languages.

But thanks to Ryan Dahl for creating Node.js, which changed everything. Now, we no longer need to learn multiple languages for both client and server-side development. By learning just one language, JavaScript, we can do frontend work, create APIs, and build the backend. Node.js is a revolution. It not only made development easier but also firmly established JavaScript as a server-side language. This is the credit of Node.js and, of course, Ryan Dahl.

However, while we can work with just one language for both sides, we are still open to choosing any language for the server-side. We can build server-side applications with any language.

Now, if we bring mobile into the picture, what happens? Normally, we are familiar with two operating systems for mobile—Android and iOS. iOS is created by Apple, and they restrict the use of any language other than Swift and Objective-C. But Android doesn’t have any such barrier. On Android, we can use C++, Kotlin, Java, or any other language to create apps. It's not just limited to these three languages for Android app development. If we can break the operating system (i.e., root the Android phone), we can get full access to the system. Once we have access, since the mobile is essentially a machine, with a processor, RAM, and hard disk, we can run any binary code. So, we can run Linux, do programming, and use any language on Android. But with iOS, Apple has set a barrier, and there’s nothing we can do there.

**Summary:** For the client-side, only JavaScript is used, and for the server-side, we can use JavaScript as well as any other language. But in mobile development, on iOS, we can only use Swift and Objective-C, whereas on Android, there are no such restrictions.

### Understanding Programming Paradigms

The battle of programming languages fundamentally comes down to programming paradigms. What is a paradigm? If we put it in simple terms, it’s somewhat like a category. A programming language will do one kind of task, and another programming language will do another kind. Categorizing programming languages into various types is called programming paradigms.

When we are taught programming, we are often taught in a language-specific manner. We end up specializing in one language, either out of love for it or due to reluctance to learn others. However, if we were taught programming in an abstract way, we wouldn’t need to worry about the language. We could easily understand and use any language according to our needs. To achieve this, we need to classify programming languages based on the problems they solve, and this classification is known as programming paradigms.

There are two main paradigms in programming:

1. **Imperative Paradigm**
2. **Declarative Paradigm**

According to Wikipedia, the **Imperative Paradigm** is defined as: _"In which the programmer instructs the machine how to change its state."_ The **Declarative Paradigm** is defined as: _"In which the programmer merely declares properties of the desired result, but not how to compute it."_

Let’s simplify these definitions.

Consider you ask someone to buy a book, and you say: “I’ll tell you the name of the book, you go to Nilkhet and buy it.” You don’t tell them how to go. That is **Declarative Paradigm**. You simply declared the result you want (buying the book), but you didn’t instruct how to get there.

Now, let’s come to the **Imperative Paradigm**. Suppose you tell the person to buy the book but with specific instructions like:

- Start at Farmgate.
- Go to the roundabout and take the bus number 10.
- Pay 10 Taka fare.
- Get off at Nilkhet and turn left.
- Look for a library.
- Enter the library and ask for a specific book.
- If the price is below 200 Taka, buy it. Otherwise, go to the next shop.
- After buying, take the bus back to Farmgate.
- Finally, deliver the book to my house.

Now, from the definition, we can see in the **Imperative Paradigm**, the programmer provides the machine with detailed instructions on how exactly to do something, step by step.


### Imperative Paradigm

Imagine someone is coming from a village and doesn’t know Dhaka. They need to be given step-by-step instructions to get there. In other words, languages that are very close to machine-level languages need to be instructed line by line. In this case, languages like C, C++, and Java are considered low-level languages because they are close to the machine. From a generational perspective, these are all high-level languages, but since they are close to the machine, they are classified as low-level languages. Based on this, imperative paradigm languages can be divided into two categories: procedural programming and object-oriented programming.

**Procedural** - Procedural means there is no group, no state, no relationships between entities. You just create a file and start writing instructions top to bottom. This is procedural. According to Wikipedia, it is `which groups instructions into procedures`.

**Object-Oriented** - We will still create a file, but in procedural, we just declare different variables and describe them. There was no logical grouping. In object-oriented, we describe things, but in logical groups. If we take the previous example, we can create a class for buying a book. For example, where to find the book, which book, how to calculate the price, etc. Then, we can create a class for transportation, which would describe how to go from Farmgate to Nilkhet. These two different classes don’t require any information from each other. They are separate groups. The advantage of object-oriented programming is that we can reuse the classes. Now, let’s say person 'K' lives in Dhaka and person 'Kh' lives in the village. For K, the transportation class becomes irrelevant because they don’t need to be told how to get around Dhaka. They only need the book-buying instructions. Therefore, only the book class will be used for K. But for Kh, both the transportation and book classes will be necessary because they don’t know Dhaka. In this case, the book class can be reused. If it were procedural, unnecessary code would be included for K, as the transportation code wouldn't apply to them. Similarly, if person 'G' lives outside Dhaka but has acquaintances in Nilkhet, they wouldn’t need the book-buying instructions. They only need transportation instructions. In this way, object-oriented programming offers great advantages.

If you properly understand object-oriented concepts without focusing on a specific language, you can apply object-oriented principles in any language. Language is not the issue; if you understand the theory, you can apply it in any language. You just need to learn the syntax.

### Declarative Paradigm

Declarative programming is like saying, “Just bring the book,” without worrying about how they will get there or negotiate the price. My concern is only about getting the book.

The declarative paradigm includes functional programming, logic programming, mathematical programming, and reactive programming.

- **Logic Programming:** This is used for tasks related to system design. According to Wikipedia, `in which the desired result is declared as the answer to a question about a system of facts and rules`.
- **Mathematical Programming:** This is used by those working on optimized solutions. According to Wikipedia, `in which the desired result is declared as the solution of an optimization problem`.

For development purposes, we don’t usually need these two types. Instead, functional and, in some cases, reactive programming are required.

- **Functional Programming:** This is somewhat similar to object-oriented programming. However, in object-oriented programming, we write detailed instructions for a group, while in functional programming, someone has already written those instructions for us. Our job is just to call what needs to be done. In the declarative paradigm, it’s important to note that the instructions have already been written imperatively for us, and we are just using them. This is why it’s called declarative. For instance, when we use `array.map()` or `array.reduce()`, we don’t know how the underlying code is written, nor do we need to know. We simply declare what needs to be done. According to Wikipedia, `in which the desired result is declared as the value of a series of function applications`.
- **Reactive Programming:** This is mainly used for asynchronous tasks. According to Wikipedia, `in which the desired result is declared with data streams and the propagation of change`. Here, "data streams and the propagation of change" refer to asynchronous tasks. For example, when you click a button, it triggers a response, which changes a state somewhere, and that, in turn, changes ten other things. This is reactive programming. Frameworks like Svelte, Vue, and Angular operate in a reactive way. However, React works differently, which we’ll discuss elsewhere. The concept of reactive programming revolves around data changing in one place due to an action and propagating to other places. This is also declarative because we don’t need to know what’s happening behind the scenes; we just declare what needs to be done.

HTML also falls under the declarative paradigm because when we write an `h1` tag, we don’t specify how it should work. We just write the tag, and the rest happens behind the scenes. For more details, you can visit this [link](https://en.wikipedia.org/wiki/Declarative_programming#Subparadigms).

---

### Types of Programming Languages

Now, the question arises: What type of languages are JavaScript and Python? Before addressing this, we need to look at this [article](https://en.wikipedia.org/wiki/List_of_programming_languages_by_type). It’s a list of programming languages categorized by type. Although most of these languages are not needed for development, it’s worth glancing over to understand the variety of languages and their types.

You’ll notice that C, C++, C#, JavaScript, and Python are listed under imperative languages.

They are also categorized under functional programming. This is quite confusing.

Functional programming languages are of two types: pure and impure. These languages fall under impure functional programming. Let’s first understand what pure and impure functional programming languages mean:

- **Impure Functional Languages:** These languages allow us to use them in functional, object-oriented, or reactive ways as needed. They are called impure functional languages because we can use them outside the functional paradigm as well.
- **Pure Functional Languages:** These are entirely functional.

This means we don’t need to worry about how to apply these paradigms in a particular language. We just need to understand the concepts and their implementation in any one language. Once we do that, we can apply them in any language by just learning the syntax. However, if you spend five days looking at GoLang, you won’t work like someone who has been using it for five years, but you’ll definitely be able to solve problems.

---

### Evolution of Programming Languages

From this programming paradigm discussion, we see that languages emerged to solve three types of problems. When there was nothing, procedural programming was introduced with C. Then, when code reuse and enterprise-level application development were needed, Java and C++ (object-oriented programming) came into play. OOP solved many problems, and today’s large-scale applications owe much to OOP. Since OOP is imperative, we must write instructions for every task, which can result in lengthy code. To address this issue, declarative languages emerged. Although someone else has written the instructions for us, we can accomplish tasks with much less code. This is why languages like Python and JavaScript are very popular today.

---

### Why So Many Languages?

If three types of problems exist, why do we have so many languages? Wouldn’t three languages suffice? C and C++ share similar syntax, and Java shares some similarities with JavaScript. Why was it necessary to create new languages? Beginners often make the mistake of judging a language based on its syntax. Syntax is like the keyboard of your computer. Some keyboards have lights, others don’t. Some are mechanical, others are semi-mechanical. Some have number pads, others don’t. Some have media player buttons, and so on. But the function of the keyboard remains the same. Similarly, syntax can vary slightly from one language to another, but the core function remains the same. The real focus is on implementation.

Implementation refers to how a language is designed by its creators. Specifically, it refers to how the compiler is designed. A compiler can be designed in many ways, and the design affects how quickly a program executes, its memory usage, garbage collection, and more. These factors are heavily influenced by the compiler architecture, leading to the creation of different programming languages. Another important factor is concurrency. Concurrency refers to utilizing all cores of a computer processor to execute code simultaneously. Computers used to have single-core processors, but now they have multi-core processors. Over the last 30 years, computer processing power has increased significantly, requiring compilers to be updated or redesigned and, in some cases, new languages to be created.

For example, C doesn’t have garbage collection. Garbage collection refers to cleaning up memory by removing unused variables, arrays, and stored data. With C, this has to be done manually. Java, on the other hand, introduced automatic garbage collection. Hence, programming languages are often created based on specific needs, especially compiler design.

---

### Compiler-Based Classification of Languages

Based on compiler design, programming languages can be categorized into three types:

1. **Compiled**
2. **Interpreted**
3. **Just-In-Time (JIT)**

## Compiled:
Compiled means that the code I wrote will be converted into pure machine code. Machine code refers to binary code. Compiled languages are usually faster. C, C++ are compiled. Java is also compiled in a way. But it's not pure compiled because there's a virtual machine called JVM in the middle where Java runs. Therefore, Java is slower than C++ and slower than C. There are 3 steps in a compiled language. First, you write the code, then you build it into an exe or class file, and finally, you run it. This process takes time to compile, but execution takes very little time. So the program runs very fast. Another advantage is that if there is an error in your code, it will be caught during the compile time. This is called compile-time errors. These languages take more time to boot because there is an intermediate process to compile, but they take less time in execution.

## Interpreted:
The interpreter will immediately run the code. Then, whenever required, it will read and execute the code accordingly. For example, in Python, let's say you wrote Python code and clicked the run button, it won't read line by line. So, if there is an error anywhere in the code, it may execute but not catch it because it’s not compiling the code. When necessary, it will read that part of the code, compile it, and then execute it for the machine. Therefore, runtime errors are more common in these languages. The disadvantage of these languages is that the code gets compiled every time, so execution time is longer compared to compiled languages. These languages take less time to boot, but they take more time in execution.

## JIT:
In this case, it reads the file instantly. Then, instead of interpreting line by line, it will directly compile and convert to machine code whenever needed. This way, the code remains there, and it doesn't need to compile every time. I can reuse it. This is the basic concept.

JavaScript was once interpreted. For JavaScript's revolution, two people deserve credit. One is Sundar Pichai. If he hadn't thought of creating the V8 engine and Google Chrome, JavaScript wouldn't have achieved this success. The credit for bringing JavaScript from interpreted to JIT compiler goes to Google and Sundar Pichai, who was leading at the time. The second person is Ryan Dahl. He took JavaScript outside the browser based on V8. Because of this JIT compiler, JavaScript's history has changed. It became possible to create large applications using JavaScript because if you want to use the same language in two places, it must execute quickly. Before V8 engine, this wasn’t the case. But after the V8 engine came, this became possible. With this opportunity, it became possible to create very large applications using JavaScript.

If we look at the history of the Go language, the co-author of C, Ken Thompson, thought that the syntax of C was not suitable for large applications. Therefore, C wouldn't be very useful. So, we need a language with the same performance as C but with easier coding, garbage collection, and easier concurrency. Thus, a low-level language was created called Go, which is known to us as Go Lang. It’s a game-changer because we get the power of C but write code as easily as Python.

So, you see, C knows that when it comes to Go, what it is stuck with? The reason for the emergence of so many languages is that if I can’t solve a problem with a particular language, a new language has come. C was made many years ago. Back then, things were solved differently. But in today's fast-paced world, Go Lang emerged to cope. The main reason is this. No one is a competitor of another. Everyone is either a predecessor or successor of each other.

Let’s talk about Dart. They have created a language by combining the best features of all languages for easy application development, called Dart.

Another question might arise after all this discussion. Couldn’t we have upgraded the existing language instead of creating a new one? Of course, it could have been done, and it is done. Let’s say you built a 15-story building 30 years ago. Now, can you convert it into a modern building except for changing the color, doors, and windows? It’s not possible because it was built 30 years ago with the architecture of that time. Now, you can't break that old architecture and build a new building with modern architecture. Like, Node.js is a new architecture, and it couldn’t break that, so we had to introduce Deno. This is the main issue.

## Final Words:
We need to learn theory. Object-Oriented Programming, Functional Programming, Garbage Collection, Concurrency—once we know these concepts and how to implement them in any language, we won't have to struggle with learning each language.

When we try to learn something, we shouldn't be language-specific or framework-specific. We should aim to learn its core knowledge abstractly and then figure out how to apply it in the language we are using.

## Resource for this lecture:
**Click here to access all the resources for this lecture [here](../../resources/lecture-02/README.md)**

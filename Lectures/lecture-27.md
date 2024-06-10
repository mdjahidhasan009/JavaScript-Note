
# Lecture 27 - Frontend Core Concepts and Communication

## Table of contents

- [What is Frontend](#what-is-frontend)
- [Features of Frontend](#features-of-frontend)
- [Why Frameworks](#why-frameworks)
- [Core Features of ReactJS](#core-features-of-reactjs)

## What is Frontend

Until the last class, we have created the backend or the core of our application. From this class, we will see how to give a physical or external form to our application. In this class, we will give a broad idea about the frontend. Once you get this idea, I hope you don't have to worry about developing for desktop, web, or mobile platforms. Everything is the same.

So far, what we have built is an API. Many people are also doing business with this API. For example, [Twilio](https://www.twilio.com/) does business with APIs for SMS, Voice, Video, and Authentication.

But we want to be full-stack developers. So we can't be satisfied with just the API. We need to have a good understanding of the frontend as well.

First, we need to understand the definition of a client. There can be many types of clients. We need to understand who our clients are. In the development world, clients are mainly browsers, desktops, mobiles, etc. who will use our API. When we think of clients, we think of those who will give us work or the users. But if you think about it, users do not use our API directly. For example, you are a user. You log into Facebook. If you go to the network tab in inspect and look at the fetch/xhr requests, you will see some xhr requests when you like, comment, or do something. If you click on those, you will see the API in JSON format. Now you are not using this API directly. You are using Facebook's frontend browser or mobile app. That browser or mobile app is using the API. So you or the user is never the client, the clients are those who are using the API directly.

Let's list what our clients can be.

1. Web App: Even though we use the application through the browser, the actual client of our backend is its Web app. Our Web app is directly using the backend API.
2. Mobile App: When we post something on Facebook's web application on the browser, its notification also comes to our mobile app. But I posted it on the web application, why will the notification come to the mobile? That means the web, desktop, and mobile applications are connected to a specific thing, which is the API. So the mobile app is also a client of our backend.
3. Desktop App
4. IoT Device: IoT (Internet of Things) devices are small non-standard computing devices that are connected to the internet wirelessly and have the ability to send data. For example, smart TVs. On smart TVs, we can use YouTube, Facebook, Netflix, etc. through the internet. Suppose we have an IoT device that only sends information to the server when the door opens or closes. Since this device is using the backend application's API, the IoT device is our client.

In simple terms, any application or device that uses our backend API is considered our backend client. According to this theory, the client of our database is the backend. Because our backend uses the database directly.

Now how is everyone connecting to the backend? The medium is the API. Because it provides data to everyone in JSON format. How the data is saved in the database is not a concern of the frontend. The frontend always uses JSON from the backend. Since the backend gives the same JSON to everyone, anyone who can understand this JSON is eligible to be its client.

Let's try to understand a little better. Suppose a shopkeeper sells rice. Now everyone goes to that shop to buy rice, someone buys 5 kg, someone buys a 25 kg bag, someone buys a 50 kg bag. But ultimately everyone is buying rice. If we consider the shopkeeper as the backend API, then all the people who buy rice are his clients. The way of buying may be different, the quantity may be different but everyone is buying rice.

Now let's consider the coffee shop application we planned. We created a REST API for its backend. Now most programmers spend most of their time in VS Code. We can create an extension in VS Code. Orders can be placed from that extension. The process of creating that extension may be different, but we will use the same backend API. So the VS Code extension is a client of our backend. Now for those who spend most of their time in the browser, we created a Chromium extension. Since most browsers now use Chromium, creating a Chromium extension will support all browsers. Now the system of creating that extension is different. But it will use the same API. The backend is the same. So this Chromium extension is also a client of our backend. Again, those who are designers work in Figma. We can also create a Figma plugin using the same API. The main point is that we can have many clients. But everyone's backend is the same. We are not changing the backend. We are creating different clients in different ways. But the backend is the same. That means whether we create a web, mobile, desktop, extension, or plugin application, the backend is the same. Our entire version is connected through that backend.

Now the question may arise, why do we need to know so much if we only need to learn web app development? Whatever we said, except for IoT devices, all of them have some user interaction through the application. All of these are part of the frontend. Wherever there is UI and user interaction, all of these are part of the frontend. The system of creating it is different in each case. But the core concept of the frontend is the same. If we know the concept, we can create an application for anything.

## Features of Frontend

Now we understand what the frontend is. Now let's discuss what is included in this frontend.

- Representation Layer: It refers to what we see when we open our application. Whether it's a button or a form or a paragraph, heading, image, etc. We call the user interface of the application the representation layer. We create this layer with HTML and CSS.
- Data Layer: There are two types of data - application data and server data. Suppose we want to fullscreen a screen by clicking somewhere, or we can toggle the sidebar in VS Code, these are application-related data. These data do not need to be stored on the server. We can keep these in our frontend. And server data are those that we get from the API, which are stored in our database. Now there is a need to process or manage these data in some way in our application. This data layer is needed to do this.
- Logical Layer: We will take data from the data layer and process it through some logic and send it to the representation layer. Again, it can be the opposite. We can take data from the representation layer, process it, and send it to the data layer. This process happens in the logical layer.
- Network Layer: The network layer's job is to be connected to the logical layer and maintain the communication of data that needs to be communicated with the server. This is the only layer through which we will connect the backend and frontend.


## Frontend Layers

There are essentially four types of layers in our frontend. We'll create the representation layer using HTML and CSS. We can work on the data layer with local storage or small databases. For network communication, we have the network layer. And to coordinate all these, we have the logical layer. We tried to demonstrate this through a graphical representation.

![Frontend Layer](./images/Frontend-Layer.jpg)

We'll fetch data from the backend API through the network layer, process it properly through the logical layer, and store it in the data layer so that we can show it in the representation layer when needed. Similarly, we can process data received from the representation layer through the logical layer and store it in the backend through the network layer. Communication between the network layer and the backend API happens via HTTP. This is the main concept.

This concept is the same for all frontend applications. We can build any frontend app with this concept. The difference lies in the languages and frameworks for different applications. For example, if we work in React, we will write in JSX; if we work in Vue or Angular, we will use a template engine; if we develop mobile apps with Java Kotlin, we will write in XML. But at the end of the day, we are creating the representation layer. So, even though the implementation differs, our concept is the same for everything.

At one time, it was not possible to use the same backend for all frontends. Because when a request came to the backend, it would create and return an HTML page with the data. Extracting data like a mobile app from a huge HTML file was very difficult. JSON solved this problem. Now the backend API gives us only raw data. We can use that data to build frontend applications in our own way.

Let's try to understand this with another real example. Previously, computer companies would make desktops pre-configured. That is, they would configure everything in advance. We would just buy it and take it away. Like the whole HTML file. We couldn't configure it separately. Now we can use components from different companies in a desktop. We can configure the hard disk, RAM, graphics card, motherboard in our own way. REST API currently provides this convenience. We can work with only the data we need.

Now let's explain all these words briefly. Suppose you open your application somewhere. Be it mobile or browser. After opening, you want to search for something. Where you will write for your search is the **Representation Layer**. Now the search data needs to be retrieved from the server. The responsibility of communicating with the server is performed by the **Network Layer**. Now our data may need some formatting. The **Logical Layer** will do that. Then it needs to be stored in a place on the client. The **Data Layer** is there for that task. Then the data layer will send our searched data through the logical layer to the representation layer in a beautiful way and the representation layer will show us that data.

If you can understand this much, you have understood a large part of frontend development. When we work with frameworks, we will enjoy working if you understand this concept.

One more thing needs to be understood. The main role in this whole process is played by HTTP. Without it, our process would not be completed. Without HTTP, we cannot fetch data from the backend. Where there is HTTP with the client, it can fetch data from the backend.

Will the frontend always act as a client? No, our backend will sometimes work like the frontend. Let's look at the figure below.

![backend-client](./images/backend-client.jpg)

Suppose our backend application uses three more servers: Twilio, SendGrid, Google Map. In this case, our backend application is the client. Because it is fetching data from other three servers. This is possible through HTTP. There are other systems besides HTTP. We don't need to think about them now. Let's understand the process first.

The channel through which communication is happening here is HTTP and the format through which data is being exchanged is JSON.

Now since we are in web development, what options do we have? Our options are JavaScript and DOM (Document Object Model). We do all our work using these two things.

## Why Frameworks

Now you may ask why so many frameworks came? The first reason is DOM manipulation is very costly. Not in terms of money. Updating and manipulating each DOM requires a lot of time and memory. That means time complexity and memory complexity are very high. Another big reason is that we don't know what PC our user is using, how high configuration PC they are using. We will have users with low configuration PCs as well as users with high configuration PCs. Now if we can't create applications that can run on low configuration PCs, our application won't get market. Because the number of low configuration PC users is high. Now we need to think about how we can create high performance applications for low configuration PCs. If we have to create such applications, it becomes a complex task. Another layer of complexity increases when it becomes a web application. Because people will visit our web application using browsers. There are countless browsers in the world. Some use old versions, some use the latest, some use Chrome, some use Edge, some use Firefox. Everyone's configuration is different. Another problem is screen size. Some have small screen sizes, some large, some use mobile, some tablets, etc. Now if we want to create an application with vanilla JavaScript keeping all this in mind, it will take a lot of time, we will have to write a lot of additional code, managing these will take a lot of time and the most annoying thing is that a lot of time will be wasted in optimizing performance.

The solution to these problems is frameworks. Such as React, Vue, Angular, etc.

Then why so many frameworks? One would have been enough. There is a purpose for every tool that comes to the market. Different tools can come to solve a problem. Some may have better performance. Again, different people feel comfortable with different tools. For example, if we compare React, Vue and Angular in terms of performance, it can be said without any hesitation that Angular's performance is the best. Because they use Shadow DOM. But their learning curve is very large. It's not that flexible. You have to work in the given way. Angular is still used in the industry. If we go to [2021 state of js](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks), we will see that the use of Angular is increasing day by day.

![2021stateofjs](./images/2021stateofjs.png)

Angular is generally used in applications where there are many complex issues. Where managing the code itself is a challenge. There is no point in showing flexibility there. A proper guideline is needed to follow to manage our application. In such cases, we need Angular.

React hasn't provided any guidelines by itself. Now if we want to create a large application, we need to create a guideline for our team by ourselves. So, Angular works well for large applications.

Now, if you ask for learning, React is easy. The learning curve of React is relatively small. Now, what is meant by this learning curve? It means that some rules have been created in Angular from which there is no scope to deviate. It takes a little more time to learn everything. In Vue, almost everything is built-in. But in some cases, flexibility is given. In this case, React is completely flexible. It doesn't take much time for someone who knows JavaScript to learn React. So React is the best for learning.


## Core Features of ReactJS

Let's discuss React briefly. We will need to do those four tasks repeatedly. For now, we are choosing React. We can work with any framework we need afterward.

Since we are choosing React, let's try to give an overview of the tools needed to learn, the tasks involved, and what we need to learn.

Here is a list of core concepts we need to learn:

- Component: Everything in React is a component. Everything else revolves around this component. We can divide the components in React into two categories:

  - Stateful: The components where we can work with data are called stateful components. Another name for data is state.
  - Stateless: The components where we do not work with data are called stateless components.

    These two types of components can be created in two ways.

    - Class Component: Many might question the need to learn class components when functional components are now in use. There are two reasons to learn class components. First, 90% of interview questions are still about class components. Why? Because functional components are new. Interviewers can't judge your React experience with functional component questions. Therefore, they use class component questions to assess your experience. Second, there are still many projects done entirely with class componen...
      - Lifecycle: This means how the class will run. How a component will start, process, update, and delete, when it will be deleted, whether we can do something when it's being deleted, whether we can do something when it's being updated—these are handled by the lifecycle. Earlier, some complex component patterns were created by managing class components and lifecycle.
    - Functional Component: There's an interesting aspect here:

      - Hooks: What does it do? It combines the tasks done by component patterns into one place, which is hooks. It's a very interesting concept. We'll understand it when we learn. Just like how class components and lifecycle brought about component patterns, functional components and hooks have introduced custom hooks. These custom hooks replace all component patterns, making it much easier.

    - Local State Management: State management can be done with either class or functional components. Local state management refers to the state or data within a component.

    - Component Tree: Since we consider everything as a component in React, a small UI is a component, and the parent UI showing everything is also a component. There is some form of communication between this parent and child. We call it the component tree.

    - State Lifting: Data can be easily sent from parent to child, but not so easily from child to parent. Here comes the concept of state lifting.

- JSX: This is how we show the UI in React. There are some aspects within it:
  - Conditional Rendering: If the user is logged in, it will show one type of navbar; if logged out, it will show another type of navbar. If logged in, it will show the logout button; if logged out, it will show the login button. These are part of conditional rendering.
  - List Rendering: How to handle similar types of data is included in this part.
  - Forms: How we work with important forms is another aspect to learn.
  - Event Handling: We need to know about event handling.

These are roughly the core concepts of React. Not just React, but any frontend application's concept. If there is anything beyond this, we will learn it as we work. The whole process is shown in a diagram.

![React Learning Curve](./images/react-overview.jpg)

To get an idea of React's core concepts, you should complete the [Understand React JS Core Features](https://www.youtube.com/playlist?list=PL_XxuZqN0xVBANld2gDEE6_0G886zavUs) playlist.

You will find the full diagram in [Client Server](./Client%20Server.drawio). There is an extension for viewing drawio files in VS Code called [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio). Install it to easily open drawio files in VS Code.

![drawio](./images/drawio-ext.png)

## Author

[Aditya Chakraborty](https://github.com/adityackr)

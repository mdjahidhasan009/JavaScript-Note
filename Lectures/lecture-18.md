
# Lecture 18 - Backend 5 | Understand The Concepts of Database

In backend development, while we don't need to dive deeply into databases at the initial stage, we do need to study them to a certain extent. As we progress, further study becomes necessary. Databases are a critical part of backend development with endless learning possibilities. It's an ongoing field where even a lifetime of study won't cover everything. Why are databases so important? Because the world runs on data. How to create data, how to scale it, how to ensure equal read, write, and update capabilities across multiple regions—these are key considerations. Data security is also a major concern, as even minor mistakes can lead to data theft by hackers. Although managing databases might not be the backend developer's primary responsibility, without good knowledge, we can't detect potential data leaks or attack points. Hence, creating secure applications becomes challenging. Therefore, even if it’s not our responsibility, we need to study this sector. As beginners, we don’t need to go very deep, but as we move from beginner to intermediate and then to advanced levels, we need to understand database architecture deeply to ensure our data doesn't get leaked through our code.

Even though we've all heard of databases, most of us don't know much about them. In today's lecture, we will try to get an overview of databases.

As backend developers, we typically don't decide which database to use. This responsibility lies with the solution architect. The solution architect analyzes business requirements and decides on the appropriate database. Our role as backend developers is to implement that database. However, since in this course we will learn a bit about solution architecture, let’s assume we are making all the decisions. Imagine you are the cloud engineer, the DevOps, the solution architect, and the developer. In this scenario, having a basic knowledge of the different types of databases in the market and their use cases can make it easier to crack interviews. Generally, we think of databases as SQL and NoSQL databases. SQL includes MySQL, PostgreSQL, while NoSQL includes MongoDB. Having a minimal understanding of other databases can be beneficial for cracking interviews. Just as programming languages have paradigms, databases have paradigms too. A search on the internet will show us seven database paradigms:

1. **Key Value Database** - Key Value databases are like JavaScript objects or Python dictionaries. They are in-memory databases, meaning they store data in RAM. However, the issue is they are not stable. If the PC restarts or shuts down for any reason, the data will be lost. Popular databases in this paradigm include [Redis](https://redis.io/), [MEMcached](https://www.memcached.org/), and [Amazon DynamoDB](https://aws.amazon.com/dynamodb/). If you plan to work at an external company, knowledge of DynamoDB is essential. Although it is officially categorized as NoSQL, it behaves like a key-value database and a wide-column database. It's used for quickly reading data when there's continuous data hitting. It’s easy to learn but fitting this database into business requirements is challenging. It includes partition key, hash key, and attributes.
   ![key value database](./images/key_value.png)

2. **Wide-Column Database** - Similar to Key Value databases, but with an added second dimension. For instance, DynamoDB includes partition key, hash key, and attributes, allowing multiple attributes for a single key. Popular databases in this paradigm are [Cassandra](https://cassandra.apache.org/_/index.html) and [Apache Hbase](https://hbase.apache.org/). Cassandra is particularly popular after MongoDB among NoSQL databases. Using MongoDB's Atlas cloud service is fine, but scaling an application or ensuring 99.99% uptime with the community edition can be challenging. Cassandra is best for such tasks.
   ![wide-column](./images/wide_column.png)

3. **Document Oriented Database** - When we think of Document Oriented Databases, we think of [MongoDB](https://www.mongodb.com/). Although we classify MongoDB as NoSQL, it doesn’t fit into any specific database type. It’s simply not SQL. There are many NoSQL databases, like Cassandra, DynamoDB, IndexedDB, Apache Hbase, Redis, MemCached. However, MongoDB can be categorized as Document Oriented Database. We will discuss this type in detail later. Other databases in this type include [Firebase](https://firebase.google.com/docs/firestore/).
   
4. **The Relational Database** - Traditionally, when we think of databases, we think of relational databases. These include [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), [Microsoft SQL](https://docs.microsoft.com/en-us/sql/), etc. These databases have tables, rows, and columns and use a common query language for querying data.
   
5. **Graph Database** - Discussed in [Lecture 15](../Lecture-15/README.md). If you haven't understood it well, please revisit Lecture 15.
   
6. **A Full Text Search Engine** - Also known as index databases, they are used for indexing data for search purposes. They use hashing algorithms or concepts like hash tables. When we index a product with multiple properties but search using specific properties like title, tags, category, or price, indexing helps quickly retrieve data with O(1) time complexity. Popular databases include [Algolia](https://www.algolia.com/) and [Elastic Search](https://www.elastic.co/elasticsearch/). Algolia is a next-gen search engine using Open AI3, capable of understanding search intent even if there's no exact match. Elastic Search is an older, industry-proven technology requiring exact text matches.
   
7. **Multi Model Database** - Includes [Fauna DB](https://fauna.com/), mainly used for transforming databases into GraphQL. It’s similar to programming languages but not very popular yet.

At the initial stage, we don't need to know much about these databases. It’s sufficient to know that such databases exist and are used for specific purposes. We will start by learning MongoDB. Later, as we become proficient developers and confident in using MongoDB for data modeling, aggregation, and transactions without any issues, we can explore other databases.

A question in this class was when to use Redis? We primarily use Redis for caching. For instance, if an online mobile store receives 100,000 requests for information on a new mobile, processing each request from the database is costly. Using Redis, we can cache the data in memory after the first request, setting a time limit of 24 hours for automatic data expiration. Subsequent requests within 24 hours will get the data from the cache, reducing database costs. For instance, if a product is ordered, it goes through several steps before displaying "Order Accepted" to the user. Using Redis, we can create an event queue, providing immediate feedback to the user while processing the remaining steps sequentially.

There's a debate between SQL and NoSQL. Among the paradigms, only Relational Databases are SQL, while the rest are NoSQL.

A question arises: why wasn't the term NoSQL heard before MongoDB? Because MongoDB coined the term.

There are misconceptions between SQL and NoSQL. Below are some common misconceptions:

1. Trying to apply SQL concepts in NoSQL, which is not possible due to different paradigms, making NoSQL seem bad.
2. Associating specific databases with certain technologies, like MySQL with PHP or MongoDB with Node.js, which is incorrect. Any database can fit with any language.
3. Believing transactions can't be handled in MongoDB.
4. Thinking joins can't be done in MongoDB. Though true, MongoDB offers advanced concepts like Aggregate and Lookup, surpassing table joining. MongoDB also excels in storing and querying time series data, providing easier services for complex scenarios like monitoring patient blood pressure every minute.


# Lecture 18 - Backend 5 | Understand The Concepts of Database

In backend development, while we don't need to dive deeply into databases at the initial stage, we do need to study them to a certain extent. As we progress, further study becomes necessary. Databases are a critical part of backend development with endless learning possibilities. It's an ongoing field where even a lifetime of study won't cover everything. Why are databases so important? Because the world runs on data. How to create data, how to scale it, how to ensure equal read, write, and update capabilities across multiple regions—these are key considerations. Data security is also a major concern, as even minor mistakes can lead to data theft by hackers. Although managing databases might not be the backend developer's primary responsibility, without good knowledge, we can't detect potential data leaks or attack points. Hence, creating secure applications becomes challenging. Therefore, even if it’s not our responsibility, we need to study this sector. As beginners, we don’t need to go very deep, but as we move from beginner to intermediate and then to advanced levels, we need to understand database architecture deeply to ensure our data doesn't get leaked through our code.

Even though we've all heard of databases, most of us don't know much about them. In today's lecture, we will try to get an overview of databases.

As backend developers, we typically don't decide which database to use. This responsibility lies with the solution architect. The solution architect analyzes business requirements and decides on the appropriate database. Our role as backend developers is to implement that database. However, since in this course we will learn a bit about solution architecture, let’s assume we are making all the decisions. Imagine you are the cloud engineer, the DevOps, the solution architect, and the developer. In this scenario, having a basic knowledge of the different types of databases in the market and their use cases can make it easier to crack interviews. Generally, we think of databases as SQL and NoSQL databases. SQL includes MySQL, PostgreSQL, while NoSQL includes MongoDB. Having a minimal understanding of other databases can be beneficial for cracking interviews. Just as programming languages have paradigms, databases have paradigms too. A search on the internet will show us seven database paradigms:

1. **Key Value Database** - Key Value databases are like JavaScript objects or Python dictionaries. They are in-memory databases, meaning they store data in RAM. However, the issue is they are not stable. If the PC restarts or shuts down for any reason, the data will be lost. Popular databases in this paradigm include [Redis](https://redis.io/), [MEMcached](https://www.memcached.org/), and [Amazon DynamoDB](https://aws.amazon.com/dynamodb/). If you plan to work at an external company, knowledge of DynamoDB is essential. Although it is officially categorized as NoSQL, it behaves like a key-value database and a wide-column database. It's used for quickly reading data when there's continuous data hitting. It’s easy to learn but fitting this database into business requirements is challenging. It includes partition key, hash key, and attributes.
   ![key value database](./images/key_value.png)

2. **Wide-Column Database** - Similar to Key Value databases, but with an added second dimension. For instance, DynamoDB includes partition key, hash key, and attributes, allowing multiple attributes for a single key. Popular databases in this paradigm are [Cassandra](https://cassandra.apache.org/_/index.html) and [Apache Hbase](https://hbase.apache.org/). Cassandra is particularly popular after MongoDB among NoSQL databases. Using MongoDB's Atlas cloud service is fine, but scaling an application or ensuring 99.99% uptime with the community edition can be challenging. Cassandra is best for such tasks.
   ![wide-column](./images/wide_column.png)

3. **Document Oriented Database** - When we think of Document Oriented Databases, we think of [MongoDB](https://www.mongodb.com/). Although we classify MongoDB as NoSQL, it doesn’t fit into any specific database type. It’s simply not SQL. There are many NoSQL databases, like Cassandra, DynamoDB, IndexedDB, Apache Hbase, Redis, MemCached. However, MongoDB can be categorized as Document Oriented Database. We will discuss this type in detail later. Other databases in this type include [Firebase](https://firebase.google.com/docs/firestore/).
   
4. **The Relational Database** - Traditionally, when we think of databases, we think of relational databases. These include [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), [Microsoft SQL](https://docs.microsoft.com/en-us/sql/), etc. These databases have tables, rows, and columns and use a common query language for querying data.
   
5. **Graph Database** - Discussed in [Lecture 15](../Lecture-15/README.md). If you haven't understood it well, please revisit Lecture 15.
   
6. **A Full Text Search Engine** - Also known as index databases, they are used for indexing data for search purposes. They use hashing algorithms or concepts like hash tables. When we index a product with multiple properties but search using specific properties like title, tags, category, or price, indexing helps quickly retrieve data with O(1) time complexity. Popular databases include [Algolia](https://www.algolia.com/) and [Elastic Search](https://www.elastic.co/elasticsearch/). Algolia is a next-gen search engine using Open AI3, capable of understanding search intent even if there's no exact match. Elastic Search is an older, industry-proven technology requiring exact text matches.
   
7. **Multi Model Database** - Includes [Fauna DB](https://fauna.com/), mainly used for transforming databases into GraphQL. It’s similar to programming languages but not very popular yet.

At the initial stage, we don't need to know much about these databases. It’s sufficient to know that such databases exist and are used for specific purposes. We will start by learning MongoDB. Later, as we become proficient developers and confident in using MongoDB for data modeling, aggregation, and transactions without any issues, we can explore other databases.

A question in this class was when to use Redis? We primarily use Redis for caching. For instance, if an online mobile store receives 100,000 requests for information on a new mobile, processing each request from the database is costly. Using Redis, we can cache the data in memory after the first request, setting a time limit of 24 hours for automatic data expiration. Subsequent requests within 24 hours will get the data from the cache, reducing database costs. For instance, if a product is ordered, it goes through several steps before displaying "Order Accepted" to the user. Using Redis, we can create an event queue, providing immediate feedback to the user while processing the remaining steps sequentially.

There's a debate between SQL and NoSQL. Among the paradigms, only Relational Databases are SQL, while the rest are NoSQL.

A question arises: why wasn't the term NoSQL heard before MongoDB? Because MongoDB coined the term.

There are misconceptions between SQL and NoSQL. Below are some common misconceptions:

1. Trying to apply SQL concepts in NoSQL, which is not possible due to different paradigms, making NoSQL seem bad.
2. Associating specific databases with certain technologies, like MySQL with PHP or MongoDB with Node.js, which is incorrect. Any database can fit with any language.
3. Believing transactions can't be handled in MongoDB.
4. Thinking joins can't be done in MongoDB. Though true, MongoDB offers advanced concepts like Aggregate and Lookup, surpassing table joining. MongoDB also excels in storing and querying time series data, providing easier services for complex scenarios like monitoring patient blood pressure every minute.


Now let's move on to our main discussion about MongoDB.

If you visit their website, you'll see it's more than just a database now. It has four products: Atlas, Enterprise Advanced, Community Edition, and Realm. We usually work with the Community Edition as it's free and can be installed on our machines. The Enterprise Advanced is similar to the Community Edition but offers extra support if you encounter any issues by paying them. Atlas is MongoDB's managed service, meaning you don’t have to handle hosting, managing, deploying, patching, or securing the database. Your job is just to create and manage the database, and the company takes care of the rest. Using Atlas, you get the latest MongoDB version, data management, scaling, security, backups, and updates all handled by them. This managed service requires payment. In the Community Edition, you have to manage everything yourself. Another product is Realm, MongoDB’s serverless technology. Serverless is the future. For example, if a user wants to delete their ID, you need to delete all their data before deleting the ID, which is complex and time-consuming. With Realm, you can write a function in MongoDB’s cloud function that triggers when a delete request comes in, deleting all related data. This eliminates the need for queues, events, and messages, reducing costs. Realm charges only when the function is triggered and executed. Realm also allows easy creation of GraphQL servers without writing any backend code, offering API creation to connect with web or mobile apps. It provides FAAS (Function As A Service) and BAAS (Backend As A Service) services, similar to Firebase but more advanced.

Using MongoDB for data handling means you don't have to worry about scaling. It’s designed to handle trillions of data points and quickly query data from such volumes.

MongoDB is a document database, ideal for handling random data that can't be fitted into a relational database model. Before MongoDB, data was processed by storing it in text files, then shaping it before use. MongoDB solves this problem by handling unshaped, random data efficiently. Document databases allow different data types within collections, providing flexibility for various data shapes.

Another reason for using MongoDB is joining. In SQL databases, data normalization involves breaking a table into multiple tables and joining them later, which can be resource-intensive. For example, to manage student information, we might create separate tables for names, phone numbers, education, and addresses. This normalization process simplifies data management but makes querying across multiple tables expensive. Here’s a visual representation:

![Data Duplication](./images/data-duplication.png)

As shown, names, emails, and passwords are duplicated. To avoid this, we can normalize the data by writing these attributes once and creating separate tables for the rest.

![dd](./images/Screenshot_2.png)

And for the differing attributes, we create separate tables. This process is called data normalization.

![dd](./images/Screenshot_1.png)

The problem arises when you need to join these tables to get complete information, which can be complex. This issue can be resolved using a simple JSON object as shown:

```json
{
    "ID": "12345",
    "name": "Alvi",
    "email": "alvi@gmail.com",
    "password": "1234",
    "educations": [
        {
            "1": 2,
            "2010": 2014,
            "HSC": "BSC",
            "College": "Dhaka University",
            "1__1": 1,
        },
        {
            "1": 3,
            "2010": 2016,
            "HSC": "MSC",
            "College": "BUET",
            "1__1": 1,
        },
    ],
}
```

No tables, columns, or rows. You can store any data in any format you like and as much as you want. For instance, if someone has no educational background, you can still store data for them without any issues.

In today's class, we tried to give a basic understanding of databases. Hopefully, all misconceptions about databases have been cleared up. There’s no need to argue over SQL vs. NoSQL. We will use whichever database fits our application's needs. None of them are bad; each is successful in fulfilling its purpose.

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)

```json
{
    "ID": "12345",
    "name": "Alvi",
    "email": "alvi@gmail.com",
    "password": "1234",
    "educations": [
        {
            "1": 2,
            "2010": 2014,
            "HSC": "BSC",
            "College": "Dhaka University",
            "1__1": 1
        },
        {
            "1": 3,
            "2010": 2016,
            "HSC": "MSC",
            "College": "BUET",
            "1__1": 1
        }
    ]
}
```

No tables, columns, or rows. You can store any data in any format you like and as much as you want. For instance, if someone has no educational background, you can still store data for them without any issues.

In today's class, we tried to give a basic understanding of databases. Hopefully, all misconceptions about databases have been cleared up. There’s no need to argue over SQL vs. NoSQL. We will use whichever database fits our application's needs. None of them are bad; each is successful in fulfilling its purpose.

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)


# Lecture 48.1 - Track Zone Project Breakdown | Component Tree and Clock Logic

## Introduction

When we start a project, our brain naturally starts thinking about the most difficult logic. For example, in this project, we all first thought about how to work with time zones, how to calculate time differences, and wasted time thinking about these. The rule is to first do proper planning. Decide what to do after what. Once planning is done, coding is not a big deal. But starting a project without planning is possible, but it can't be finished. In this lecture, we will break down our requirements base...

## Requirements

Let's list our requirements first. Our requirements are -

- User can set their own time and timezone, this clock can't be deleted only be edited
- User can create as many clocks as they want
- Each clock has its own title or name
- Own Timezone
- Simple Events with time
- Time difference between user's timezone and clock timezone in hours and minutes
- User can edit or delete a clock
- Timezone could be UTC (standard), GMT, PST, EST
- Only date-fns library is allowed for this project. The rest of the logic should be written by yourself
- Every data must be validated

These are our requirements.

## Questions

After getting any requirements, our job is to read through all the requirements. We have read through our requirements. The last point is about data validation, whether the client wants it or not, we will do it. Because in an application, data must be validated.

The next task is to prepare all kinds of questions. And get them clarified by the client. Let's prepare the questions for this requirement.

**Question 1** - How many users will be there in this application? Is there any need for login or registration?  
_Answer_ - The client said that there will be no login system in this application. And there will be no server or backend.

**Question 2** - Since there will be no server, where will we save the data?  
_Answer_ - The client told us that we can save data in local storage.

**Question 3** - User can set their own time and timezone, can we customize the time or only the timezone?  
_Answer_ - Time cannot be customized. Only the timezone can be selected to set the time.

**Question 4** - When the user first enters the application, what will they see? Will they see a default clock taken from our system? Or will they see an option to set the time?  
_Answer_ - It can be either. Whatever is easier for us will do.

Many more questions can arise. We will not start working until we get answers to the questions. No requirement in the world is complete. We have to clarify it through discussion. We will not start working until it is clear.

## Requirements Breakdown

- We will have a local clock and a list of clocks
- We will create the initial clock from the user's timezone
- Clock object will look like
  - id
  - title
  - timezone
    - type (UTC, GMT, PST, EST)
    - offset (Only for UTC and GMT)
  - events
- Event object will look like
  - id
  - text
  - clockId
  - timezone
  - startTime
  - endTime
- We will use a clock object for the local clock
- Use an array of clocks for other clocks
- We will use the event id to create events inside the clock

### Clock Features

- properties
- update clock
- delete clock
- calculate difference
- update events

### Event Features

- properties
- create event
- delete event
- update event
- filter event by clock
- get event by id
- get events by ids

## Create wireframe of UI

We will create a wireframe of the UI. For that, we can easily create it on [wireframe.cc](https://wireframe.cc/).

## Component Tree

### App Component

![app.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361105359/qYcHsXUfO.jpg)

### Reusable components

![shared.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361210554/Enxr__Lh3.jpg)

### UI Components

![ui.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361295889/xZp23vZgg.jpg)

### Clock Display Component

![clock-display.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361350686/NJGDn-2CR.jpg)

### Clock Form Component

![clock-form.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361406489/EmwuVPdmE.jpg)

### Clock Actions Component

![clock-actions.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361479586/i1H4iQ9XJ.jpg)

### Create Event Form Component

![create-event-form.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361528283/656X1EuAB.jpg)

## Hooks

![hooks.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361563559/jV4KNrNwN.jpg)

## Data Flow

![data-flow.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666361597873/57EMROBND.jpg)

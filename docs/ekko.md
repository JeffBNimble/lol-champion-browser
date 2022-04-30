# Ekko
![Ekko](http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Ekko.png)

The Ekko branch is where we start focusing on the UI (User Interface):

* Learn a bit about React
* Initialize the UI portion of our project
* Get the React sample application running

## What to do
When we're done with Ekko, you'll be able to point your browser to the React sample application
that we've generated and you'll have a basic, working knowledge of React. Our UI (for now) will run at
(http://localhost:3000). We'll change that later, but for now it's all about getting
things setup to build out the frontend.

If you decide after finishing this effort that you simply love UI development and working
mostly on the frontend, then you'll gain huge benefits by immersing yourself in React and 
learning all you can. React is by far the most popular UI framework being used
for frontend development and your personal development here is key.

If instead you prefer working on backend services, the choice is not as clear. We've
written the backend service in NodeJS, using Javascript and the ExpressJS framework.
We did this because it's simpler for now just to focus on Javascript. But, NodeJS and
Javascript are just one choice among many. You'll likely want and need to learn about other
choices for backend development, but we'll get to that at another time.

Before we get to work on the UI, I think it's important at this point for you
to take a bit of time to learn some basics about React. Take your time on this
piece because we're not in a race here. Learning and understanding is key.

### Learning a bit about React
I'll propose that you spend a bit of time just reading some introductory material
on React so that at least you know about what it is. First, visit the [React website](https://reactjs.org).
After reading the content on the initial page, you may find yourself even more confused.
That's fine, don't worry. The key piece of information on this initial page is actually
the title and subtitle: *React, A Javascript library for building user interfaces*.

Next, click the *Get Started* button on that page and read through this. Clicking
that button will take you to the [React Getting Started](https://reactjs.org/docs/getting-started.html) page.
Again, you'll likely be even more confused. Later on in this branch, we'll follow the
*Create a New React App* process. For now, let's just focus on learning a little bit
more before we start building our UI.

There's more reading here, so sit tight. Next, let's read the React [Guide to main concepts](https://reactjs.org/docs/hello-world.html).
This is a multi-page guide, so when you get to the end of each page, click the *Next article*
link at the bottom of the page and work through all of this.

The last chapter of this guide is called *Thinking in React*. You can read it when
you get there, but we'll re-read it after you take the tutorial, which we'll do
shortly.

Before we jump into the tutorial, I want you to read one more thing, which is
linked in the *Getting Started* guide. The article is called [An overview of React](https://taniarascia.com/getting-started-with-react).
This article is for React beginners and hopefully will start to clear up some
things in your head.

### React Tutorial
Now, it's time to kick the tires on React by doing something. I suggest you now
take the [React tutorial](https://reactjs.org/tutorial/tutorial.html). Before you
get started, there are two setup options, which you'll read about there. I highly
suggest that you take Setup Option 2, which has you writing code on your local
machine, much like we've already done for the backend service.

Note: Do this tutorial in another folder on your machine, not this one. When you
work through this, you'll kickstart the application using something called `create-react-app`.
We'll use this same approach when we kickstart our own UI for this project, so pay
close attention.

When you're done with all of this, you should understand some basic React
concepts and be in a good position to get started on our own UI.

### create-react-app
It's time to apply what you learned in the tutorial to create your first react app
by doing that here. So, navigate to the ui subfolder of this project by typing the following command
in the terminal.

`cd lol-champion-browser-ui`

Next, type the following command to kickstart our UI project:

`npx create-react-app lol-champion-browser-ui`

As you learned in the tutorial step, this takes a hot minute. When done, you'll
have scaffolding generated for our own UI and you can test it by typing `npm start`
and then visiting [http://localhost:3000] to see the initial React app running.

Congratulations! This was a bit of a long journey, but you should have a basic,
working knowledge of React now including how to create a new React app from scratch.


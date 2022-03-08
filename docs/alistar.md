# Alistar
![Alistar](http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Alistar.png)

The Alistar branch is where we get this party started. We setup the initial project structure including:

* Setting up package.json using ```npm init```
* Setting up our initial set of dependencies
* Setting up nodeman
* Setting up scaffolding for our service

## What to do
So, I've already mentioned that we're simply getting things setup for our project.

### Install/Update NodeJS
First, make sure you have NodeJS installed. If you have and haven't updated recently,
make sure you have a reasonably recent, if not the latest version installed. If you're not sure,
you can type ```node --version``` to see what version you're running. You can see
what the latest NodeJS version is by visiting [https://nodejs.org/en/](https://nodejs.org/en/).
Download and install the latest version if needed.

### Initialize your project
To do this, simply run ```npm init```. You can take defaults for most of the options,
but some need to be filled in. You can see what I've specified for the prompts by
checking out the generated [package.json](../package.json).

### Specify the Javascript module type
A Javascript module is essentially a .js file. Every .js file in your application is
technically a module. There are a number of Javascript module types which makes things
even more confusing. We will be using the ES6 module type for this project. If you
care, you can read up on Javascript modules at [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

Note that for NodeJS applications, we don't care about browser support since our code
will run as a Node app, not in the browser. That isn't true when we get to the UI, but we'll
worry about that part later.

So, open your package.json file in an editor and add ```"type": "module",```. This is
potentially super-confusing, but it means that we will be using ES6 modules in this project.
In summary, that means we will use ```import``` and ```export``` instead of ```require```.

### Add dependencies
Now, it's time to add your dependencies. Dependencies are a form of code written by others
that you can use. These are commonly referred to as libraries. At this stage, we will be adding
two libraries as dependencies. Each of these performs a certain task in your project and using libraries
saves us from having to write all of this code ourselves.

The first dependency is [ExpressJS](https://expressjs.com). This is an open-source library upon
which we will build our service. You can read all about it and you should.

To add express as a dependency, simply type ```npm install express --save```. After a few moments
when it completes, you can look at your package.json file and see that a new entry has been
added in the ```dependencies``` section for express.

```npm``` is something that gets installed as part of NodeJS and stands for ```Node Package Manager```. 
Technically speaking, ExpressJS and Nodemon are both packages and we'll use ```npm``` to install them. 

Next, we'll add Nodemon. Nodemon (short for Node monitor) is a very simple library that you
setup to start your application during development. It will load your application as part
of startup and watch every file that it loads. That means that while your service is running,
if you make any changes to any of the files in your application, nodemon will detect that
and stop and restart the service automagically. This is a common way of developing. You'll
run your service and test it and you'll decide to add something or fix something and doing so
will cause your service to stop and restart so that you can instantly see your changes. This saves
you from having to manually stop it and then restart it, saving you tons of time.

Type ```npm install nodemon --save``` and you guessed it, after a couple of seconds, you'll
see that npm installed the library and added it your package.json file.

### Create the run script
Another feature of the package.json file is the scripts section. Check mine out, but you will
add a ```run``` script, which simply tells node to start and find the index.js file in the current
directory. Open your package.json file and add ```"run": "node .",``` to the scripts section.

If you find that line of code confusing, ```node``` is what you installed when you installed NodeJS.
It's a command line program that you can run from your terminal. Simply type ```node --version``` and
NodeJS will spit out the version that is running. The ```.``` is a shorthand for the current directory
and that means start NodeJS and search the current directory for a Javascript module to load. Node
automatically searches for a file called ```index.js``` unless you override the name when you 
execute node. ```node .``` is the same as you typing ```node ./index.js``` . But, you can
shortcut that by just typing ```.```.

You can see what else node can do by typing ```node --help```. When you do this, NodeJS will
spit out the command-line options you can pass to node.

### Create the scaffolding to create and start the service
If you check out my [index.js](./index.js), you'll see that it uses nodemon to load and
execute the ```dev.js``` module. Check out [dev.js](./dev.js) and you'll see that it loads
the module in [./src/index.js](./src/index.js), which is a module that declares and exports
the ```startServer``` function. I've put all sorts of comments in the code. Be sure and read
through that to understand what is going on in the code.

### Run the service
Once you've duplicated my code, you have a runnable ExpressJS service that you can start. It doesn't
currently do anything yet, but it will start and log messages to the console. Type ```npm start``` to
run your ```start``` script that I had you add earlier and that will start your application.

While it's running, open a browser and type ```http://localhost:8080```. You should get some sort
of message in the browser telling you that it can't execute GET. That simply means the browser sent
an HTTP GET request to the host named ```localhost``` to port ```8080``` and the message
you see was returned by your application and the browser displayed it. That's all fine, we 
haven't written any code to tell our service to do anything yet, so it's just sitting there
listening on port 8080, but when a request comes in on port 8080, it hasn't been told that it
can do anything yet. So the ExpressJS library is handling the request, but it can't find anything
to do, so it returns an error message to the browser who sent the request.

To shut the service down, simply press ```CTRL C``` (hold down the CTRL key and tap C).

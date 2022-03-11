# Blitzcrank
![Blitzcrank](http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Blitzcrank.png)

The Blitzcrank branch is where we start giving our service some purpose including:

* Designing our API (application programming interface)
* Defining some ExpressJS routes
* Define an application-level middleware function to calculate how much time it takes to handle every request
* Stubbing out the base routes for each API section

## What to do
In this branch, we're going to start working on the API. Though, we're initially only
going to work with champions and getting a list of all champions, we're going to also
start designing our API for items and spells. While this whole effort won't actually
do anything with items and spells, I added it, so you could do this on your own to help
reinforce what you've learned.

This application is a read-only application. It doesn't send any data back to the service to
be stored. So, the API provided by this service is entirely HTTP GET's.

### API's
So, we are going to initially design 3 distinct sets of API's. As previously specified,
every single API is an HTTP GET, so that makes things quite simple. These API's are:

* Champions API: Fetch a list of champion information to be used to display a grid and also fetch champion details when displaying a specific champion 
* Items API: Fetch a list of item information to be used to display a grid and also fetch item details when displaying a specific item
* Spells API: Fetch a list of spell information to be used to display a grid and also fetch spell details when displaying a specific spell

As I said, we aren't actually going to fully implement the items or spells API's, but it's there for
you to finish on your own if you'd like.

So, a couple of things about API's. It's generally good practice to make the path to your API consistent.
We already know that we can reach our service from the browser using http://localhost:8080. But, I've decided
that my API routes will be reachable at:

* /api/v1/champions
* /api/v1/items
* /api/v1/spells

These paths make it clear what you're consuming. The ```/api``` means you're consuming the service's api.
The next path segment ```/v1``` is a shortcut for ```version 1```. Good API design introduces versioning.
As your application matures, you may decide to make changes to your API, but you never want to break existing
clients. So, if you introduce anything into your API after you have other applications using your API, you don't
want them to break when you change your API. Versioning to the rescue. If you're changing anything that will
break existing applications, leave ```v1``` alone and create a new version ```v2``` for the new API. That way
other applications that use your API can move to ```v2``` if they want, but nothing will break if they
decide to stay on ```v1```.

For that reason, I'm using ```/v1``` as the next path segment. This means that the final path segment
I have decided to use are all ```v1``` API's. Consequently, my 3 API areas are champions, items and spells, so
the API paths will obviously be ```/api/v1/champions```, ```/api/v1/items``` and ```/api/v1/spells```.

These API's in ExpressJS are known as routes. So, when you type a URL into a browser, it consists of the following parts:

* protocol: This is typically either http: or https:
* hostname: This is a name which resolves to a single machine somewhere on the Internet. localhost is the hostname of your own machine.
* port (optional): A port (kind of like a channel), which is a number between 1 and 65,535
* resource: This is one of many names for the path or route

So, the full URL to the champions API endpoint for our service is ```http://localhost:8080/api/v1/champions```.

The full URL to the items API endpoint for our service is ```http://localhost:8080/api/v1/items```. Can you guess
what the full URL to the spells API endpoint is?

If you were to type the champions endpoint into the browser, knowing that it's an API endpoint, what
might you expect to get back in response? I'll give you the answer. I would expect a list of champions with
some amount of information about each champion. I would not expect this to be a web page with pretty pictures
and colors, but instead data about champions. In the world of software engineering, services more often than not
return data in a from called JSON (JavaScript Object Notation). It's a human-readable data format
that is also easy for applications to parse.

What might an API URL look like if I wanted more details on a specific champion, like Alistar or Blitzcrank?
How about ```http://localhost:8080/api/v1/champions/alistar``` or ```http://localhost:8080/api/v1/champions/blitzcrank```.

For now, now I've only registered the base routes for each API and I've stubbed out the route
handlers to simply return an empty array. If you type in the same code I've written here and then
visit any of the API's that have routes registered, then you'll see an empty array in response in
the browser.

Check out everything I've written in the [routes folders](/src/routes). There are several .js
files and folders here that correspond to the structure of the API routes.

When you register a route in ExpressJS, you must setup a route handler for that route. What that
means is that you must provide a function that will get invoked when a caller requests that route.
When Express matches a requested route to a registered route, it invokes its configured route
handler function. Route handler functions accept up to 3 parameters:

* request: An object that contains a bunch of data and functions about the request made from the caller
* response: An object that contains a bunch of data and functions about the response you are returning to the caller
* next: If you're setting up middleware, next is the next handler function to be called

By convention, I name my route handlers using a prefix of ```handle```. The next word in the function
is the HTTP method (GET in all routes in this application) and then one or more additional words
that are descriptive of what the handler function is doing or dealing with.

So, ```handleGetChampions``` handles an HTTP GET request for champions. ```handleGetItems``` hanndles
an HTTP GET request for items.  Route handlers are responsible for implementing the code necessary
to handle the request. That generally involves going and getting something or storing something or
both and then returning an HTTP response to the caller.

What do you think the route handler ```handleGetChampions``` would do? If you guessed, fetch
all the champion data from the Riot Games API and return a subset of that data about each
champion back to the caller. You could just return the whole gigantic mass of data, but
our app doesn't need all of that. We're simply displaying a list of champion images with
their name on a web page, so we need a minimal amount of data about each champion.

We'll actually do that in an upcoming step, not in this branch. For now, we just return
an empty list for everything.
# Corki
![Corki](http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Corki.png)

The Corki branch is where we start fleshing out our application and make it do something real:

* Implement a quick & dirty version of the /champions route handler
* Add another simple dependency we'll use to fetch data from a remote service (Riot API)
* Fetch some data from the Riot API

## What to do
When we're done with Corki, you'll be able to visit your API (http://localhost:8080/api/v1/champions)
and get a real list of champions back. Your route handler will implement some logic to
go fetch the champion data from Riot API, specifically something Riot calls Data Dragon. So
buckle up, here we go.

## fetch
The fetch API is something you'll need to get used to. Javascript in the browser has this useful
component called ```fetch```. It's used to make HTTP requests within your application. Unfortunately,
NodeJS applications can't as easily use fetch, that's because NodeJS doesn't come with fetch...at least
yet. At the time of this writing, NodeJS comes as an experimental feature in V17.x of Node and the latest
stable version of Node (and the one I have installed) is v16.x. So, no fetch for you, except that we can.
Someone created an implementation of fetch that we can ```npm install```. Until NodeJS comes
with fetch, we have to use a depeendency.

So, run ```npm install node-fetch --save``` and you'll get it and be able to use it. Unfortunately, to 
use it in our code, we'll have to add a typical ```import fetch from 'node-fetch'```. When fetch
comes standard with NodeJS, we won't have to do that.

We're going to use ```fetch``` to ... you guessed it, fetch data from the Riot API. There is
a part of the Riot API known as Data Dragon. Data Dragon is highly available and actually used
by the LoL game itself when displaying champion data.

## Data Dragon
Before we work on fetching the data, it's important to understand a little bit more about Data Dragon
and League of Legends (LoL). LoL is updated frequently (biweekly). The game is ever-changing. There are
often new champions, new skins, new items, changes in the effects items have on your champions when playing,
etc. Therefore, everytime Riot Games releases and update, Data Dragon is also updated. Each update is
identified by a version number.

At the time of this writing, the latest version of Data Dragon is 12.5.1, which corresponds to the version
of the patch update for LoL. You can (and should) read all about Data Dragon [here](https://developer.riotgames.com/docs/lol).
Scroll down until you see the ```Data Dragon``` section and read it. In this branch, we're only going to
be working with Champions and champion assets (images) and not Items or Spells, though I highly encourage
you to try and implement code to fetch Items and Spells for your /items and /spells routes.

If you've read about Data Dragon like I suggested, you'll notice Data Dragon is version-specific. URL's
to some assets including champion data include the version. For example, the URL to fetch
champion data includes the version ```http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json```.
So you don't want to have to hardcode the version number into your application because you'll have to
update your source code, compile it and deploy it every single time Riot releases a new patch,
which I've already said is biweekly.

Further, Riot deploys patches at specific intervals depending upon the region. For example,
North America (na region) is deployed at a different time than say China, meaning the Data Dragon
version is often different depending upon which region we are talking about. So, when we work with
Data Dragon, we also need to be aware of region. For this app, we're going to make it simple
and just say we're always going to work with the na region. Further, each region typically relates
to a locale (or language). For example, content for the na region uses the en_US locale, which
is a locale identifier for English. If you were working with another region like Japan, the content
for that region would need to use the Japanese locale (jp_JP). When you fetch champion data (or items or spells),
the data contains textual descriptions of things and the language is important.

If we were building a fully-featured champion browser that allowed you to view content from
any region in that region's locale, we'd go about this a bit differently, but we aren't. We're just
going to use the na region, which implies the en_US locale.

Fortunately, Data Dragon makes this easy. First, we'll need to fetch the Data Dragon region data
for na. Per the Data Dragon documentation, this is the URL to fetch na data 
[https://ddragon.leagueoflegends.com/realms/na.json](). If you click on that link, you'll notice
the browser displays what initially might appear as giberish. Don't worry, there is structure to this.
This is actually a JSON file. You should spend a few moments and read up on JSON. Understanding it
is key as a software engineer. I'll be here when you get back, so go read about JSON.

This Data Dragon region file uses a lot of one-letter property names. The ```n``` property
contains another object with a bunch of properties like ```item```, ```rune``` and ```champion```.
This tells you what patch version to use to fetch item, rune or champion data. All the versions
are typically the same, but they don't have to be.

The ```l``` property tells you what locale this region uses or ```en_US``` in this case.

The last thing to note in this content is the ```cdn``` property. It contains a base URL
that you will use to fetch any of the things you want from Data Dragon. ```cdn``` stands for
```Content Delivery Network```. You can go read about that if you want, but it's not that
important to this particular discussion. The important thing is that you understand that you
will need specific things from this when you go to fetch champion or item or spell data. We'll
need to piece together specific URL's using the ```cdn``` base URL, the champion version 
(or item or spell or whatever) and possible even the locale. Keep this in mind.

### Fetching champion data
In order to fetch champion data, you'll notice from the documentation that the champion data
is available here [http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json]().
If you click on that, you'll likely notice that's a bunch of data about champions. You'll
also likely notice that the textual descriptions are in English.

So, let's break down that URL. You should now notice that the base URL itself comes from
the region file ```https://ddragon.leagueoflegends.com/cdn```. The next part of the URL
is the version. Well, that too comes from the region file ```12.5.1```. The next path
segment is ```/data``` and that is a hardcoded value. Next is the locale ```en_US``` and
that too comes from the region file. The last segment of the URL is ```champion.json```
which is also hardcoded. So we have:

<cdn>/<champion version>/data/<locale>/champion.json

We will need to assemble this URL in our code based upon data we fetch from the region file.

So, here is what our code will need to do:

1. Fetch the Data Dragon region data for the ```na``` region
2. Parse it into object form, so we can easily look up properties
3. Use the data to assemble the URL we'll use to fetch champion data
4. Parse the champion data into object form

Once we fetch all of this, we're going to cache it in memory in our service. Since this
data doesn't change very often (biweekly), we don't want to go fetch it every single time
someone wants to view champions. When you work with data that doesn't change frequently,
implementing a strategy that is efficient is better. Fetching things is expensive (time-wise),
so there is no real need to go fetch it every single time, plus it will cause every single
request from the browser to take longer because our application would have to turn around
and follow the steps above every single time. If we have thousands of users viewing our
champion browser, we'd be fetching this data thousands and thousands of times.

For now, we're just going to fetch it once and cache it in our service. In an upcoming
branch, we'll implement some code to periodically go check to see if a new Data Dragon
version has been published and if so, we'll refresh our cached data. To simplify, we won't
do that just yet.

So how and when to do we go fetch this data. We have two options I can think of. The first
option is to go fetch all the data when the application starts. So, maybe right after we
register the routes, we'll go fetch all the data. The second option is to fetch it only
when we need it. This is often called lazily. That means fetch it when it's requested if
we don't already have it.

This lazy fetch approach is what I'm going to opt for, but technically you could do it either
way. So, this means I can create middleware on our /champions route to 
check to see if we need to go fetch. If we have not fetched, and we're handling the first
request against our /champions route, go fetch the data and cache it before letting the route
handler complete. This is exactly one use of middleware. Then, when the /champions route
handler actually runs, we can make an assumption that the data has already been fetched.
I'm going to choose not to use middleware here just to keep things simple. It's still a 
lazy approach meaning champion data from Data Dragon won't get loaded/cached until it's
first requested. The first visitor to our champion browser will pay the extra cost of
having to go fetch the data from Data Dragon, but since we're caching it in our application,
nobody else will have to pay that cost.

## API clients
The concept of an API client is something that is very important to understand. This concept
is relative to perspective. If you are in the browser, you're making a request against our
application (service). If the browser is sending HTTP requests to our service, then it must
use the API that our service publishes. From the perspective of the browser, the browser
is an API client of our service.

Now, when we are in our service, the service makes HTTP requests against Data Dragon. The
browser doesn't. So, our service is an API client of Data Dragon. The browser is NOT an
API client of Data Dragon. The browser doesn't directly communicate with Data Dragon. It could,
since Data Dragon is a public API. But it doesn't.

When we are writing code and using an API to make HTTP requests (GET's, POST's, etc), that
code is an API client of the target of that operation. So, think of it in those terms.

Consequently, it makes sense to keep all code related to making HTTP requests against Data Dragon
in one place. If our application made requests of multiple services, it would be potentially
confusing to group all of that together.

So, I've made an api_clients folder to contain Javascript modules for API clients. Each
API client module will contain code relating to the requests made against a specific target.
It should then be obvious why I have a Javascript module called 
[dataDragon.js](/lol-champion-browser-service/src/api_clients/dataDragon.js) inside the [api_clients](/src/api_clients) folder.

This Javascript module will export functions that allow us to make requests against the
Data Dragon API. For this app, we only have one API client. For most other apps, you'll
have one for each service that your service communicates with.

### The Data Dragon API Client
As previously mentioned, I've written an [API client](/lol-champion-browser-service/src/api_clients/dataDragon.js) for Data Dragon. It exports a single
function for gettingChampionData(). Study this code. It's responsible for conditionally
fetching, parsing and storing (caching) the data it fetches from Data Dragon. It's well commented,
so you should learn from reading it.

Notice the use of async and await. This is (yet) another topic that is important for you
to understand. Go spend some time now and read up on it. It involves the use of Promises,
something you also need to understand. The use of fetch is async. Any function that calls
another async function must itself be async. Async means it happens asynchronously, in
the background and your code doesn't wait for it to complete. When you use await, it kind of
does.

So there is code in the Data Dragon API client that uses async/await and it must because
fetch is async.

## Champion Routes
Before, we just returned an empty array from our base /champions route handler. Well, we
now have the ability to return real data. So, checkout the [championRoutes.js](/lol-champion-browser-service/src/routes/v1/champions/championsRoutes.js)
module and you'll see I replaced the return of the empty array with a call to the
Data Dragon API client to getChampionData(). Remember that this is async, because fetch
is async, so we have to use await when we call it. The first caller of this function will
pay the cost of fetching it from Data Dragon. You can see how long it takes because
of my previously created middleware which calculates and logs how much time each request
takes. Mine shows about 32ms (milliseconds) to go fetch from Data Dragon. If you hit
refresh on your browser, you'll notice subsequent requests take around 1ms, so caching
improves overall performance significantly (it's 32 times faster).

Notice that I also registered a new route ```/champions/:champion```. This route allows
a requestor to request data for a specific champion. Read the comments in the handler
for this because there is another technique here where I'm using a route parameter. This 
is helpful because this route handler will be called for all requests for a specific champion.
Without this helpful ExpressJS feature, I'd have to register individual routes for every
single champion ```/champions/Aatrox```, ```/champions/Corki```, you get the idea. Using
a route parameter (and I can use as many as I need in a specific route), I can define
one single route handler to handle many requests. Remember, there are over 150
different champions, and I can define one route handler for them all.

## If you're feeling energetic
It's time for you to exercise your newfound knowledge. Read the Data Dragon documentation
about items and spells and see if you can implement Data Dragon API Client code to fetch, parse
and cache each of those and then fill out the route handlers for both. If you end up getting
all of this to work, you're well on your way. Through our service, we should allow our API
clients to request all or one champion(s), all or one item(s) or all or one spell(s). Good luck!


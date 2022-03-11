# Draven
![Draven](http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Draven.png)

The Draven branch is where we try to make the data return from one of our API's actually usable:

* Derive some champion data attributes that we will need from our /champions and /champions/:champion responses
* Transform our /champion and /champion/:champion JSON responses into something usable

## What to do
When we're done with Draven, you'll be able to visit your API (http://localhost:8080/api/v1/champions and
http://localhost:8080/api/v1/champions/<champion>)
and get a real list of champions back. Wait, can't we already do that? Yes, we can but the API
response contains a mirror copy of what we get back from Data Dragon, plus there are some things
missing. Some of what is missing will be added in another branch, but there are some really
simple things we need to do to make the API responses actually usable.

It's helpful to think about what our API is actually going to be used for. Sometimes, when
you create services with API's, you're not quite sure what your API clients are going to do
with the data, so it's best just to return pretty much everything you have (which is what we're
doing currently). But in our case, we know what our API client is going to be.

It's initially going to be a simple LoL Champion Browser application that runs in the browser. So, it will
be an HTML, Javascript, CSS application that allows a user to scroll through a list of
champion images, do some simple filtering for champion types (i.e. tank, mage, assassin, etc),
see the champion name, title and maybe the blurb (all of this is data you find in the Data Dragon response).

But, we have access to all of these available images, so we want our application to be image-heavy.
We'll also probably want to allow our users to click on a champion image and then see all
the beautiful champion skins for that champion. Note: Our API currently doesn't have any
skin information yet available. We'll deal with that in an upcoming branch.

So just thinking forward, if you look up at that square image of Draven on this page, our
Champion Browser will display a grid of champion square images just like this. Underneath
each might be the champion's name and title. We might also consider somehow displaying the
champion tags (i.e. tank, mage, etc.) The first page is just going to be a page full of
champion images with their name, title, maybe the blurb and their tags.

So, let's tailor our API response to provide the Champion Browser application (which hasn't yet been built)
only the data it needs, so that it's very simple to work with. After all, that's the purpose
of our API.

## Working with JSON
You're probably starting to figure out that JSON is heavily used when you're a software
developer. You've probably also noticed that in its unformatted state displayed in the browser
when you request it directly from one of our API's, it's really, really hard to read. JSON
is intended to also be human-readable, so let's help solve that. There is a tool (extension)
that you can install into your browser and when it encounters JSON content, it will parse it
and format it so that it's easily readable.

If you use Chrome, you can install extensions. Of course be careful when doing this because
extensions have access to what you're browsing. There are many JSON formatter extensions available,
so I tend to just pick the one that has the most and highest ratings. At the time of this
writing, it seems to be this one: [https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa/]().
Just click the ```Add to Chrome``` button and now when you view JSON content in your browser,
which you'll do when you are testing our API, you'll see how much easier the data is to read.

## Champion images
If you look through the champion data we get back from Data Dragon, you'll notice and ```image```
property for each champion. If you read the Data Dragon documentation, you'll notice that there
are lots of images available for each champion. There is the square image (like the one I'm  using above
for Draven), skin-specific loading screen images and skin-specific splash images. There are so many beautiful
images available, but the champion data doesn't really provide specific URL's to the images. Well,
we have to derive them.

Since I've already said we will probably just use the square champion images on the Champion
Browser UI initial page, we need to derive the full URL to each champion's square image and
add a property to the Data Dragon response that we store/cache in our service. The other images
are all skin-specific, and we'll deal with skins and skin images later.

### Deriving the full URL to the square champion image
Checkout the change I made to the [Data Dragon API Client](/src/api_clients/dataDragon.js)
to derive the square image URL using other properties available in the champion data from
Data Dragon.  I have added a new property to each champion in the cached data.

You'll notice that I iterate (or loop) over each champion and derive and set this new
property for each after I've fetched the data from Data Dragon.

You might be asking why I'm deriving this new property and setting it on each champion?
Again, the front end UI application (whenever we write it) will need the full image URL.
It is the job of the API to provide everything the front end needs to "do its job". We
don't want to require the front end to derive the URL's. We can calculate them in the
service and provide full URL's to the front end API client. Make sense?

### Champion names and id's
Now that you can easily view JSON, take a look at the data for a champion like Kai'Sa. Kai'Sa
is weird. She has punctuation in her name. Typically when we're dealing with software, keys
to things or variable names or function names or class names or file names or property names
(get the idea yet?) can't contain punctuation.

You'll notice the property name for Kai'Sa in the champion data JSON blob is ```Kaisa```, not
```Kai'Sa```. You'll also notice that there is an ```id``` property without the punctuation and
the data also contains a ```name``` property with the punctuation.

All of this matters. In Kai'Sa's case, if we use our ```http://localhost:8080/api/v1/champions/Kai'Sa```
endpoint to fetch details about her, you'll get a 404. Why? That's because Kai'Sa's entry in
the JSON blob is keyed by her ```id```, not her ```name```. In most cases, the champion name and id
are identical, but that's why there are separate properties.

To make this perfectly clear in the code, I've renamed any reference from championName to
championID, unless I specifically want the name.

This matters because when I derive the square image URL, I use the ```id```, not the ```name```.

## Really learning a programming language
You may have noticed so far that I used some techniques to iterate through champions. I
used Array.forEach with an anonymous function (also often referred to as a lambda or even
a closure). Can it get more confusing?

How did I know about forEach and use it instead of the traditional for loop. Well, it's all
about learning the languages you use. In the era of object-oriented languages, what is possible
is dictated by the type of the thing you're dealing with.

In the code I'm referring to, I was dealing with an Array. An Array is a specific Javascript
type and Arrays are objects and have functions and often properties associated with them. You
can read all about Javascript Arrays [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
But Array is just one of many types built into the Javascript language. Every language is this way.
Your ability as a software developer expands as your knowledge of the language(s) expand.

Not only must you learn how to figure out what to do, but also how to do it. Often, there
are several ways to do the same thing.

If you need a refresher or just want to learn more about Javascript, check [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
out.

## Transforming the champion data into something more usable
When you look at the Data Dragon champions data, you'll notice there is quite a bit of data
for each champion. For our specific API Client (the champion browser UI which we haven't yet built),
we don't need all that. We can trim down the data we get back to pretty much just exactly
what we will need.

The champions and champion route handlers were altered to "transform" the response into
something more meaningful. The transformation process takes the full Data Dragon champion
with all of its data and trims it down into an object that contains just a few properties
that we will use to render the list of champions in the UI.

See the [Champion Route Handlers](/src/routes/v1/champions/championsRoutes.js) to see
the changes. You may notice that I used some potentially confusing code to accomplish this.
I also put in some code comments to show you the more traditional way of doing the same thing.
I also included some links for you to go read and learn about these new concepts.

Go to the browser, and check the /champions response, and you'll see that each champion
contains fewer data than is available in Data Dragon. Check a specific champion, and
you'll notice the same thing.

As previously mentioned, there is even more data available from Data Dragon for each champion
including skins information. But we will deal with that later. For now, we have a useful
champions API that we can use to start building our UI.

## Items and/or Spells
If you're feeling confident, feel free to do something similar with the items and/or spells
routes.


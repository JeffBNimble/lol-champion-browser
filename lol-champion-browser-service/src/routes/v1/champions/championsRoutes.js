import express from 'express'
import { getChampionData } from '../../../api_clients/dataDragon.js'

// This function provides a standard ExpressJS route setup. It's name implies
// what it does. However, in this case we're creating a Router. This router
// is referred to as a mini-app because the router configures all of the routes
// for a whole set of API routes, specifically the /champions routes. For now,
// we only have one route, which is the base (/) route. We'll add more later.
function registerChampionsRoutes() {
  // Here we create a new Router, which we'll use to configure all of our
  // routes in this API "module" called champions.
  const router = express.Router()

  // This sets up a handler for the base /champions route. Since, we're using
  // router.get, this means that we are setting up an HTTP GET route handler
  // for the base path. The full path to this route is relative to who called
  // the registerChampionRoutes function. In this case, it's /api/v1/champions.
  // The effect of this is that when an HTTP GET request comes in for the
  // /api/v1/champions route, it will execute the handleGetChampions function.
  router.get('/', handleGetChampions)

  // Let's setup another handlere for a route to return champion data for
  // a specific champion using a /champions/:champion route. We haven't yet created
  // this type of route yet. It contains a route parameter that gets filled in with
  // the id of the champion that was requested so that we can use it in our route
  // handler
  router.get('/:champion', handleGetChampion)

  // Return the router for this API module so the caller can use it to register
  // its routes with the application.
  return router
}

// This is the handleGetChampions route handler, which will get called by
// the router when an HTTP GET request comes in against the configured path;
// /api/v1/champions in this case.
async function handleGetChampions(request, response) {
  // For now, just return an empty array in JSON format. We'll change
  // this function later to actually do something meaningful.
  // response.json([])

  // Use the DataDragon API client to fetch and return the champion data
  // For now, we'll just return the giant mass of data. We don't need all that
  // when we build our front end app, so we'll address that part later. For now,
  // just return everything.
  const championData = await getChampionData()

  // This function is used to transform the mass of champions data into a subset
  // of this because this particular API doesn't need to return all of the data
  // from Data Dragon.
  const transformed = transformChampions(Object.values(championData.data))

  response.json(transformed)
}

// This is the handleGetChampion route handler, which will get called by
// the router when an HTTP GET request comes in against the configured path;
// /api/v1/champions/:champion in this case, where :champion is some champion
// name. The actual name is available the request property called params.
async function handleGetChampion(request, response) {
  // Since the route this is handling has a route parameter (:champion), let's
  // get that out
  const championID = request.params.champion

  // Note that the champion data from Data Dragon has properties for the champion
  // id in a specific case where the capitalization matters. If a request
  // is made to this route which differs in case, this code won't find the champion.
  // We'll address this later so that if a requestor asks for /champions/aatrox or
  // /champions/Aatrox, it won't matter. For now, the champion id must match
  // the exact case of the data.
  const championData = await getChampionData()

  // Individual champion data is underneath the "data" property in the Data Dragon
  // response, so look it up there. If not found, we want to return an error
  // to the requestor. HTTP status code 404, means Not Found, so we want to return
  // a 404 error if we can't find the requested champion
  const champion = championData.data[championID]
  if (!champion) {
    response.status(404).send({error: `champion ${championID} not found`})
  } else {
    response.json(transformChampion(champion))
  }
  
}

// This function transforms the mass of data from Data Dragon into only
// what is needed for these API routes.
function transformChampions(champions) {
  // Here I use  the Array.reduce function, which is somewhat difficult to understand.
  // You can read about it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  return champions.reduce((transformed, champion) => {
    transformed.push(transformChampion(champion))
    return transformed
  }, [])

  // Here is the traditional way of doing the same thing
  //let transformed = []
  //for (let i = 0; i < champions.length; i++) {
  //  transformed.push(transformChampion(champions[i]))
  //}
  //return transformed
}

// This function transforms a single champion by taking the giant mass of champion data
// and trimming it down to only what we need in this API, thereby greatly simplifying
// what the API clients get back in response.
function transformChampion(champion) {
  // This is called object destructuring. You can read about it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // Notice that I'm using the squareImageURL, which is what we derived and set in the Data Dragon API Client.
  const { id, name, title, blurb, tags, squareImageURL, loadingImageURL } = champion

  // These lines are the traditional equivalent of the single line above
  // const id = champion.id
  // const name = champion.name
  // const title = champion.title
  // const blurb = champion.blurb
  // const tags = champion.tags
  // const squareImageURL = champion.squareImageURL
  // const loadingImageURL = champion.loadingImageURL

  // This line simply creates a new object with the properties that got destructured
  // from the statement above. This object contains only a subset of all the available
  // properties. This is the ECMAScript 2015 shorthand way of creating an object.
  // Read more about that here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  return { id, name, title, blurb, tags, squareImageURL, loadingImageURL }
  
  // These lines are the traditional equivalent of the line above
  // return {
  //   id: id,
  //   name: name,
  //   title: title,
  //   blurb: blurb,
  //   tags: tags,
  //   squareImageURL: squareImageURL
  //   loadingImageURL: loadingImageURL
  // }
}

export { registerChampionsRoutes }
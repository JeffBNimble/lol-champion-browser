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
  // the name of the champion that was requested so that we can use it in our route
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
  response.json(championData)
}

// This is the handleGetChampion route handler, which will get called by
// the router when an HTTP GET request comes in against the configured path;
// /api/v1/champions/:champion in this case, where :champion is some champion
// name. The actual name is available the request property called params.
async function handleGetChampion(request, response) {
  // Since the route this is handling has a route parameter (:champion), let's
  // get that out
  const championName = request.params.champion

  // Note that the champion data from Data Dragon has properties for the champion
  // name in a specific case where the capitalization matters. If a request
  // is made to this route which differs in case, this code won't find the champion.
  // We'll address this later so that if a requestor asks for /champions/aatrox or
  // /champions/Aatrox, it won't matter. For now, the champion name must match
  // the exact case of the data.
  const championData = await getChampionData()

  // Individual champion data is underneath the "data" property in the Data Dragon
  // response, so look it up there. If not found, we want to return an error
  // to the requestor. HTTP status code 404, means Not Found, so we want to return
  // a 404 error if we can't find the requested champion
  const champion = championData.data[championName]
  if (!champion) {
    response.status(404).send({error: `champion ${championName} not found`})
  } else {
    response.json(champion)
  }
  
}

export { registerChampionsRoutes }
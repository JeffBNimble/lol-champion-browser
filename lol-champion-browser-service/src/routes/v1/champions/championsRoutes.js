import express from 'express'

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

  // Return the router for this API module so the caller can use it to register
  // its routes with the application.
  return router
}

// This is the handleGetChampions route handler, which will get called by
// the router when an HTTP GET request comes in against the configured path;
// /api/v1/champions in this case.
function handleGetChampions(request, response) {
  // For now, just return an empty array in JSON format. We'll change
  // this function later to actually do something meaningful.
  response.json([])
}

export { registerChampionsRoutes }
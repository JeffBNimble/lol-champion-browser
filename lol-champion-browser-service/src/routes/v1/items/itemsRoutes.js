import express from 'express'

// See the /src/routes/v1/champions/championsRoutes.js file for an explanation. This is a similar
// Router setup for the /api/v1/items API module. We aren't actually going to
// finish this section out as part of the initial application, but you can
// feel free to do this on your own to get more practice.
function registerItemsRoutes() {
  const router = express.Router()
  router.get('/', handleGetItems)
  return router
}

function handleGetItems(request, response) {
  response.json([])
}

export { registerItemsRoutes }
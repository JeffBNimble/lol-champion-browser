import express from 'express'

// See the /src/routes/v1/champions/championsRoutes.js file for an explanation. This is a similar
// Router setup for the /api/v1/spells API module. We aren't actually going to
// finish this section out as part of the initial application, but you can
// feel free to do this on your own to get more practice.
function registerSpellsRoutes() {
  const router = express.Router()
  router.get('/', handleGetSpells)
  return router
}

function handleGetSpells(request, response) {
  response.json([])
}

export { registerSpellsRoutes }
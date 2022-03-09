import { registerChampionsRoutes } from './champions/championsRoutes.js'
import { registerItemsRoutes } from './items/itemsRoutes.js'
import { registerSpellsRoutes } from './spells/spellsRoutes.js'

// This function calls 3 different imported functions to register 3 different
// API module routes; champions, items and spells. In the end, our API will
// have 3 main sections, each API module providing its own sets of routes.
// We will have:
// * /api/v1/champions routes
// * /api/v1/items routes
// * /api/v1/spells routes
function registerV1Routes(app, path) {
  app.use(`${path}/champions`, registerChampionsRoutes())
  app.use(`${path}/items`, registerItemsRoutes())
  app.use(`${path}/spells`, registerSpellsRoutes())
}

export { registerV1Routes }
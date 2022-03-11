import { registerV1Routes } from './v1/v1Routes.js'

// This function registers routes for all v1 (version 1) routes. It's good practice
// to version your routes just in case things change in the future. If they do change,
// you can simply create a new version (i.e. v2 or v3).
function registerApiRoutes(app, path) {
  // This is an example of setting up middleware. Middleware is generally defined as
  // something that gets executed in the middle of a request coming in and it being
  // executed. Notice that it gets setup first, before any other routes are setup.
  // Since we're using app.use, this is considered application-level middleware.
  // See the comments below for the calculateResponseTimeMiddleware function to see what it does.
  app.use(calculateResponseTimeMiddleware)

  // Now, setup some v1 (version 1) routes. Notice that the second argument passed
  // to the registerV1Routes function is a path. The code takes the path that got
  // passed into this (registerApiRoutes) function and appends /v1 to the end of it.
  // So, the full path is /api/v1, which is passed along to that function.
  registerV1Routes(app, `${path}/v1`)

  // If and when we ever have v2 of our api, we might have something like this
  // registerV2Routes(app, `${path}/v2`)
}

// This is a simple example of a middleware function. It's just like any other function,
// except that it's middleware because of how it is used. It's also just like any route
// handler function in that it accepts a request, response and the next handler as
// function arguments. It gets executed first on any incoming request, before the
// route handler for that specific request is found and executed, hence the term
// middleware. It gets executed in the middle. This function first captures the
// current time in milliseconds, then continues the route handling by calling next().
// When the route handler next() completes, a console debug message is logged
// which spits out the difference in time, essentially how long it took to handle
// the request.
function calculateResponseTimeMiddleware(request, response, next) {
  const startTime = Date.now()
  next()
  console.debug(`Handled ${request.method} ${request.originalUrl} in ${Date.now() - startTime}ms`)
}

export { registerApiRoutes }
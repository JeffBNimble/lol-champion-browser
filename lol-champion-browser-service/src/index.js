import express from 'express'

// For now, we're going to use port 8080 as our service port. A machine has 65,535 ports available.
// The default port for http is 80 and the default port for https is 443. So if you were to type
// http://leagueoflegends.com into your browser, that's the same as typing http://leagueoflegends.com:80.
// https://leagueoflegends.com is the same as https://leagueoflegends.com:443.
//
// The first part of a URL that you type into a browser is known as the hostname. In this case, leagueoflegends.com
// is the hostname. The second and optional part is the port. Further, when you are running anything on your local machine,
// the hostname is localhost. So, when we're using the browser to communicate with this service, we will use
// http://localhost:8080 since we're using port 8080. We're not using https for this app. This requires a little extra
// work and we're not going to worry about that for now.
const port = 8080

function startServer() {
  // This is an example of logging. Logging typically involves increasing levels of severity. The debug level
  // is typically one of the lowest severities. But, there are others like info, warn and error. As a developer,
  // it's important to add logging in your code as it often helps you diagnose problems and/or help ensure that
  // everything is working as you expected.
  console.debug('Starting the server')

  // Create an ExpressJS application
  // It's not doing anything just yet
  const app = express()

  // Now, tell the ExpressJS application to listen on port 8080. As soon as the service
  // starts, our code logs a debug message to the console telling us that the service has
  // started and is listening on the port we've specified.
  app.listen(port, () => {
    console.debug(`The service has started and is listening on port ${port}`)
  })
}

// This module exports an object containing only the startServer function
export { startServer }
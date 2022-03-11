import nodemon from 'nodemon'

// Use nodemon to run the dev.js file, which causes nodemon to watch all
// JS modules which get imported. If anything changes, nodemon will restart
// node, which reloads and restarts the server.
nodemon({script: 'dev.js'})
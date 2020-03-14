'use strict'

// import event methods
const surveyEvents = require('./surveys/events')
const authEvents = require('./auth/events')

// run the app!
$(() => {
  surveyEvents.displayLoggedOutHome()
  surveyEvents.eventHandlers()
  authEvents.eventHandlers()
})

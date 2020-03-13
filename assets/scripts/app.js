'use strict'

// import event methods
const surveyEvents = require('./surveys/events')
const authEvents = require('./auth/events')

// run the app!
$(() => {
// hides and shows
  $('#add-field').hide()

  $('.button-add').on('click', surveyEvents.onAddField)
  surveyEvents.displayLoggedOutHome()
  surveyEvents.eventHandlers()
  authEvents.eventHandlers()
})

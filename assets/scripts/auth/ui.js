'use strict'

const store = require('./../store')
const events = require('./../surveys/events.js')
const ui = require('./../surveys/ui.js')

const onSignUpSuccess = function (response) {
  $('.message').text(`${response.user.email} successfully signed up!`)
  ui.clearAllAuthForms()
}

const onSignUpFailure = function (response) {
  $('.message').text(`Sign up failed. Try again.`)
  ui.clearAllAuthForms()
}

const onSignInSuccess = function (response) {
  $('.message').text(`${response.user.email} successfully signed in!`)
  ui.clearAllAuthForms()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#change-password').show()
  $('#sign-out').show()
  $('#create-survey-button').show()
  $('#index-my-surveys-button').show()
  events.onIndexAllSurveys()
  store.user = response.user
}

const onSignInFailure = function (response) {
  $('.message').text(`Sign in failed. Try again.`)
  ui.clearAllAuthForms()
}

const onChangePasswordSuccess = function (response) {
  $('.message').text(`Successfully changed password!`)
  ui.clearAllAuthForms()
}

const onChangePasswordFailure = function (response) {
  $('.message').text(`Change password failed. Try again.`)
  ui.clearAllAuthForms()
}

const onSignOutSuccess = function (response) {
  events.displayLoggedOutHome()
  // set the locally stored user data to null
  store.user = null
  store.signingOut = true
}

const onSignOutFailure = function (response) {
  $('.message').text(`Sign out failed. Try again.`)
  ui.clearAllAuthForms()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}

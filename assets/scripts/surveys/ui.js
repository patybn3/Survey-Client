'use strict'

const store = require('./../store')
const api = require('./api.js')
const indexAllSurveysTemplate = require('../templates/survey-index-all-surveys.handlebars')
const indexMySurveysTemplate = require('../templates/survey-index-my-surveys.handlebars')
const updateSurveyForm = require('../templates/survey-update-form.handlebars')
const viewTakeSurvey = require('../templates/survey-view-and-take.handlebars')

// index all surveys (created by any user)
const onIndexAllSurveysSuccess = function (response) {
  store.surveys = response.surveys
  if (store.surveys.length === 0) {
    $('.message').text(`No surveys yet! Create one to start!`)
  } else {
    $('.message').text(`Viewing all user surveys!`)
  }
  const indexSurveysHtml = indexAllSurveysTemplate({
    surveys: response.surveys
  })
  $('.survey-content').html(indexSurveysHtml)
  $('#index-all-surveys-button').hide()
  $('#index-my-surveys-button').show()
  $('#create-survey-button').show()
  clearAllAuthForms()
}

// index 'my surveys'.
// user wants to see 'my surveys' after creating, updating, deleting,
// or clicking on 'my surveys' button from anywhere in the app
const onIndexMySurveysSuccess = function (response) {
  store.surveys = response.surveys
  if (store.creatingSurvey === true) {
    $('.message').text(`Survey successfully created! Showing all your surveys!`)
    store.creatingSurvey = false
  } else if (store.editingSurvey === true) {
    $('.message').text(`Survey successfully edited! Showing all your surveys!`)
    store.editingSurvey = false
  } else if (store.deletingSurvey === true) {
    if (store.surveys.length === 0) {
      $('.message').text(`Survey successfully deleted! No surveys left to show!`)
    } else {
      $('.message').text(`Survey successfully deleted! Showing all your surveys!`)
    }
    store.deletingSurvey = false
  } else if (store.surveys.length === 0) {
    $('.message').text(`No surveys! Create one to start!`)
  } else {
    $('.message').text(`Viewing your surveys!`)
  }
  const indexSurveysHtml = indexMySurveysTemplate({
    surveys: response.surveys
  })
  $('#create-survey-button').show()
  $('.survey-content').empty()
  $('.survey-content').html(indexSurveysHtml)
  $('#index-all-surveys-button').show()
  $('#index-my-surveys-button').hide()
  clearAllAuthForms()
}

// show a single survey that a user wants to edit/update
const onShowSurveySuccess = function (response) {
  const surveyFormHtml = updateSurveyForm({
    survey: response.survey
  })
  $('.survey-content').html(surveyFormHtml)
  $('.message').text(`Edit your survey! Note: we ensured vote count remains if you update the text field for an option.`)
  store.survey = response.survey
  clearAllAuthForms()
}

// show a single survey with options to vote!
const onViewTakeSurveySuccess = function (response) {
  store.survey = response.survey
  const surveyHtml = viewTakeSurvey({
    survey: response.survey
  })
  $('#index-my-surveys-button').show()
  $('.survey-content').html(surveyHtml)
  if (store.placingVote === true) {
    $('.message').text(`Vote successfully logged!`)
    store.placingVote = false
  } else {
    $('.message').text(`View and vote on the survey!`)
  }
  clearAllAuthForms()
}

// show a single survey with options to vote!
const onVoteSuccess = function (response) {
  store.placingVote = true
  api.showSurvey(store.survey._id)
    .then(onViewTakeSurveySuccess)
    .catch(failure)
}

// save errors to storage since console logs aren't allowed in this project
const failure = function (error) {
  store.error = error
  $('.message').text(`Sorry, error on our end. Please try again.`)
}

// ensure forms get reset if user starts filling them out and clicks somewhere
// else instead
const clearAllAuthForms = function () {
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#sign-out').trigger('reset')
}

module.exports = {
  onIndexAllSurveysSuccess,
  onIndexMySurveysSuccess,
  onShowSurveySuccess,
  onViewTakeSurveySuccess,
  clearAllAuthForms,
  onVoteSuccess,
  failure
}

'use strict'

const store = require('./../store')
const api = require('./api.js')
const indexAllSurveysTemplate = require('../templates/survey-index-all-surveys.handlebars')
const indexMySurveysTemplate = require('../templates/survey-index-my-surveys.handlebars')
const updateSurveyForm = require('../templates/survey-update-form.handlebars')
const viewTakeSurvey = require('../templates/survey-view-and-take.handlebars')

const onIndexAllSurveysSuccess = function (response) {
  store.surveys = response.surveys
  console.log('onIndexAllSurveysSuccess store', store)
  // flow for indexing surveys after one was created
  if (store.creatingSurvey === true) {
    $('#survey-form').empty()
    $('#create-survey-button').show()
    $('#message').text(`Survey successfully created!`)
    store.creatingSurvey = null
    // flow for indexing surveys after one was edited
  } else if (store.editingSurvey === true) {
    $('#survey-form').empty()
    $('#create-survey-button').show()
    $('#message').text(`Survey successfully edited!`)
    store.editingSurvey = null
    // flow if indexing surveys after user signs out
  } else if (store.signingOut === true) {
    $('#message').text(`Successfully signed out!`)
    store.signingOut = null
  } else if (store.deletingSurvey === true) {
    $('#message').text(`Successfully deleted survey! Viewing all user surveys!`)
    store.deletingSurvey = null
  } else {
    if (store.surveys.length === 0) {
      $('#message').text(`No surveys yet! Create one to start!`)
    } else {
      $('#message').text(`Viewing all user surveys!`)
    }
  }
  // flow for the logged-out view
  if (store.user !== null && store.user !== undefined) {
    $('#index-all-surveys-button').hide()
    $('#index-my-surveys-button').show()
  }
  // add html to app
  const indexSurveysHtml = indexAllSurveysTemplate({ surveys: response.surveys })
  $('#survey-content').html(indexSurveysHtml)
  resetAllForms()
}

// index only the user's surveys
const onIndexMySurveysSuccess = function (response) {
  store.surveys = response.surveys
  console.log('onIndexMySurveysSuccess store', store)
  $('#survey-content').empty()
  if (store.surveys.length === 0) {
    $('#message').text(`No surveys yet! Create one to start!`)
  } else {
    $('#message').text(`Viewing your surveys!`)
  }
  const indexSurveysHtml = indexMySurveysTemplate({ surveys: response.surveys })
  $('#survey-content').html(indexSurveysHtml)
  $('#index-all-surveys-button').show()
  $('#index-my-surveys-button').hide()
  resetAllForms()
}

// show a single survey
const onShowSurveySuccess = function (response) {
  $('#message').text(`Edit your survey!`)
  const surveyFormHtml = updateSurveyForm({ survey: response.survey })
  $('#survey-content').html(surveyFormHtml)
  store.survey = response
  resetAllForms()
}

// show a single survey with options to vote!
const onViewTakeSurveySuccess = function (response) {
  $('#message').text(`View and vote on your survey!`)
  const surveyHtml = viewTakeSurvey({ survey: response.survey })
  $('#survey-content').html(surveyHtml)
  store.survey = response
  resetAllForms()
}

const onVoteSuccess = function (response) {
  resetAllForms()
  api.showSurvey(store.survey.survey._id)
    .then(onViewTakeSurveySuccess)
    .catch(failure)
}

// save errors to storage since console logs aren't allowed in this project
const failure = function (error) {
  store.error = error
  $('#message').text(`Sorry, error on our end. Please try again.`)
}

const resetAllForms = function () {
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#sign-out').trigger('reset')
  store.creatingSurvey = null
  store.editingSurvey = null
  store.deletingSurvey = null
}

module.exports = {
  onIndexAllSurveysSuccess,
  onIndexMySurveysSuccess,
  onShowSurveySuccess,
  onViewTakeSurveySuccess,
  onVoteSuccess,
  resetAllForms,
  failure
}

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
    $('.message')[0].scrollIntoView()
  } else {
    $('.message').text(`Viewing all user surveys!`)
    $('.message')[0].scrollIntoView()
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
    $('.message')[0].scrollIntoView()
    store.creatingSurvey = false
  } else if (store.editingSurvey === true) {
    $('.message').text(`Survey successfully edited! Showing all your surveys!`)
    $('.message')[0].scrollIntoView()
    store.editingSurvey = false
  } else if (store.deletingSurvey === true) {
    if (store.surveys.length === 0) {
      $('.message').text(`Survey successfully deleted! No surveys left to show!`)
      $('.message')[0].scrollIntoView()
    } else {
      $('.message').text(`Survey successfully deleted! Showing all your surveys!`)
      $('.message')[0].scrollIntoView()
    }
    store.deletingSurvey = false
  } else if (store.surveys.length === 0) {
    $('.message').text(`No surveys! Create one to start!`)
    $('.message')[0].scrollIntoView()
  } else {
    $('.message').text(`Viewing your surveys!`)
    $('.message')[0].scrollIntoView()
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
  $('.message').text(`Edit your survey!`)
  const survey = response.survey

  // Prep optionsWithIndex for use by survey-update-forms handler
  // TODO: Refactor to share with onViewTakeSurveySuccess
  const optionsWithIndex = survey.options.slice(0)
  const rowsToDisplay = optionsWithIndex.length + 5
  for (let i = 0; i < optionsWithIndex.length; i++) {
    optionsWithIndex[i].optionArrayIndex = i
  }
  for (let j = optionsWithIndex.length; j < rowsToDisplay; j++) {
    optionsWithIndex[j] = {option: '', optionArrayIndex: j}
  }
  survey.optionsWithIndex = optionsWithIndex
  // end prep of optionsWithIndex
  const surveyFormHtml = updateSurveyForm({
    survey: response.survey
  })

  $('.survey-content').html(surveyFormHtml)
  $('.message').text(`Edit your survey! Note: we ensured vote count remains if you update the text field for an option.`)
  $('.message')[0].scrollIntoView()
  store.survey = response.survey
  clearAllAuthForms()
}

// show a single survey with options to vote!
const onViewTakeSurveySuccess = function (response) {
  store.survey = response.survey
  $('.message').text(`View and vote on your survey!`)

  // Prep optionsWithIndex for use by survey-update-forms handler
  const survey = response.survey
  const optionsWithIndex = survey.options.slice(0)
  for (let i = 0; i < optionsWithIndex.length; i++) {
    optionsWithIndex[i].optionArrayIndex = i
  }
  survey.optionsWithIndex = optionsWithIndex
  // end prep of optionsWithIndex
  const surveyHtml = viewTakeSurvey({
    survey: survey
  })
  $('#index-my-surveys-button').show()
  $('.survey-content').html(surveyHtml)
  if (store.placingVote === true) {
    $('.message').text(`Vote successfully logged!`)
    store.placingVote = false
  } else {
    $('.message').text(`View and vote on the survey!`)
    $('.message')[0].scrollIntoView()
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
  $('.message')[0].scrollIntoView()
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

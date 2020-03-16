'use strict'

// events file creates event listeners and handles tasks when events happen

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const surveyFormCreate = require('../templates/survey-create-form.handlebars')
const store = require('./../store')

// initial page display
const displayLoggedOutHome = () => {
  $('#sign-in').show()
  $('#sign-up').show()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-survey-button').hide()
  $('#index-all-surveys-button').hide()
  $('#index-my-surveys-button').hide()
  $('#create-survey-form').hide()
  $('#edit-survey-form').hide()
  $('.survey-content').empty()
  if (store.signingOut === true) {
    $('.message').text(`Signed out!`)
    $('.message')[0].scrollIntoView()
    store.signingOut = false
  } else {
    $('.message').text(`Sign up if you haven't already! You can use an
    email like "j@j.com" and password "j" just to try our app! Then sign in
    to create, manage and take surveys!`)
  }
  ui.clearAllAuthForms()
}

// create survey event handlers on app load
const eventHandlers = () => {
  $('#create-survey-button').on('click', showFormForCreate)
  $('#index-all-surveys-button').on('click', onIndexAllSurveys)
  $('#index-my-surveys-button').on('click', onIndexMySurveys)
  $('.survey-content').on('click', '.remove-survey', onDeleteSurvey)
  $('.survey-content').on('click', '.edit-survey', onEditSurveyStart)
  $('.survey-content').on('click', '.view-take-survey-button', onViewTakeSurvey)
  $('.survey-content').on('click', '.vote-button', function (event) {
    onVote(event)
  })

  // the 2nd parameter to these handlers is the optional
  // selector that doesn't exist yet, but will exist
  // with .survey-content once handlebars creates them.
  // because they are forms, use an anonymous function to
  // preventDefault before sending them on. this keeps SPA functionality
  $('.survey-content').on('submit', '.create-form', function (event) {
    event.preventDefault()
    onCreateSurvey(event)
  })
  $('.survey-content').on('submit', '.update-form', function (event) {
    event.preventDefault()
    onEditSurveySubmit(event)
  })
}

// event handler listens for when 'create survey' button is clicked
const showFormForCreate = () => {
  $('#create-survey-button').hide()
  $('#index-my-surveys-button').show()
  $('#index-all-surveys-button').show()
  $('.survey-content').empty()
  const surveyFormHtml = surveyFormCreate()
  $('.survey-content').html(surveyFormHtml)
  $('.message').text(`Create your new survey!`)
  $('.message')[0].scrollIntoView()
  ui.clearAllAuthForms()
}

// event handler listens for when 'create survey'
// form submit is clicked
const onCreateSurvey = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createSurvey(data)
    .then(() => {
      store.creatingSurvey = true
      onIndexMySurveys()
    })
    .catch(ui.failure)
}

// delete a user's survey
const onDeleteSurvey = (event) => {
  const id = $(event.target).data('id')
  event.preventDefault()
  api.deleteSurvey(id)
    .then(() => {
      store.deletingSurvey = true
      onIndexMySurveys()
    })
    .catch(ui.failure)
}

// when a user begins to update a survey
const onEditSurveyStart = (event) => {
  $('#index-my-surveys-button').show()
  const id = $(event.target).data('id')
  api.showSurvey(id)
    .then(ui.onShowSurveySuccess)
    .catch(ui.failure)
}

// when a user submits an edited survey
const onEditSurveySubmit = (event) => {
  const data = getFormFields(event.target)
  const id = store.survey._id
  const survey = {
    survey: {
      name: data.survey.name,
      description: data.survey.description
    },
    options: data.options
  }
  api.editSurvey(survey, id)
    .then(() => {
      store.editingSurvey = true
      onIndexMySurveys()
    })
    .catch(ui.failure)
}

// when a user wants to view or take a survey
const onViewTakeSurvey = (event) => {
  const id = $(event.target).data('id')
  api.showSurvey(id)
    .then(ui.onViewTakeSurveySuccess)
    .catch(ui.failure)
}

// when a user clicks a 'vote' button
const onVote = (event) => {
  const voteId = $(event.target).data('vote-id')
  const vote = {
    vote: voteId
  }
  api.vote(store.survey._id, vote)
    .then(ui.onVoteSuccess)
    .catch(ui.failure)
}

// get list of all surveys
const onIndexAllSurveys = () => {
  api.indexAllSurveys()
    .then(ui.onIndexAllSurveysSuccess)
    .catch(ui.failure)
}

// get list of just one user's surveys
const onIndexMySurveys = () => {
  api.indexMySurveys()
    .then(ui.onIndexMySurveysSuccess)
    .catch(ui.failure)
}

module.exports = {
  eventHandlers,
  displayLoggedOutHome,
  showFormForCreate,
  onCreateSurvey,
  onIndexAllSurveys,
  onDeleteSurvey,
  onEditSurveyStart,
  onEditSurveySubmit,
  onViewTakeSurvey,
  onVote
}

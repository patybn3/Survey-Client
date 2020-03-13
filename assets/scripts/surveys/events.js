'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const surveyFormCreate = require('../templates/survey-create-form.handlebars')
const surveyFormAddField = require('../templates/extra-field.handlebars')
const store = require('./../store')

// initial page display
const displayLoggedOutHome = () => {
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-survey-button').hide()
  $('#index-all-surveys-button').hide()
  $('#index-my-surveys-button').hide()
  $('#create-survey-form').hide()
  $('#edit-survey-form').hide()
}

// create survey event handlers on app load
const eventHandlers = () => {
  $('#create-survey-button').on('click', showFormForCreate)
  $('#index-all-surveys-button').on('click', onIndexAllSurveys)
  $('#index-my-surveys-button').on('click', onIndexMySurveys)
  $('#survey-content').on('click', '.remove-survey', onDeleteSurvey)
  $('#survey-content').on('click', '.edit-survey', onEditSurveyStart)
  // the 2nd parameter to these handlers is the optional
  // selector that doesn't exist yet, but will exist
  // with #survey-content once handlebars creates them.
  // because they are forms, use an anonymous function to
  // preventDefault before sending them on.
  $('#survey-content').on('submit', '.create-form', function (event) {
    event.preventDefault()
    onCreateOrEditSurvey(event)
  })
  $('#survey-content').on('submit', '.update-form', function (event) {
    event.preventDefault()
    onEditSurveySubmit(event)
  })
}
// event handler listens for when 'create survey' button is clicked
const showFormForCreate = () => {
  store.creatingSurvey = true
  $('#create-survey-button').hide()
  $('#survey-content').empty()
  const surveyFormHtml = surveyFormCreate()
  $('#survey-content').html(surveyFormHtml)
}

// a similar form is used for creating and editing
// so we funnel control flow through here
const onCreateOrEditSurvey = (event) => {
  if (store.creatingSurvey === true) {
    onCreateSurvey(event)
  } else {
    onEditSurveyStart(event)
  }
}

// event handler listens for when 'create survey'
// form submit is clicked
const onCreateSurvey = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.createSurvey(data)
    .then(ui.onCreateSuccess)
    .catch(ui.failure)
}

// when a user begins to update a survey
const onEditSurveyStart = (event) => {
  store.creatingSurvey = false
  const id = $(event.target).data('id')
  api.showSurvey(id)
    .then(ui.onShowSurveySuccess)
    .catch(ui.failure)
}

// when a user submits an edited survey
const onEditSurveySubmit = (event) => {
  const data = getFormFields(event.target)
  const id = store.survey.survey.id
  const survey = {
    'survey': {
      'title': data.title,
      'author': data.author,
      'body': data.body
    }
  }
  // anonymous function allows two lines to be written
  // and callback not to be invoked till response comes back
  // to .then()
  api.editSurvey(survey, id)
    .then(function () {
      store.editingSurvey = true
      onIndexAllSurveys(event)
    })
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

// delete a user's survey
const onDeleteSurvey = (event) => {
  event.preventDefault()
  api.deleteSurvey(event)
    .then(function () {
      onIndexAllSurveys(event)
    })
    .catch(ui.failure)
}

module.exports = {
  eventHandlers,
  displayLoggedOutHome,
  showFormForCreate,
  onCreateSurvey,
  onCreateOrEditSurvey,
  onIndexAllSurveys,
  onDeleteSurvey,
  onEditSurveyStart,
  onEditSurveySubmit
}

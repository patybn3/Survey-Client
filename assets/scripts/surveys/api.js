'use strict'

// access the API's URL via the config file (dev. & prod. URLs)
const config = require('./../config')
const store = require('./../store')

// contains all AJAX calls to the API

const createSurvey = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/surveys`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: data
  })
}

const editSurvey = (survey, id) => {
  return $.ajax({
    url: `${config.apiUrl}/surveys/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: survey
  })
}

const vote = (surveyId, vote) => {
  return $.ajax({
    url: `${config.apiUrl}/surveys/vote/${surveyId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: vote
  })
}

const indexAllSurveys = () => {
  return $.ajax({
    url: `${config.apiUrl}/surveys`,
    method: 'GET',
    data: ''
  })
}

const indexMySurveys = () => {
  return $.ajax({
    url: `${config.apiUrl}/surveys/mine`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: ''
  })
}

const showSurvey = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/surveys/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const deleteSurvey = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/surveys/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  createSurvey,
  editSurvey,
  indexAllSurveys,
  indexMySurveys,
  showSurvey,
  deleteSurvey,
  vote
}

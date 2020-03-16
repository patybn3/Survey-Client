# Pollaris Surveys Client

  Pollaris Surveys is Full Stack Web Application developed as a group project by the following Sofware Engineers:
  Ash Grevelink at https://github.com/hashbangas ,
  Ethan Strominger at https://github.com/ethanstrominger ,
  Tukrong Klengdong at https://github.com/tukrong ,
  Patricia Antlitz at https://github.com/patybn3 .

The Back-End repository of this app is stored at [Pollaris API](https://github.com/wat-the-duck/pollaris-surveys-api).
And its version was deployd to [Heroku](https://mighty-retreat-69793.herokuapp.com/).
This application can be viewd and tested [HERE](https://wat-the-duck.github.io/pollaris-surveys-client/)

## Objectives:

To create a fully functional application that allows an authenticated user to create, edit and delete surveys. Surveys should be available to all authenticated users but should only be edited or deleted by the owner/creator. Allow the application to keep track of the answers in a survey. User should not use their personal email and password when using this application. This app takes any email in the format email@email or email@email.com and any password.

## Set Up
- `npm install`
- `grunt serve`

## Dependencies
- [browser-template](https://git.generalassemb.ly/ga-wdi-boston/browser-template)

## Requirements

The front-end and back-end of this application must be built as a group. Both front-end and back-end are to be stored in a public GitHub account, this project was added to the organization Wat-the-duck and made public. A project must be created under the organization and access should be given to all members. Tickets must be created often, added to a to-do list, moved to "in process" list while is being worked on and closed once a related commit is pushed from the local repository to the remote repository. Tickets are to be used to communicate with the other members of the team on what needs to be done and are to be assigned to one (or more) members of the team.

The back-end of this application should use Heroku as a server. Changes made are to be committed and deployed to both GitHub repositories and heroku, often, to keep records up to date. Pull requests are to be reviewed by at least one member of the team before merging into the main branch (not master). This project uses a branch called development as the main branch. All features were added using feature branches which were merged, rebased and deleted once the feature was completed.

Commit:

At least one commit per Developer a day. Commits message must be detailed, must include the ticket numbers it is related to and should reference the name of any Developer who also worked on the feature.

## Technology Used:

1. HTML5
2. Bootstrap
3. CSS3
4. SASS
5. Javascript (ES6)
6. jQuery
7. ajax
8. Git
9. GitHub w/automated Scrum board
10. Handlebars
Refer to the back-end repository mentioned above for a list of Technologies used for the back-end.

## User Stories:

1.	As a user I would like to Sign up with email, password, and password confirmation.
2.	As a user I would like to Login with email and password.
3.	As a user I would like to Logout when logged in.
4.	As a user I would like to Change password with current and new password..
5.	As a user I would like to be able to create a new survey
6.	As a user I would like to be able to update a survey
7.	As a user I would like to be able to delete a survey
8.	As a user I would like to able to view a single or multiple survey
9.	As a user I would like to all my resource actions that change data to only be available to me when signed in.
10.	As a user I would like to be able to share my survey with others
11.	As a user I would like to be able to record survey entries/results
12.	As a user I would like to able to have a chart with results

## Wireframes and Views:

1. View 1, should contain: Title/Header/Page name. Nav bar, sign in and sign up forms.
![IMG_3821](https://user-images.githubusercontent.com/22508682/76435452-62f54080-638d-11ea-925e-eb0a252bcb4f.jpg)

2. View 2, should appear when "All surveys" or "My surveys" button is clicked. Should contain a title/header/page name. Nav bar, a main section with a list of all surveys and a side section with the change password form and a log out button.
![IMG_3825](https://user-images.githubusercontent.com/22508682/76435476-68528b00-638d-11ea-8990-25da5a3d51d5.jpg)
![IMG_3822](https://user-images.githubusercontent.com/22508682/76435491-6d173f00-638d-11ea-9ea7-abefba33b9f0.jpg)

3. View 3, should allow an user to add a new survey
![IMG_3824](https://user-images.githubusercontent.com/22508682/76435580-8d46fe00-638d-11ea-88ca-ce6094a5dae4.jpg)

4. View 4, should allow an user to see the details of a survey.
![IMG_3828](https://user-images.githubusercontent.com/22508682/76435607-98019300-638d-11ea-8e0a-d0e550e874c1.jpg)

5. View 5, should allow an user to see the form to update a survey.
![IMG_3827](https://user-images.githubusercontent.com/22508682/76435626-9cc64700-638d-11ea-978f-10e6397ab897.jpg)

## Planning

1. One person:
  [X] Download api template and push
  [X] Deploy to heroku
  [X] Download UI template and push
  [X] Deploy to heroku
[X] API Sign up, sign in
[X] UI Sign up, sign in
2. Each team member
  [X] Clones repos
[X] Survey API CRUD for resource with no options
[X] Survey UI CRUD for resource with no options
[X] Survey API CRUD for resource with options

Work in three groups on UI.  When someone is ready to push to feature,
then do the pull request as a group.  Then, everybody rebases and
resolves any conflicts, also as a group.  Rebase will merge any changes.

3.
[X] Survey UI CRUD for resource with options
    [X] CREATE
        [X] Suggestion: Do a reset so can create a new item
    [X] INDEX - List all surveys, my surveys
    [X] SHOW/UPDATE of options
    [X] DELETE
[X] Take Survey
    [X] API
    [X] UI
[X] UI - Handle errors
[X] UI - Only appropriate buttons appear
[X] Review checklist

## Unsolved Problems

None

## Future Plans
Click [here](https://github.com/orgs/wat-the-duck/projects/1?card_filter_query=label%3Afuture) to see issues marked as "Future"

# Pollaris Surveys Client

## Wireframes
![IMG_3821](https://user-images.githubusercontent.com/22508682/76435452-62f54080-638d-11ea-925e-eb0a252bcb4f.jpg)
![IMG_3825](https://user-images.githubusercontent.com/22508682/76435476-68528b00-638d-11ea-8990-25da5a3d51d5.jpg)
![IMG_3822](https://user-images.githubusercontent.com/22508682/76435491-6d173f00-638d-11ea-9ea7-abefba33b9f0.jpg)
![IMG_3824](https://user-images.githubusercontent.com/22508682/76435580-8d46fe00-638d-11ea-88ca-ce6094a5dae4.jpg)
![IMG_3828](https://user-images.githubusercontent.com/22508682/76435607-98019300-638d-11ea-8e0a-d0e550e874c1.jpg)
![IMG_3827](https://user-images.githubusercontent.com/22508682/76435626-9cc64700-638d-11ea-978f-10e6397ab897.jpg)

# Set Up
- `npm install`
- `grunt serve`

# Dependencies
- [browser-template](https://git.generalassemb.ly/ga-wdi-boston/browser-template)

# Release Plan
## MVP

One person:
  [X] Download api template and push
  [X] Deploy to heroku
  [X] Download UI template and push
  [X] Deploy to heroku
[X] API Sign up, sign in
[X] UI Sign up, sign in
Each team member
  [X] Clones repos
[X] Survey API CRUD for resource with no options
[X] Survey UI CRUD for resource with no options
[X] Survey API CRUD for resource with options

Work in three groups on UI.  When someone is ready to push to feature,
then do the pull request as a group.  Then, everybody rebases and
resolves any conflicts, also as a group.  Rebase will merge any changes.

[ ] Survey UI CRUD for resource with options
    [ ] CREATE (Patty)
        [ ] Suggestion: Do a reset so can create a new item
    [ ] INDEX - List all surveys, my surveys
    [ ] SHOW/UPDATE of options  (Ash/Ethan)
    [ ] DELETE (TK)
[ ] Take Survey (Ash/Ethan)
    [ ] API
    [ ] UI
[ ] UI - Handle errors - Patty
[ ] UI - Only appropriate buttons appear - Ash/Ethan
[ ] Review checklist

Post MVP
[ ] Celebrate
[ ] Prep for demo
[ ] Tech debt

## Sprints
### Sprint 1
**Target**
[ ] CRUD for Survey without optons and without auth
    [ ] API
    [ ] UI

**Review**
Targeted and completed
[ ] CRUD for Survey without optons and **with auth**
    [X] API

Bonus completed
[X] Sign up, sign in
    [X] API (part of template)
    [X] UI
[X] Included auth

Targeted and not completed:
[ ] CRUD for Survey without optons and **with auth**
    [] UI

Retro
???

### Sprint 2
**Target**
[ ] CRUD for options
    [X] API
    [ ] UI
**Stretch**
[ ] UI: Take Survey
[ ] API: Take Survey

**Review**
Targeted and completed:
[ ] CRUD for options
    [X] API
Targeted and not completed:
[ ] CRUD for options
    [ ] UI

Demoed
Worked with Mike to figure out how to show options

**Retro**
**Ash**
What worked
  - We all did an incredible job, got far, close to being done
How to make it even better:
  - Pay attention to Slack

**TK**
What worked
  - Helped out others
  - Found bug "GET issue"

**Patty**
What worked
  - Tried to work on same problem, worked separately, ended up finding
one that wOrked on one that was cleaner
  - Checked front end together

**Ethan**
What worked
  - Good combo of working separately and together
How to make it even better
  - Continue working on UI components separately
  - Ethan listen to TK.  He found the issue, but Ethan was thinking of his solution.

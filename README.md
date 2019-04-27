# Codus Crossfit Client

[![Greenkeeper badge](https://badges.greenkeeper.io/emilianoLeite/codus-crossfit-client.svg)](https://greenkeeper.io/)
[![CircleCI badge](https://circleci.com/gh/emilianoLeite/codus-crossfit-client.svg?style=svg)](https://circleci.com/gh/emilianoLeite/codus-crossfit-client)

## Roadmap

### v0.1

- [X] GraphQL with [Apollo client](https://www.apollographql.com/docs/react/essentials/get-started.html)
  - [X] [Generating Schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html#example)
  - [X] Integrate with React
  - [X] [Getting Started](https://www.apollographql.com/docs/react/essentials/get-started.html)
  - [X] [Typescript](https://www.apollographql.com/docs/react/recipes/static-typing.html)
  - [X] [Mocking graphql](https://www.apollographql.com/docs/graphql-tools/mocking.html)
- [X] [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
  - [X] Select default route
- [X] Redux
- [x] Router + Redux
  - [X] [connected-react-router](https://github.com/supasate/connected-react-router)
- [X] Admin Login
  - [X] [Mutations](https://www.apollographql.com/docs/react/essentials/mutations.html)
  - [X] Save in Redux
- [X] Add "Page" convention
- [X] CRUD Challenges
  - [X] List Challenges
  - [X] Create Challenge
  - [X] Update Challenge
  - [X] HOC on redirectable components
- [X] CRUD WipChallenges
  - [X] List WIP Challenges
  - [X] Create WIP Challenges
  - [X] Move WIP Challenges between status
- [X] Add graphql linter to ensure all queries/mutations are valid
- [X] Send JWT in request header
- [X] Better delineate public/private pages
  - [X] Make `WipChallengesPage` public
- [ ] Polir telas
  - [X] Beautiful DND
    - [X] Implement Single list
    - [X] Disallow moving itens between same column
    - [X] Move cards between columns
      - [X] [Bug] Unlink cards with same index across different column
    - [X] Trigger graphQL mutation when cards are moved between columns
      - [X] Trigger when challenge is moved to Done
      - [X] Trigger when challenge is moved to Doing
      - [X] Trigger when challenge is moved from TODO to Doing
        - [X] Ask email when moving from TODO
    - [X] Add `ChallengesBoardColumn` to `Board`
  - [ ] styles
    - [X] Add emotion
    - [X] Add `min-width` to board columns
    - [ ] Add title to board columns

### v0.2

- [ ] Save JWT on LocalStorage/Cookie
  - [ ] Clean Storage/Cookie when JWT is expired
- [ ] CRUD Challenges
  - [ ] Delete Challenge?
- [ ] CRUD WipChallenges
  - [ ] Delete WIP Challenge
- [ ] Upgrade to "typescript": "^3.4" and add incremental flag
- [ ] Use [codegen](https://graphql-code-generator.com/)
- [ ] Cleanup Beautiful DND comps
  - [ ] Add direction abstraction
  - [ ] Investigate creating mutations without react-apollo
- [ ] Use Suspense + lazy
- [ ] Improve `History.LocationState` type
- [ ] Transform all classes into hooks
- [ ] Deploy using `now`

## Issues

- [X] Correctly destruct `location.state.from`

## Warnings

- [ ] Confirmar que realmente *precisamos* usar o [connected-react-router](https://github.com/supasate/connected-react-router) pra usar Router + Redux. [See commit](https://github.com/emilianoLeite/codus-crossfit-client/commit/a82d81edbba8908387b54b51b080213297913f71)
- [ ] GraphQL error loga um `Error` vazio no console

_______


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

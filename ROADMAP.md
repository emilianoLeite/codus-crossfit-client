
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
  - [X] Show Challenge
    - [X] Fix interfaces
  - [X] HOC on redirectable components
- [X] CRUD WipChallenges
  - [X] List WIP Challenges
    - [X] Basic List
    - [X] List with Challenges
  - [X] Create WIP Challenges
  - [X] Move WIP Challenges between status
- [X] Add graphql linter to ensure all queries/mutations are valid
- [X] Send JWT in request header
- [X] Better delineate public/private pages
  - [X] Make `WipChallengesPage` public
- [X] Polir telas
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
  - [X] styles
    - [X] Add emotion
    - [X] Add `min-width` to board columns
    - [X] Add title to board columns
- [ ] Add proper description and instructions to README
  - [ ] Move ROADMAP to separate file

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
- [ ] Share render logic between all three column components
- [ ] Search UI libraries that do not inject global styles
- [ ] Create WIP Challenge from Challenge show modal

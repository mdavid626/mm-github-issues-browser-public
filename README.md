# MM GitHub Issues Browser
Simple React app created to browse GitHub Issues. Live demo using GitHub Pages is available at https://mdavid626.github.io/mm-github-issues-browser/.

The app was developed using the latest version of Node (v18), but should run on older version too.

## Implementation details
The application was created using create-react-app with the typescript template. It is a client side app without any backend. It uses GitHub's GraphQL API.

Linting rules are enforced using eslint and prettier.

Client side routing is done with the help of react-router. Data loading is managed by `@apollo/client`. Dates are parsed and formatted using date-fns.

Mobile screen sizes are supported via media queries.

The app has 100% coverage of unit and integration test.

## Deployment
The app is deployed using GitHub pages. `gh-pages` package handles the deployment by building the app and pushing the files to the `gh-pages` branch. The deployment can be triggered by running npm run deploy.

## Local development
Run `npm install` and then `npm start`. You'll need to configure a GitHub personal access token with `public_repo` permission in `src/index.ts` .
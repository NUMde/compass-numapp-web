# NUM COMPASS web app

[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)](https://gitmoji.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Open issues](https://img.shields.io/github/issues/NUMde/compass-numapp-web?style=flat)](https://github.com/NUMde/compass-numapp-web/issues)
[![Code quality: js/ts](https://img.shields.io/lgtm/grade/javascript/g/NUMde/compass-numapp-web.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/NUMde/compass-numapp-web/context:javascript)

NUM COMPASS web app is an open source app that allows users to answer digital questionnaires for studies. The app is part of the [COMPASS](https://num-compass.science/en/compass/profile/) (Coordination on mobile pandemic apps best practice and solution sharing) project, which aims to improve how apps are used to cope with pandemics.

The app displays questionnaires based on [FHIR resources](https://www.hl7.org/fhir/questionnaire.html). Questionnaire responses are end-to-end encrypted, which makes them useful for research, as the respondents' identities are protected.

This repository includes everything you need to set up the app and customize it to suit your needs. Get started with the guide below or see the `docs` folder for detailed setup and development instructions.

## Technologies

- [Stencil](https://stenciljs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [WebComponents](https://www.webcomponents.org/)

## Browser support

The app supports recent mobile and desktop devices, and the two latest major versions of the following browsers:

- Chrome
- Firefox
- Safari
- Edge
- Opera

Stencil, the toolchain the web app uses, is compatible with [older browser versions](https://stenciljs.com/docs/browser-support). The web app may work with older browser versions, though they aren't officially supported.

## Development requirements

Recent versions of the following available in your environment:

- Node.js
- npm
- git

For minimum versions, see the engines section in `package.json`.

## Code formatting

We format our code using [Prettier](https://prettier.io/). You can find the code formatting rules in the `.prettierrc` file.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command or add a prettier extension to your IDE.

## Installation

```sh
npm ci
```

🔧 Either run `cp .env.example .env` and adjust the parameters in the `.env` file or set/export the environment variables.

## Usage

```sh

# Run the app in dev mode
npm start

# Build the app for production
npm run build

# Run the unit tests once
npm test

# Run the unit tests and monitor file changes to automatically re-run the tests during development
npm run test:watch

# Run a production build and analyze the generated bundle. This creates a stats.html file in the root directory.
npm run analyze
```

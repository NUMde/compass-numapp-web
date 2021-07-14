# NUM Compass web app 

NUM Compass web app is an open source app that allows you to create digital questionnaires for studies. The app is part of the [COMPASS](https://num-compass.science/en/compass/profile/) (Coordination on mobile pandemic apps best practice and solution sharing) project, which aims to improve how apps are used to cope with pandemics.

The app can be configured to display questionnaires based on [FHIR resources](https://www.hl7.org/fhir/questionnaire.html). Questionnaire responses are end-to-end encrypted, which makes them highly usable for research, as the respondents' identities are protected.

This repository includes everything you need to set up the app and to customize it to suit your needs. Get started with the guide below or see the docs folder for detailed setup instructions.

## Quick start guide

<p>
  <a href="https://gitmoji.dev">
    <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
  </a>
</p>

## Technologies

- [Stencil](https://stenciljs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [WebComponents](https://www.webcomponents.org/)
- [D4L Web Components](https://github.com/gesundheitscloud/hc-ui-storybook#readme)

## Requirements

The app supports recent mobile and desktop devices, and the two latest major versions of the following browsers:

- Chrome
- Firefox
- Safari
- Edge
- Opera

Stencil, the toolchain the web app uses, is compatible with [older browser versions](https://stenciljs.com/docs/browser-support). The web app may work with older browser versions, though they aren’t officially supported.

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

# Run the unit tests and monitor file changes during development
npm run test:watch

# Run a production build and analyze the generated bundle. This creates a stats.html file in the root directory.
npm run analyze
```

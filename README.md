# compass-numapp-web

Web app built with Stencil

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

# Run the unit tests and watch for file changes during development
npm run test:watch

# Build the app and then analyze the bundle size, generating a report under /stats.html
npm run analyze
```

## Code formatting

We rely on [prettier](https://prettier.io/) as our code formatting tool of choice.
You can find the defined rules in the `.prettierrc` file.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command.

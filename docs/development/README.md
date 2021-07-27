# Installation and development

The following guide explains how to install and build NUM COMPASS web app.

## Requirements

Recent versions of the following available in your environment:

- Node.js
- npm
- git

For minimum versions, see the engines section in `package.json`.

## Forking the repository

To develop your custom version of the app, we recommend that you fork the compass-numapp-web repository. By forking the repository, you can create pull requests to contribute to the NUM COMPASS web app development.

## Code formatting

We format our code using [Prettier](https://prettier.io/). You can find the code formatting rules in the `.prettierrc` file.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command or add a prettier extension to your IDE.

## Installation

Run the following commands:

```sh
npm ci
cp .env.example .env
```

Adjust the parameters in the newly copied `.env` file to suit your needs.

⚠️ In a non-local environment, you can skip this step and directly declare the environment variables instead of creating the `.env` file.

## Development and release commands

To develop and build the app, use the `npm start` or `npm run build` command. Both commands build and bundle the app in the `www` directory. The commands are described below.

### `npm start` for local development

Use `npm start` when developing. `npm start` bundles the code and starts a local web server. `npm start` also reacts to local file changes and automatically rebuilds the app.

⚠️ Avoid uploading/deploying the `www` directory after running `npm start`. Use `npm run build`, which builds an optimized production version.

### `npm run build` to generate a deployable app

Use `npm run build` to build a release-ready app. `npm run build` prepares and minifies the source code for a production environment.

### Deploying the app

If `npm run build` runs without errors, the `www` directory includes a deployable JavaScript app.

⚠️ The generated code bundles a single page app. Your hosting service must be able to serve the same `index.html` file with a 200 HTTP status code for different routes, like `/`, `/imprint`, and so on.

## Advanced development commands

For advanced development, use the following commands:

```sh
# Run the unit tests once
npm test

# Run a production build and analyze the generated bundle. This creates a stats.html file in the root directory
npm run analyze

# Run the unit tests and monitor file changes to automatically re-run the tests during development
npm run test:watch

# Automatically fix potential code formatting issues
npm run code-format
```

## Customization

After you create your first NUM COMPASS web app build, see the [customization options documentation](../customization/README.md) for help customizing the app.

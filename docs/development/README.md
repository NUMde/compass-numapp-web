# Setup and development

## Requirements

- An up-to-date Node.js, npm and git version available in your environment (the minimum versions are defined in the `engines` section of `package.json`)

## Forking the compass-numapp-web repository

The recommended way of developing your custom version of the NUM COMPASS web app is to fork this repository.
This also allows you to contribute to the development of this web app by creating pull requests from your forked repository.

## Install

```sh
npm ci
cp .env.example .env
```

🔧 Adjust the parameters in the newly copied `.env` file to meet your needs.

⚠️ In a non-local environment, you would typically skip this step and directly declare the environment variables instead of creating the `.env` file.

## Essential development and release commands

To develop and build the application, two primary commands are available. Both commands build and bundle the application in the `www` directory.

### `npm start` for local development

Use `npm start` for main development. The command bundles the code and starts a local webserver at `localhost:3434`. The command reacts to local file changes and automatically rebuilds the application.

⚠️ It is not recommended to upload/deploy the `www` directory after running `npm start`. Use `npm run build` instead, which will build an optimized production version.

### `npm run build` to generate a deployable application

Use `npm run build` to build a release-ready application. The command prepares and minifies the source code for a production environment.

### Deployment of the application

After a successful `npm run build` the `www` directory includes a JavaScript application that is deployable and completely works by itself.

⚠️ The generated code bundles a modern single page application. Your hosting service has to offer the possibility to serve the same `index.html` file with a `200` HTTP status code for different routes (`/`, `/imprint`, ...).

## Additional development commands

For advanced development, the application includes several other commands. **You only need these commands if you want to perform changes going further than [the provided customization options](./CUSTOMIZATION.md).**

```sh
# Run the unit tests once
npm test

# Run a production build and analyze the generated bundle (will create a stats.html file in the root directory)
npm run analyze

# Run the unit tests and watch for file changes during development
npm run test:watch

# Automatically fix potential code formatting issues
npm run code-format
```

## Code formatting

We rely on [Prettier](https://prettier.io/) as our code formatting tool of choice. You can find the defined rules in the `.prettierrc` file.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command or add a prettier extension to your IDE.

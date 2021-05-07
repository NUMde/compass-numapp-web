# Setup and development

## Requirements

- a GitHub account
- Node.js and npm available in your environment
- git available in your environment

### A GitHub account

[GitHub](https://github.com) is a development platform that developers commonly use for open source development. You can [sign up for free](https://github.com/join).

### git, Node.js and npm

[git](https://git-scm.com/) is a distributed version control system that developers use to collaborate on and share code. You can install it via your package manager of choice or download it from [git-scm.com](https://git-scm.com/downloads).

[Node.js](https://nodejs.org/en/) is a JavaScript runtime that runs on the server and your local development machine. You can install it via your package manager of choice or download and install it manually from [nodejs.org](https://nodejs.org). Node.js comes with its own package manager called [npm](https://www.npmjs.com/).

⚠️ git, Node.js and npm are crucial to create your customized CovApp-version. Before you continue, make sure the following commands look similar in your command line/terminal.

#### Check if Node.js is properly installed by running its `version` command

```sh
node --version
# v16.16.1
```

#### Check if npm is properly installed by running its `version` command

```sh
npm --version
# 6.14.12
```

#### Check if git is properly installed by running its `version` command

```sh
git --version
# git version 2.30.1
```

## Forking of the COMPASS-NumApp-Web repository

The recommended way of developing your custom version of the COMPASS-NumApp-Web is to fork this repository. A GitHub fork gives you the possibility to make a "copy" of the original repository and perform changes while keeping the chance to receive future updates. To find more information about the concept of a fork, visit [GitHub's documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

## Install

After you forked the repository and have a copy of the application code stored in your personal GitHub account, clone your fork to your local machine.

```sh
git clone https://github.com/YOUR-USERNAME/compass-numapp-web
> Cloning into `compass-numapp-web`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Navigate into the new directory.

```sh
cd compass-numapp-web
```

The application heavily relies on dependencies that are served via npm with install-scripts enabled. To install all dependencies run `npm ci` inside of the `compass-numapp-web` directory.

```sh
npm ci
```

## Essential development and release commands

To develop and build the application, two primary commands are available. Both commands build and bundle the application in the `www` directory.

### `npm start` for local development

Use `npm start` for main development. The command bundles the code and starts a local webserver at `localhost:3434`. The `start` command reacts to file changes inside of the repository and rebuilds the updated application.

Its output should look as follows:

```sh
npm start

> compass-numapp-web@1.0.0 start /Users/YOUR-USERNAME/Documents/GitHub/compass-numapp-web
> npm run build:dev


> compass-numapp-web@1.0.0 build:dev /Users/YOUR-USERNAME/Documents/GitHub/compass-numapp-web
> npm run build -- --dev --watch --serve --no-open


> compass-numapp-web@1.0.0 build /Users/YOUR-USERNAME/Documents/GitHub/compass-numapp-web
> stencil build "--dev" "--watch" "--serve" "--no-open"

[29:18.6]  @stencil/core
[29:18.9]  v2.5.2 🛥
[29:21.8]  build, app, dev mode, started ...
[29:21.8]  transpile started ...
[29:25.9]  transpile finished in 4.06 s
[29:25.9]  copy started ...
[29:25.9]  generate lazy started ...
[29:26.4]  copy finished (16 files) in 485 ms
[29:28.8]  generate lazy finished in 2.88 s
[29:28.8]  build finished, watching for changes... in
           6.98 s

[29:28.8]  http://localhost:3434/
```

⚠️ It is not recommended to upload/deploy the `www` directory after running `npm start`. Use `npm run build` instead.

### `npm run build` to generate a deployable application

Use `npm run build` to build a release-ready application. The command prepares and minifies the source code for a production environment.

Its output should look as follows:

```sh
npm run build

> compass-numapp-web@1.0.0 build /Users/YOUR-USERNAME/Documents/GitHub/compass-numapp-web
> stencil build

[30:34.1]  @stencil/core
[30:34.3]  v2.5.2 🛥
[30:37.0]  build, app, prod mode, started ...
[30:37.1]  transpile started ...
[30:41.0]  transpile finished in 3.98 s
[30:41.0]  copy started ...
[30:41.0]  generate lazy started ...
[30:41.5]  copy finished (16 files) in 436 ms
[30:47.6]  generate lazy finished in 6.53 s
[30:47.6]  build finished in 10.56 s

```

### Deployment of the application

After a successful `npm run build` the `www` directory includes a JavaScript application that is deployable and completely works by itself.

⚠️ The generated code bundles a modern single page application. Your hosting service has to offer the possibility to serve the same `index.html` file with a `200` HTTP status code for different routes (`/`, `/imprint`, ...).

⚠️ There is additional [server-side logic](https://github.com/NUMde/compass-numapp-backend) needed to properly run the application.

**After a successful `npm run build` command you can start [customizing your WebApp](./CUSTOMIZATION.md).**

---

## Additional development commands

For advanced development, the application includes several other commands. **You only need these commands if you want to perform changes going further than [the provided customization options](./CUSTOMIZATION.md).**

```sh
# Run the unit tests once
npm test

# Run a production build and visualize the generated bundle
npm run analyze

# Run the unit tests and watch for file changes during development
npm run test:watch

# Automatically fix potential code formatting issues
npm run code-format
```

## Code formatting

We're relying on [Prettier](https://prettier.io/) as our code formatter tool of choice. You can find the defined rules in the `.prettierrc` file and the ignored files at `.prettierignore`.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command.

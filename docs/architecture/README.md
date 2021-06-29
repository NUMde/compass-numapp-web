# Architecture

See the project's [architecture documentation](https://github.com/NUMde/compass-numapp/tree/main/docs/architecture) for a high-level overview of the different components of NUM Compass.
In the architecture diagram, this web client has the same role as component `C200 (Mobile App)`.

The mobile app and this web app are interchangeable depending on your use case. The web app supports all recent mobile and desktop browsers and
devices. Officially, the most recent two major versions of Chrome, Firefox, Safari, Edge and Opera along with their mobile derivatives are supported.
The underlying framework Stencil is also compatible with [older browser versions](https://stenciljs.com/docs/browser-support), so while not officially supported, the web client
will also likely work with those older versions.

## Stencil / Web Components

[Stencil](https://stenciljs.com/) is a framework/toolchain to generate reusable standard web components. Read more about web components [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Development-related folder structure

The root folder contains configuration files required for installation and building of the application, along with linting configurations and the environment file.

### `src`

All files relevant for development are in this folder.

#### `src/components`

Holds all web components along with their displaying logic. The main component is `app-root`, which contains the wrapper and routing logic for all view components. It also renders the outer layout and initializes the authentication logic.

⚠️ Additionally to these components, there are also references to components starting with a `d4l-` prefix. These come from [Data4Life](https://www.data4life.care)'s core components library, a collection of reusable components that are used across all Data4Life-developed apps.
For more information, visit the module's [npm page](https://www.npmjs.com/package/@d4l/web-components-library) and the [storybook site](https://storybook.d4l.io) which contains a list of all components and their properties / configuration options.

#### `src/config`

Holds the core configuration and translations. The configuration provides an easy way to
change the behavior of the app, e.g. by switching on or off certain features.
Individual values can be overridden in the `src/custom` folder. See the [customization documentation](../customization/README.md) for more information.

#### `src/custom`

Provides a fork-friendly way to overwrite individual configuration options, theme the app (change assets like the logo or change colors and much more) or change the translations.
For more information, see the [customization documentation](../customization/README.md).

#### `src/global`

Initializes the reusable [Data4Life](https://www.data4life.care) web components (see note above in the `src/components` documentation) as well as the global styles and assets (both can be easily overridden or extended in the `src/custom` folder).

#### `src/models`

Contains the models which allow an easy way to work e.g. with questionnaire questions.

#### `src/services`

Contains services to be called by the views and stores. This is also where the calls to the backend are made.

#### `src/stores`

Contains stores for the state that is reused across multiple components or persisted. There are temporary and persisted (localStorage) stores.
Components also have their own local state which is used when it's not relevant for other components.
Persisted stores can also be temporary when persistence is disabled in the config.

#### `src/types`

Holds TypeScript types that are used in multiple places. The individual services, stores etc. can also contain and export their own local types.

#### `src/utils`

Contains utility functions such as the questionnaire utils to build the questionnaire response or encrypt it.

### `www`

Contains the build output. This contents of this folder can be uploaded when deploying the application.

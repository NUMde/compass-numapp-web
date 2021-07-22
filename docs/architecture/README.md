# Architecture

The NUM COMPASS web app is part of the NUM COMPASS services architecture. For a high-level overview of the NUM COMPASS components, see the project's [architecture documentation](https://github.com/NUMde/compass-numapp/tree/main/docs/architecture). The web app and mobile app are interchangeable depending on your use case.


## Stencil and web components

The web app was built using [Stencil](https://stenciljs.com/). Stencil is a toolchain that generates reusable standard web components. For more about web components, see the [Mozilla developer documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Development-related folder structure

The root folder contains configuration files for installing, developing, and building the app.

### `src`

Contains all files relevant for development.

#### <a name="components"></a> `src/components`

Contains all web components and their displaying logic. The main component is `app-root`, which contains the wrapper and routing logic for all view components. `app-root` also renders the outer layout and initializes the authentication logic.

⚠️ As well as NUM COMPASS components, `src/components` includes references to components starting with a d4l- prefix. Components with a d4l- prefix come from [Data4Life](https://www.data4life.care)'s core components library, a collection of reusable components that all Data4Life-developed apps use.
For more information, visit the module's [npm page](https://www.npmjs.com/package/@d4l/web-components-library) and the [storybook site](https://storybook.d4l.io). The storybook site contains a complete list of components and their properties and configuration options.

#### `src/config`

Contains the core configuration and translations. Use the configuration to change the behavior of the app. You can override individual values in the `src/custom` folder.

#### `src/custom`

Allows you to:
- Overwrite individual configuration options
- Theme the app, including changing assets like the logo or colors
- Change the translations

For more about customization, see the [customization documentation](../customization/README.md).

#### `src/global`

Initializes the reusable [Data4Life](https://www.data4life.care) web components and the global styles and assets. You can override or extend those in the `src/custom` folder. For more about Data4Life web components, see the [src/components](#components) section.

#### `src/models`

Contains models that make working with questionnaire questions easier.

#### `src/services`

Contains services to be called by the views and stores. Calls to the backend are also made in `src/services`.

#### `src/stores`

Contains stores for the state, which is reused or persisted across multiple components. There are temporary and persisted (localStorage) stores.
Components also have their own local state, which is used when the state isn't relevant for other components.
If persistence is disabled in the config, persisted stores act like temporary stores. This means the stores keep the state in the runtime memory instead of persisting it.

#### `src/types`

Contains TypeScript types that are used in multiple places. The individual services, stores, and so on, can also contain and export their own local types.

#### `src/utils`

Contains utility functions, such as the questionnaire utils, to build or encrypt the questionnaire response.

### `www`

Contains the build output. The `www` folder's content can be uploaded when deploying the application.

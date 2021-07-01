# Customization

The `src/custom` folder provides an entry point to customizing this web app to your needs.
It contains an interface to modify the core configuration and styles as well as assets and it also includes configuration examples.

## Core vs. custom config

The core configuration from `src/config` contains feature flags and other settings that control certain aspects of the web app.
All core settings can be overwritten with custom ones by declaring them in the `src/custom` folder.
This structure makes it easier to fork the project and customize it to your needs, but still stay up-to-date with the latest commits
from the upstream without having to deal with merge conflicts, as the files in `src/custom` won't likely be touched by the upstream
in the future.

### `src/custom/config.ts`

Add your config modifications in this file. Below there is a list of all available config values and their effect.

### `src/custom/styles.css`

Add your css modifications in this file. In case you want to overwrite a css property but your change is not applied, it is a best practise to first try to increase the selector specifity before using `!important`.

⚠️ Colors, spacings, font sizes and others are easily modified by changing the value of the underlying css variable. An example of how to do that can be found in the custom `styles.css` file.

### `src/custom/assets`

Place your own assets like your logo in this folder. To overwrite the core logo, [PWA manifest](https://web.dev/progressive-web-apps) or favicon, the file names must exactly match the structure in `src/global/assets`.

### `src/custom/examples`

Here you can find configuration examples.

## List of configuration settings

### `FEATURES_ENABLE_PERSISTENCE`

Enable persisting the user language, session, unsubmitted questionnaire answers and more in localStorage

### `FEATURES_SHOW_LOGOUT`

Renders a logout button

### `FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES`

Allows user to select dates that are in the future in questionnaires with date questions

### `FEATURES_QUESTIONNAIRE_SHOW_LINKIDS`

Renders question numbers in the questionnaire

### `FEATURES_QUESTIONNAIRE_SHOW_TREE`

Shows the question overview (tree view) when opening the questionnaire

### `FEATURES_SUPPORT_QR_CODE`

Enables an option to scan a QR code to log in. The QA code needs to resolve to a JSON-stringified object that holds two properties (the app name and the participation code (also known as subject or user ID)).

⚠️ With the default configuration, a QR code needs consist of a JSON string like this:

```json
{ "AppIdentifier": "COMPASS", "SubjectId": "my-participation-code" }
```

The individual expected QR props can be modified by changing other configuration settings (`QR_APP_NAME`, `QR_PROP_APP_NAME` and `QR_PROP_USER_ID`). More below.

### `PERSISTENCE_SHOW_CHOICE`

Renders the "remember me" checkbox

### `QR_APP_NAME`

Name of the app as it is expected to be embedded into the QR code. The purpose is to avoid collisions with QR codes for other apps.
When the embedded app name in the QR code does not match the expectation, an error is shown that the scanned QR code belongs to another app.

### `QR_PROP_APP_NAME`

Name of the property holding the app name

### `QR_PROP_USER_ID`

Name of the property holding the user ID (participation code)

### `QUESTIONNAIRE_TREE_SHOW_DISABLED_ITEMS`

Show disabled questions in the questionnaire overview (tree view). Disabled questions are items whose dependencies (expected answers to other questions) are not fulfilled at the current time.

### `LANGUAGES`

The available languages of the application a user can choose from.
If only one language is given, the user cannot choose and the language selector will be hidden.
Languages have to be defined in the `NUMLanguage` typescript type. For more information see the config examples.

### `TRANSLATIONS`

Translation objects used by `i18next`. For more information see the config examples.

### `FALLBACK_LANGUAGE_CODE`

The application language is chosen by a set of conditions when opening the app:

- if a `lng` query parameter is part of the url and a language with the corresponding language code exists, it is chosen
- else if the user previously had chosen and persisted a language, it is chosen
- else if the user's browser language is available as app language, it is chosen
- else if the fallback language exists, it is chosen
- else the first available language is chosen

The `FALLBACK_LANGUAGE_CODE` defines the fallback language code in case the first methods fail (e.g. first time visitor whose browser language is not available as app language).

### `TRIGGER_RULES`

There is a set of flags that is sent to the backend next to the actual questionnaire response. These flags or triggers are used to determine if the next questionnaire has to be a different one or if the interval of questionnaires has to be adapted.
The reason behind this is that the questionnaire response is encrypted, so the backend can not read it, but it still needs some information so it can correctly select the next questionnaire.

An example trigger rule:

```ts
{
  type: TRIGGER_KEY_BASIC,
  answers: {
    '1.11': ['Option A'],
    '1.10.1': [true],
  }
}
```

This rule means: Set the `TRIGGER_KEY_BASIC` flag to `true` if one of the following is true (logical OR):

- Questionnaire item with `linkId` `1.11` is answered with value `Option A`
- or questionnaire item with `linkId` `1.10.1` is answered with boolean value `true`

If none of the above criteria are met, the flag is submitted as `false`.
For checkbox questions that have multiple answers, you can also define multiple answers of a question that have to be selected in order to fulfill the trigger criteria (logical AND). To do that, add more values to the array.

### `ROUTES`

An object of routes used in the app. You can change this configuration in case e.g. one of the routes conflicts with another uri in a scenario where the app runs in an embedded context.

### `FOOTER_LINKS`

An array of links rendered in the footer and navigation menu footer. For usage examples have a look at `src/config/navigation.ts`

### `NAVIGATION_ITEMS`

An array of items rendered in the navigation menu. For usage examples have a look at `src/config/navigation.ts`

⚠️ For a list of available icons, have a look [here](https://storybook.d4l.io/?path=/story/components-icon).

### `TRIGGER_KEY_BASIC`

Name of the basic trigger flag submitted to the backend. Only change this when the expected property name has changed in the backend.

### `TRIGGER_KEY_SPECIAL`

Name of the special trigger flag submitted to the backend. Only change this when the expected property name has changed in the backend.

### `FHIR_SUPPORTED_EXTENSION_BASE_URLS`

An array of allowed FHIR extension base urls to be used in questionnaires

### `FHIR_RESPONSE_TRANSFERRED_EXTENSION_KEYS`

An array of questionnaire item extension keys to be transferred over from the questionnaire item to the corresponding questionnaire response item.
This provides a way to attach meta information to questionnaire (response) items. For more information, visit [the implementation guide](https://github.com/NUMde/compass-implementation-guide).

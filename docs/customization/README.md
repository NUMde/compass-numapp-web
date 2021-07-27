# Customization

The `src/custom` folder provides all you need to start customizing the NUM COMPASS
web app. The folder contains an interface to modify the core configuration and styles, as well as assets. The folder also includes configuration examples.

## Core versus custom config

The core configuration from `src/config` contains feature flags and other settings that control certain aspects of the app.
You can overwrite all core settings with custom settings by declaring them in the `src/custom` folder.
This structure helps you fork the project and customize it while staying up to date with the latest commits from the upstream. In this way, you avoid merge conflicts, as the upstream is unlikely to cause changes to files in `src/custom`.

### `src/custom/config.ts`

Add your config modifications in this file. For all available config values and their effects, see the [Configuration settings](#configuration) section.

### `src/custom/styles.css`

Add your css modifications in this file. If you overwrite a css property but your change isn’t applied, increase the selector specificity rather than using `!important`.

⚠️ You can modify colors, spacings, font sizes, and so on, by changing the value of the underlying css variable. See the custom `styles.css` file for an example.

### `src/custom/assets`

Add your own assets, like your logo, to this folder. To overwrite the core logo, [PWA manifest](https://web.dev/progressive-web-apps) or favicon, the asset file names must exactly match the structure in `src/global/assets`.

### `src/custom/examples`

Contains configuration examples

## <a name="configuration"></a>Configuration settings

### `FEATURES_ENABLE_PERSISTENCE`

Enables persisting the user language, session, unsubmitted questionnaire answers, and more in localStorage

### `FEATURES_AUTO_LOGOUT`

Expires the session automatically after a period of inactivity defined with the [`AUTO_LOGOUT_COUNTDOWN`](#auto_logout_countdown) configuration setting.
The countdown is reset every time the user interacts with the page (clicks, taps or types).

### `FEATURES_SHOW_LOGOUT`

Renders a logout button

### `FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES`

Allows the user to select future dates in questionnaires with date questions

### `FEATURES_QUESTIONNAIRE_SHOW_LINKIDS`

Renders question numbers in the questionnaire

### `FEATURES_QUESTIONNAIRE_SHOW_TREE`

Shows the question overview (tree view) when opening the questionnaire

### `FEATURES_SUPPORT_QR_CODE`

Enables an option for scanning a QR code to log in. The QA code must resolve to a JSON-stringified object that holds two properties: the app name and the participation code. The participation code is also known as subject or user ID.

⚠️ With the default configuration, a QR code must consist of a JSON string like this:

```json
{ "AppIdentifier": "COMPASS", "SubjectId": "my-participation-code" }
```

You can modify the individual expected QR props by changing other configuration settings:
[`QR_APP_NAME`](#qr_app_name), [`QR_PROP_APP_NAME`](#qr_prop_app_name), and [`QR_PROP_USER_ID`](#qr_prop_user_id).

### `PERSISTENCE_SHOW_CHOICE`

Renders the "remember me" checkbox

ℹ️ Depends on [`FEATURES_ENABLE_PERSISTENCE`](#features_enable_persistence)

### `AUTO_LOGOUT_COUNTDOWN`

The period of inactivity in milliseconds after which the user is automatically logged out

ℹ️ Depends on [`FEATURES_AUTO_LOGOUT`](#features_auto_logout)

### `QR_APP_NAME`

The name of the web app as it's expected to be embedded into the QR code. This helps avoid collisions with other app QR codes.
When the embedded web app name in the QR code doesn't match the expectation, an error is displayed stating that the scanned QR code belongs to another app.

ℹ️ Depends on [`FEATURES_SUPPORT_QR_CODE`](#features_support_qr_code)

### `QR_PROP_APP_NAME`

The name of the property holding the app name

ℹ️ Depends on [`FEATURES_SUPPORT_QR_CODE`](#features_support_qr_code)

### `QR_PROP_USER_ID`

The name of the property holding the user ID (participation code)

ℹ️ Depends on [`FEATURES_SUPPORT_QR_CODE`](#features_support_qr_code)

### `QUESTIONNAIRE_TREE_SHOW_DISABLED_ITEMS`

Shows disabled questions in the questionnaire overview (tree view). Disabled questions are items whose dependencies, which are expected answers to other questions, aren't fulfilled at the current time.

ℹ️ Depends on [`FEATURES_QUESTIONNAIRE_SHOW_TREE`](#features_questionnaire_show_tree)

### `LANGUAGES`

The possible languages that the user can choose to display the web app in.
You must define languages in the `NUMLanguage` typescript type. If you define only one language, the language selector is hidden. For more information, see the `src/custom/examples` folder.

### `TRANSLATIONS`

Translation objects that `i18next` uses. For more information, see the `src/custom/examples` folder.

### `FALLBACK_LANGUAGE_CODE`

When the app is opened, the app language is determined by the following conditions:

1. `if` a `lng` query parameter is part of the URL and a language with the corresponding language code exists, this language is chosen.
2. `else if` the user previously had chosen and persisted a language, this language is chosen.
3. `else if` the user's browser language is available as app language, this language is chosen.
4. `else if` the fallback language is defined, this language is chosen.
5. `else` the first available language is chosen.

The `FALLBACK_LANGUAGE_CODE` is the app language that's set if conditions 1 to 3 aren't met. For example, the fallback language is chosen for the first time visitor whose browser language isn't available as the app language.

### `TRIGGER_RULES`

A set of triggers are sent to the backend next to the questionnaire response. These triggers determine which questionnaire to send the user next and when.
We send the triggers next to the questionnaire response because the questionnaire response is encrypted, meaning the backend can't read it. However, the backend needs some information to correctly select the next questionnaire.

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

- questionnaire item with `linkId` `1.11` is answered with value `Option A`
- or questionnaire item with `linkId` `1.10.1` is answered with boolean value `true`

If none of the above criteria are met, the flag is submitted as `false`.
For checkbox questions that have multiple answers, you can define multiple answers that must be selected to fulfill the trigger criteria (logical AND). To do that, add more values to the array.

### `ROUTES`

An object of routes used in the app. Change this configuration if, for example, one of the routes conflicts with another URI in a scenario where the app runs in an embedded context.

### `FOOTER_LINKS`

An array of links rendered in the footer and navigation menu footer. See `src/config/navigation.ts` for usage examples.

### `NAVIGATION_ITEMS`

An array of items rendered in the navigation menu. See `src/config/navigation.ts` for usage examples.

⚠️ For a list of available icons, visit the [Data4Life components library](https://storybook.d4l.io/?path=/story/components-icon).

### `TRIGGER_KEY_BASIC`

Name of the basic trigger flag submitted to the backend. Change this only when the expected property name has changed in the backend.

### `TRIGGER_KEY_SPECIAL`

Name of the special trigger flag submitted to the backend. Change this only when the expected property name has changed in the backend.

### `FHIR_SUPPORTED_EXTENSION_BASE_URLS`

An array of parsed FHIR extension base URLs to be used in questionnaires

### `FHIR_RESPONSE_TRANSFERRED_EXTENSION_KEYS`

An array of questionnaire item extension keys to be transferred from the questionnaire item to its corresponding questionnaire response item.
This provides a way to attach meta information to questionnaire (response) items. For more information, visit the [NUM COMPASS implementation guide](https://github.com/NUMde/compass-implementation-guide).

### `API_QUESTIONNAIRE_URI`, `API_QUEUE_URI`, `API_USER_URI`

Adaptable API endpoint URIs

export default {
  authenticate: {
    continue: 'Proceed',
    error: {
      code_0: 'An error happened while establishing a network connection. Please try again later.',
      code_401: 'The participation code was not recognized. Please verify that your input is correct.',
      qr_format: 'Invalid QR code format. Please scan a valid code.',
      qr_wrong_app:
        'This QR code belongs to another app. Please verify that you have entered the correct internet address and open the correct app.',
    },
    headline: 'Login',
    infotext:
      'Enter your participation code to proceed. In case your device is equipped with a camera and you have received a QR code, you can simply scan it instead of entering the code.',
    input_label: 'Your participation code',
  },
  dashboard: {
    button: {
      logout: 'Logout',
      questionnaire: 'Open questionnaire',
      report: 'Report symptoms',
    },
    headline: {
      new_user: 'Welcome!',
      returning_user: 'Welcome back!',
    },
    infotext: {
      questionnaire_available: {
        first_text:
          "This text is rendered in case that there is an unsubmitted questionnaire available. The questionnaire's deadline is",
        second_text:
          'This additional text is displayed in case that there is an unsubmitted questionnaire available.',
      },
      questionnaire_not_available: {
        first_text:
          'This text is rendered when there is no questionnaire available at the moment. The next questionnaire can be filled out starting at',
        second_text:
          'This additional text is displayed in case there is no questionnaire available at the moment. Should you have symptoms, you can report this at any time.',
      },
    },
  },
  general: {
    footer_copyright_note: '© {{ year }} NUM COMPASS',
    header_logo: 'NUM COMPASS web app',
    imprint: 'Imprint',
    privacy_policy: 'Privacy policy',
    terms_of_use: 'Terms of use',
  },
  notification_bar: {
    dismiss_button: 'Close',
  },
  questionnaire: {
    back: 'Back',
    confirm_submit: {
      error:
        'An error happened while sending your answers. Please try it again at a later time. You may close your browser and proceed later without losing your answers.',
      headline: 'Submit questionnaire',
      infotext: 'You have answered all questions. By proceeding, your data will be submitted.',
    },
    continue: 'Proceed',
    date_input: {
      error: 'Please verify your input.',
      day: 'Day',
      month: 'Month',
      open_date_picker: 'Open a date picker',
      year: 'Year',
    },
    fetch_failed: 'An error happened while retrieving the questionnaire. Please try again later.',
    fetch_retry: 'Retry',
    finish: 'Return to overview',
    group: 'Group {{ number }}',
    question: 'Question {{ number }}',
    question_type_unsupported: 'Questions of type "{{ type }}" are not supported at the moment!',
    success: {
      headline: 'Success',
      infotext: 'Thank you for your contribution!',
    },
  },
  report: {
    confirm_submit: {
      back: 'Back',
      continue: 'Submit',
      error: 'Unfortunately an error happened. Please try again later.',
      headline: 'Report symptoms',
      infotext: 'You can report that you have symptoms. Click the button below to submit that information.',
    },
    success: {
      finish: 'Return to overview',
      headline: 'Report symptoms',
      infotext:
        'You have successfully reported that you have symptoms. A new questionnaire will be provided to you shortly.',
    },
  },
  welcome: {
    continue: 'Proceed',
    headline: 'Welcome',
    infotext: 'Here is the place for a short and informative introductory text about the app.',
  },
};

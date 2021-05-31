export default {
  authenticate: {
    continue: 'Fortfahren',
    error: {
      code_0:
        'Es konnte leider keine Netzwerkverbindung aufgebaut werden. Bitte versuchen Sie es später erneut.',
      code_401:
        'Der eingegebene Teilnahmecode konnte leider nicht erkannt werden. Bitte überprüfen Sie Ihre Eingabe.',
      qr_format:
        'Das Format des gescannten QR-Codes ist leider ungültig. Bitte scannen Sie einen gültigen Code ein.',
      qr_wrong_app:
        'Der gescannte QR-Code ist zur Nutzung mit einer anderen App als dieser gedacht. Bitte prüfen Sie die eingegebene Internetadresse und rufen Sie die richtige App auf.',
    },
    headline: 'Anmelden',
    infotext:
      'Geben Sie im Textfeld Ihren Teilnahmecode ein, um fortzufahren. Wenn Sie einen QR-Code erhalten haben und Ihr Endgerät über eine Kamera verfügt, können Sie diesen stattdessen einfach einscannen.',
    input_label: 'Ihr Teilnahmecode',
  },
  dashboard: {
    button: {
      logout: 'Abmelden',
      questionnaire: 'Fragebogen ausfüllen',
      report: 'Symptome melden',
    },
    headline: {
      new_user: 'Willkommen!',
      returning_user: 'Willkommen zurück!',
    },
    infotext: {
      questionnaire_available: {
        first_text:
          'Dieser Text wird angezeigt, falls es einen verfügbaren Fragebogen gibt, der noch nicht beantwortet wurde. Der Fragebogen muss ausgefüllt werden bis zum',
        second_text:
          'Dieser weitere Text wird angezeigt, falls es einen verfügbaren Fragebogen gibt, der noch nicht beantwortet wurde. Wenn Sie Symptome haben, können Sie diese jederzeit melden.',
      },
      questionnaire_not_available: {
        first_text:
          'Dieser Text wird angezeigt, wenn derzeit kein Fragebogen zum Ausfüllen zur Verfügung steht. Der nächste Fragebogen kann ausgefüllt werden ab dem',
        second_text:
          'Dieser weitere Text wird angezeigt, wenn derzeit kein Fragebogen zum Ausfüllen zur Verfügung steht. Wenn Sie Symptome haben, können Sie diese jederzeit melden.',
      },
    },
  },
  general: {
    footer_copyright_note: '© {{ year }} NUM COMPASS',
    header_logo: 'NUM COMPASS web app',
    imprint: 'Impressum',
    privacy_policy: 'Datenschutzerklärung',
    terms_of_use: 'Nutzungsbedingungen',
  },
  notification_bar: {
    dismiss_button: 'Schließen',
  },
  questionnaire: {
    back: 'Zurück',
    continue: 'Fortfahren',
    date_input: {
      error: 'Bitte überprüfen Sie das Eingabefeld.',
      day: 'Tag',
      month: 'Monat',
      year: 'Jahr',
    },
    group: 'Gruppe {{ number }}',
    question: 'Frage {{ number }}',
  },
  welcome: {
    continue: 'Weiter',
    headline: 'Willkommen',
    infotext: 'Hier steht ein kurzer und informativer Einführungstext zur App.',
  },
  imprint: {
    content: '<h1>Impressum</h1>[TRANSLATION/CONTENT needed for translation key: imprint.content in src/global/translations/de.ts]'
  },
  terms: {
    content: '<h1>Nutzungsbedingungen</h1>[TRANSLATION/CONTENT needed for translation key: terms.content in src/global/translations/de.ts]'
  },
  privacy_policy: {
    content: '<h1>Datenschutzerklärung</h1>[TRANSLATION/CONTENT needed for translation key: privacy_policy.content in src/global/translations/de.ts]'
  }
};

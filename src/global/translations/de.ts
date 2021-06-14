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
          'Dieser weitere Text wird angezeigt, falls es einen verfügbaren Fragebogen gibt, der noch nicht beantwortet wurde.',
      },
      questionnaire_not_available: {
        first_text:
          'Dieser Text wird angezeigt, wenn derzeit kein Fragebogen zum Ausfüllen zur Verfügung steht. Der nächste Fragebogen kann ausgefüllt werden ab dem',
        second_text:
          'Dieser weitere Text wird angezeigt, wenn derzeit kein Fragebogen zum Ausfüllen zur Verfügung steht. Wenn Sie Symptome haben, können Sie dies jederzeit melden.',
      },
    },
  },
  general: {
    footer_copyright_note: '© {{ year }} NUM COMPASS',
    header_logo: 'NUM COMPASS web app',
    imprint: 'Impressum',
    privacy_policy: 'Datenschutzerklärung',
    terms_of_use: 'Nutzungsbedingungen',
    contact: 'Kontakt',
  },
  notification_bar: {
    dismiss_button: 'Schließen',
  },
  questionnaire: {
    back: 'Zurück',
    confirm_submit: {
      error:
        'Beim Senden Ihrer Antworten ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut. Sie können Ihren Browser schließen und später fortfahren, ohne Ihre Antworten zu verlieren.',
      headline: 'Fragebogen absenden',
      infotext: 'Sie haben alle Fragen beantwortet. Indem Sie fortfahren, werden Ihre Angaben übermittelt.',
    },
    continue: 'Fortfahren',
    date_input: {
      error: 'Bitte überprüfen Sie das Eingabefeld.',
      day: 'Tag',
      month: 'Monat',
      year: 'Jahr',
    },
    fetch_failed:
      'Der Fragebogen konnte leider nicht abgerufen werden. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.',
    fetch_retry: 'Erneut versuchen',
    finish: 'Zur Übersicht zurückkehren',
    group: 'Gruppe {{ number }}',
    question: 'Frage {{ number }}',
    question_type_unsupported: 'Fragen vom Typ "{{ type }}" werden derzeit leider nicht unterstützt!',
    success: {
      headline: 'Vielen Dank!',
      infotext: 'Vielen Dank für Ihren Beitrag!',
    },
  },
  report: {
    confirm_submit: {
      back: 'Zurück',
      continue: 'Absenden',
      error: 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      headline: 'Symptome melden',
      infotext:
        'Falls Sie Symptome haben, können Sie dies melden. Klicken Sie auf die nachfolgende Schaltfläche, um die Information zu übermitteln.',
    },
    success: {
      finish: 'Zur Übersicht zurückkehren',
      headline: 'Symptome melden',
      infotext:
        'Sie haben erfolgreich gemeldet, dass Sie Symptome haben. Es wird Ihnen zeitnah ein weiterer Fragebogen zur Verfügung gestellt.',
    },
  },
  welcome: {
    continue: 'Weiter',
    headline: 'Willkommen',
    infotext: 'Hier steht ein kurzer und informativer Einführungstext zur App.',
  },
  imprint: {
    headline: 'Impressum',
    content: '[TRANSLATION/CONTENT needed for translation key: imprint.content in src/global/translations/de.ts]'
  },
  terms: {
    headline: 'Nutzungsbedingungen',
    content: '[TRANSLATION/CONTENT needed for translation key: terms.content in src/global/translations/de.ts]'
  },
  privacy_policy: {
    headline: 'Datenschutzerklärung',
    content: '[TRANSLATION/CONTENT needed for translation key: privacy_policy.content in src/global/translations/de.ts]'
  }
};

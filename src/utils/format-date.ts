import stores from 'stores';

/**
 * Formats a provided date based on the selected language code with the default app * date options
 *
 * @param date - date object
 * @param languageCode - selected language code e.g. de-DE
 * @param formatting - optional date formatting options
 *
 * @returns formatted date
 */
export const formatDate = (date: Date, formatting?: Intl.DateTimeFormatOptions) => {
  const options = formatting ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(stores.i18n.language.code, options).format(date);
};

export const mergeTranslations = (a = {}, b = {}) =>
  Object.keys(b).reduce(
    (translations, key) =>
      Object.assign(translations, {
        [key]: typeof b[key] === 'object' ? mergeTranslations(a?.[key], b[key]) : b[key],
      }),
    { ...a }
  );

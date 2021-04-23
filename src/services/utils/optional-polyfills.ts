/*
 * These are polyfills for some cases where
 *
 * - the browsers supporting them might be just on the edge of our support plan,
 * for instance the .0 release of a pre-previous Safari, so Stencil's nomdule version
 * would not normally catch and seems overblown
 *
 * - there are no security implications for the polyfill itself or its use,
 * for instance we would never polyfill crypto functions
 *
 * */

export const addOptionalPolyfills = () => {
  if (!Object.values) {
    Object.values = function (obj) {
      // Object.keys came with IE9 so let's assume that's safe
      return Object.keys(obj).map(function (e) {
        return obj[e];
      });
    };
  }

  // https://stackoverflow.com/a/53327815
  if (typeof Promise.prototype.finally !== 'function') {
    Promise.prototype.finally = {
      finally(fn) {
        const onFinally = (callback) => Promise.resolve(fn()).then(callback);
        return this.then(
          (result) => onFinally(() => result),
          (reason) => onFinally(() => Promise.reject(reason))
        );
      },
    }.finally;
  }
};

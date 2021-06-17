export const IS_MOBILE = /[^\w](android|iphone|ipad|ipod)[^\w].*[^\w]mobile[^\w]/i.test(navigator.userAgent);
export const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
export const IS_DESKTOP = !IS_MOBILE;
export const IS_POINTER = !IS_TOUCH;

export default {
  IS_DESKTOP,
  IS_MOBILE,
  IS_POINTER,
  IS_TOUCH,
};

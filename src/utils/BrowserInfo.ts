type TBrowser =
  | "android"
  | "firefox"
  | "edge"
  | "chrome"
  | "chrome-ios"
  | "ie"
  | "ios"
  | "opera"
  | "safari";

export const isCordova = (window: any): boolean => Boolean(window.cordova);

export const isChromium = ({ window, navigator }: any): boolean =>
  !!window.chrome && !/Edge/.test(navigator.userAgent);

export const isTouchScreen = ({ window, document }: any): boolean =>
  "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch);

export const areWebComponentsSupported = (document: any) =>
  "registerElement" in document &&
  "import" in document.createElement("link") &&
  "content" in document.createElement("template");

export const browserInfo = ({ navigator }: { navigator: Navigator }): TBrowser | undefined => {
  if (/Android/.test(navigator.userAgent)) {
    return "android";
  } else if (/Edge/.test(navigator.userAgent)) {
    return "edge";
  } else if (/Firefox/.test(navigator.userAgent)) {
    return "firefox";
  } else if (/Google Inc/.test(navigator.vendor)) {
    return "chrome";
  } else if (/CriOS/.test(navigator.userAgent)) {
    return "chrome-ios";
  } else if (/Trident/.test(navigator.userAgent)) {
    return "ie";
  } else if (/(iPhone|iPad|iPod)/.test(navigator.platform)) {
    return "ios";
  } else if (/OPR/.test(navigator.userAgent)) {
    return "opera";
  } else if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
    return "safari";
  } else {
    return;
  }
};

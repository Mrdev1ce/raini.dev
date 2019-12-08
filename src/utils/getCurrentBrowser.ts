import Switch from "@raini/switch";

export type TBrowser =
  | "android"
  | "firefox"
  | "edge"
  | "chrome"
  | "chrome-ios"
  | "ie"
  | "ios"
  | "opera"
  | "safari";

export const isAndroid = (x: Navigator) => /Android/.test(x.userAgent);
export const isEdge = (x: Navigator) => /Edge/.test(x.userAgent);
export const isChrome = (x: Navigator) => "vendor" in x && /Google Inc/.test(x.vendor);
export const isChromeIos = (x: Navigator) => /CriOS/.test(x.userAgent);
export const isIe = (x: Navigator) => /Trident/.test(x.userAgent);
export const isIos = (x: Navigator) => "platform" in x && /(iPhone|iPad|iPod)/.test(x.platform);
export const isOpera = (x: Navigator) => /OPR/.test(x.userAgent);
export const isSafari = (x: Navigator) => /Safari/.test(x.userAgent) && !/Chrome/.test(x.userAgent);

export const getCurrentBrowser = (navigator: Navigator): TBrowser =>
  Switch<Navigator, TBrowser>(navigator)
    .case(isAndroid, "android")
    .case(isEdge, "edge")
    .case(isChrome, "chrome")
    .case(isChromeIos, "chrome-ios")
    .case(isIe, "ie")
    .case(isIos, "ios")
    .case(isOpera, "opera")
    .case(isSafari, "safari")
    .default("firefox");

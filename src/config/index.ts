export * from "./lanage";
export * from "./lib";

/** key提取正则 */
export const KEY_REG = /(?:[\s{\.]t)\(['"]([^]+?)['"]/g;

/**
 * http正则
 */
export const HTTP_REG =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

/**
 * 插件名
 */
export const EXTEND_NAME = "react-i18n-next";

/**
 * setting key
 */
export const ZH_URL_KEY = "zhUrl";

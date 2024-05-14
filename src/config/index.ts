export * from "./lanage";
export * from "./lib";

/** key提取默认正则 */
export const DEFAULT_KEY_REG =
  /(?:[\s{\.\()](?:t|i18n|I18n))\(['"]([^]+?)['"]\)/g;

export const genKeyReg = (translateFn?: string) => {
  return translateFn
    ? new RegExp(
        `(?:[\\s{\\.\\()](?:${translateFn}))\\([\'"]([^]+?)[\'"]\\)`,
        "g"
      )
    : DEFAULT_KEY_REG;
};

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
export const TRANSLATE_FN = "translateFn";

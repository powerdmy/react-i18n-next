import axios from "axios";
import * as vscode from "vscode";
import { EXTEND_NAME, KEY_REG } from "../config";

export async function getI18nResource(url: string) {
  const { data } = await axios.get(url);
  return data;
}

/**
 * 获取工作区配置
 * @param key
 * @returns
 */
export function getVsCodeConfig(key: string): string | null | undefined {
  return vscode.workspace.getConfiguration(EXTEND_NAME).get(key);
}

/**
 * 设置工作区配置
 * @param key
 * @param value
 * @returns
 */
export function setVsCodeConfig(key: string, value: any) {
  return vscode.workspace
    .getConfiguration(EXTEND_NAME)
    .update(key, value, false);
}

/**
 * key处理
 */
export class KeyDetector {
  static getKeyByContent(text: string) {
    const keys = (text.match(KEY_REG) || []).map((key) =>
      this.normalizeKey(key.replace(KEY_REG, "$1"), text)
    );

    return [...new Set(keys)];
  }

  static getKey(document: vscode.TextDocument, position: vscode.Position) {
    const keyRange = document.getWordRangeAtPosition(position, KEY_REG);

    const key = keyRange
      ? document.getText(keyRange).replace(KEY_REG, "$1")
      : undefined;

    if (!key) {
      return;
    }

    return this.normalizeKey(key, document.getText());
  }

  static getNsByText(text?: string): string {
    const NS_REG = /(?:useTranslation|useI18n)\(\[?['"](.*?)['"]/g;
    const nsKey = (text?.match(NS_REG) || [])[0] || "";
    return nsKey.replace(NS_REG, "$1");
  }

  static getNsByKey(key: string) {
    const [prefix, resetKey] = key.split(":");
    return resetKey ? prefix : undefined;
  }

  static normalizeKey(key: string, text?: string) {
    if (this.getNsByKey(key)) {
      return key.replace(":", ".");
    }

    const nsKey = this.getNsByText(text);

    if (!nsKey) {
      return key;
    }

    return `${nsKey}.${key}`;
  }
}

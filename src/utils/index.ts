const path = require("path");
const fs = require("fs");

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

/**
 *
 * @param filePath 项目路径
 * @param lookingForString 搜索关键词
 */
export function findStringByKey(filePath: string, lookingForString: string) {
  const resultFilePath: string[] = [];
  const excludeFileReg = /\.less$|\.css$|\.png$|\.svg$|\.jpg$|\.md$/g;
  const excludeFolderReg = /\.git|node_modules|build|dist|.next/g;

  recursiveReadFile(filePath);

  function recursiveReadFile(fileName: string) {
    if (!fs.existsSync(fileName)) {
      return;
    }
    if (isFile(fileName)) {
      check(fileName);
    }
    if (isDirectory(fileName)) {
      const files = fs.readdirSync(fileName);
      files.forEach((val: string) => {
        const pathName: string = path.join(fileName, val);
        if (isDirectory(pathName)) {
          recursiveReadFile(pathName);
        }
        if (isFile(pathName)) {
          check(pathName);
        }
      });
    }
  }

  function check(fileName: string) {
    if (isExcludeFiles(fileName)) {
      return;
    }

    const data = readFile(fileName);
    const exc = new RegExp(lookingForString);
    if (exc.test(data)) {
      resultFilePath.push(fileName);
    }
  }

  function isDirectory(fileName: string) {
    if (fs.existsSync(fileName) && !excludeFolderReg.test(fileName)) {
      return fs.statSync(fileName).isDirectory();
    }
  }

  function isFile(fileName: string) {
    if (fs.existsSync(fileName)) {
      return fs.statSync(fileName).isFile();
    }
  }

  function isExcludeFiles(fileName: string) {
    return excludeFileReg.test(fileName);
  }

  function readFile(fileName: string) {
    if (fs.existsSync(fileName)) {
      return fs.readFileSync(fileName, "utf-8");
    }
  }

  return resultFilePath;
}

import * as vscode from "vscode";
import { ZH_URL_KEY, HTTP_REG } from "./config";
import getI18n from "./getI18n";
import { setVsCodeConfig } from "./utils";

/**
 * 修改用户setting.json配置
 */
export default function updateUserVscodeSetting() {
  vscode.window
    .showInputBox({
      title: "设置",
      placeHolder: "请输入语料CDN地址",
    })
    .then((url) => {
      if (!url || !HTTP_REG.test(url)) {
        vscode.window.showErrorMessage("请输入正确的语料地址");
        return;
      }
      setVsCodeConfig(ZH_URL_KEY, url);
      getI18n(url);
    });
}

import * as vscode from "vscode";
import { lanage } from "./config";
import RegisterHover from "./hoverProvider";
import updateSetting from "./updateSetting";
import getI18n from "./getI18n";

export async function activate(context: vscode.ExtensionContext) {
  await getI18n(context);

  const disposables = [
    // hover i18n中文提示
    vscode.languages.registerHoverProvider(lanage, new RegisterHover(context)),
    // 同步语料
    vscode.commands.registerCommand("react-i18n-next.sync", () => {
      getI18n(context);
    }),
    // 添加配置
    vscode.commands.registerCommand("react-i18n-next.addZh", () => {
      updateSetting(context);
    }),
  ];

  context.subscriptions.push(...disposables);
}

export function deactivate() {}

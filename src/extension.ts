import * as vscode from "vscode";
import { lanage, ZH_URL_KEY } from "./config";
import RegisterHover from "./hoverProvider";
import updateSetting from "./updateSetting";
import getI18n from "./getI18n";
import EventBus from "./utils/eventBus";

export function activate(context: vscode.ExtensionContext) {
  getI18n();

  //todo ... 同步语料库到全局数据 eventBus
  EventBus.on("setI18n", (data: Record<string, string>) => {
    console.log(data);
    context.workspaceState.update(ZH_URL_KEY, data);
  });

  const disposables = [
    // hover i18n中文提示
    vscode.languages.registerHoverProvider(lanage, new RegisterHover(context)),
    // 同步语料
    vscode.commands.registerCommand("react-i18n-next.sync", getI18n),
    // 添加配置
    vscode.commands.registerCommand("react-i18n-next.addZh", updateSetting),
  ];

  context.subscriptions.push(...disposables);
}

export function deactivate() {}

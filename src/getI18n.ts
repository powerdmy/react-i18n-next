import { window } from "vscode";
import * as vscode from "vscode";
import { ZH_URL_KEY } from "./config";
import { getI18nResource, getVsCodeConfig } from "./utils";
import updateSetting from "./updateSetting";

/**
 * 根据url获取语料资源
 * @param inputUrl
 * @returns
 */
export default async function getI18n(
  context: vscode.ExtensionContext,
  inputUrl?: string
) {
  const url = inputUrl || getVsCodeConfig(ZH_URL_KEY);

  if (!url) {
    const okText = "去配置";
    const result = await window.showErrorMessage("请配置语料远端地址", okText);
    if (result === okText) {
      updateSetting(context);
    }
    return;
  }

  const data = await getI18nResource(url);
  context.workspaceState.update(ZH_URL_KEY, data);
  window.showInformationMessage("语料同步成功:" + url);
  return data;
}

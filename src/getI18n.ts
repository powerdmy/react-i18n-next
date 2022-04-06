import { window } from "vscode";
import { ZH_URL_KEY } from "./config";
import { getI18nResource, getVsCodeConfig } from "./utils";
import EventBus from "./utils/EventBus";
import updateSetting from "./updateSetting";

/**
 * 根据url获取语料资源
 * @param inputUrl
 * @returns
 */
export default async function getI18n(inputUrl?: string) {
  const url = inputUrl || getVsCodeConfig(ZH_URL_KEY);

  if (!url) {
    const okText = "去配置";
    const result = await window.showErrorMessage("请配置语料CDN地址", okText);
    if (result === okText) {
      updateSetting();
    }
    return;
  }

  getI18nResource(url).then((data) => {
    EventBus.emit("setI18n", data);
    window.showInformationMessage("语料同步成功:" + url);
  });
}

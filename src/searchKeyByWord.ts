import * as vscode from "vscode";
import { ZH_URL_KEY } from "./config";
import { findStringByKey } from "./utils";

interface OptionsType {
  key: string;
  label: string;
  path: string;
}

export default async function searchKeyByWord(
  context: vscode.ExtensionContext
) {
  const LANG: Record<string, string> | undefined =
    context.workspaceState.get(ZH_URL_KEY);

  if (!LANG) {
    vscode.window.showErrorMessage("corpus is missing");
    return;
  }

  const LANG_KEY = Object.keys(LANG);

  const folder = await getWorkspaceFolder();
  if (folder) {
    const word = await vscode.window.showInputBox({
      title: "Search for key by Chinese",
      placeHolder: "Please enter the Chinese words",
    });
    if (!word) {
      return;
    }

    const REG = new RegExp(word.trim() as string);
    const keys = LANG_KEY.filter((key) => REG.test(LANG[key])); // 模糊匹配中文 会匹配到多个Key

    if (keys.length) {
      const resultFileItems: OptionsType[] = findStringByKey(
        folder.uri.fsPath,
        keys
      ).map(({ key, absPath }) => {
        return {
          key,
          label:
            "$(explorer-view-icon)" + absPath.replace(folder.uri.fsPath, ""),
          path: absPath,
          detail: `${key}: ${LANG[key]}`,
        };
      });

      if (!resultFileItems.length) {
        vscode.window.showErrorMessage("多语言搜索失败：" + word);
        return;
      }

      const resultFileItem = await vscode.window.showQuickPick(
        resultFileItems,
        {
          placeHolder: "Please select the target file and open",
        }
      );
      if (resultFileItem) {
        const document = await vscode.workspace.openTextDocument(
          resultFileItem.path
        );
        vscode.window.showTextDocument(document);
        vscode.window.showInformationMessage(
          `定位成功，"${LANG[resultFileItem.key]}"对应的key是 ${
            resultFileItem.key
          }`
        );
      }
    } else {
      vscode.window.showErrorMessage("语料库找不到这个词语: " + word);
    }
  }
}

const getWorkspaceFolder = async () => {
  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 1
  ) {
    const selected = await vscode.window.showQuickPick(
      vscode.workspace.workspaceFolders.map((folder) => ({
        label: folder.name,
        folder,
      })),
      {
        placeHolder: "Select workspace folder",
      }
    );

    if (!selected) {
      return;
    }

    return selected.folder;
  }

  const folder = vscode.workspace.workspaceFolders
    ? vscode.workspace.workspaceFolders[0]
    : undefined;
  return folder;
};

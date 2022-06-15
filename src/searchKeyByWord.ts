import * as vscode from "vscode";
import { ZH_URL_KEY } from "./config";
import { findStringByKey } from "./utils";

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

    const key = LANG_KEY.find((key) => LANG[key] === word);

    if (key) {
      const resultFilePath = findStringByKey(folder.uri.fsPath, key);
      if (!resultFilePath.length) {
        vscode.window.showErrorMessage("文件找不到这个key: " + key);
        return;
      }
      const selectedPath = await vscode.window.showQuickPick(resultFilePath, {
        placeHolder: "Please select the target file",
      });
      if (selectedPath) {
        const document = await vscode.workspace.openTextDocument(selectedPath);
        vscode.window.showTextDocument(document);
        vscode.window.showInformationMessage(
          `定位成功，"${word}"对应的key是 ${key}`
        );
      }
    } else {
      vscode.window.showErrorMessage("语料库找不到这个单词: " + word);
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

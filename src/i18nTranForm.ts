import * as vscode from "vscode";
import { ZH_URL_KEY } from "./config";

const transform = (lang: Record<string, string> | undefined, text: string) => {
  if (!lang) {
    return text;
  }

  const REG = /[\u4e00-\u9fa5]+/g; // 中文正则
  const matchWords = text.match(REG);
  const LANG_KEY = Object.keys(lang);

  let newText = text;
  if (matchWords) {
    matchWords.forEach((word) => {
      const key = LANG_KEY.find((key) => lang[key] === word);
      if (key) {
        newText = newText.replace(new RegExp(word), `{t('${key}')}`);
      }
    });
  }

  return newText;
};

/**
 * 转换中文到key
 */
export default function i18nTranFrom(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
  const LANG: Record<string, string> | undefined =
    context.workspaceState.get(ZH_URL_KEY);

  if (editor) {
    let document = editor.document;
    let selection = editor.selection;
    let word = document.getText(selection);

    // 如果没有选中文本,则默认选中当前行
    if (word === "") {
      let line = selection.active.line;
      let lineSelection = new vscode.Selection(
        new vscode.Position(line, 0),
        new vscode.Position(line + 1, 0)
      );
      let lineWord = document.getText(lineSelection);
      let reversed = transform(LANG, lineWord);

      editor.edit((editBuilder) => {
        editBuilder.replace(lineSelection, reversed);
      });

      return;
    }

    let reversed = transform(LANG, word);
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, reversed);
    });
  }
}

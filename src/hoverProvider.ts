import * as vscode from "vscode";
import { TRANSLATE_FN, ZH_URL_KEY } from "./config";
import { KeyDetector } from "./utils";

export default class RegisterHover implements vscode.HoverProvider {
  readonly context: vscode.ExtensionContext;
  readonly keyDetectorIns: KeyDetector;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.keyDetectorIns = new KeyDetector({
      translateFn: context.workspaceState.get(TRANSLATE_FN),
    });
  }

  provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const key = this.keyDetectorIns.getKey(document, position);
    const library: Record<string, string> | undefined =
      this.context.workspaceState.get(ZH_URL_KEY);

    if (!key || !library) {
      return;
    }

    const tips = library[key];

    return new vscode.Hover(tips || key);
  }
}

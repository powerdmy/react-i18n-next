import * as vscode from "vscode";
import { ZH_URL_KEY } from "./config";
import { KeyDetector } from "./utils";

export default class RegisterHover implements vscode.HoverProvider {
  readonly context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const key = KeyDetector.getKey(document, position);
    const library: Record<string, string> | undefined =
      this.context.workspaceState.get(ZH_URL_KEY);

    if (!key || !library) {
      return;
    }

    const tips = library[key];

    return new vscode.Hover(tips || key);
  }
}

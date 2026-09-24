import * as vscode from 'vscode';
import { convertCondition } from './convertCondition';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('py-cond-to-cpp.convert', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const lineNumber = editor.selection.active.line;
        const lineRange = editor.document.lineAt(lineNumber).range;
        const lineText = editor.document.lineAt(lineNumber).text;

        const newText = convertCondition(lineText);

        if (newText === null) {
            vscode.window.showErrorMessage(
                'if/while нету'
            );
            return;
        }
        if (newText === lineText) {
            vscode.window.showInformationMessage('Всё уже в порядке');
            return;
        }

        editor.edit((editBuilder) => {
            editBuilder.replace(lineRange, newText);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }

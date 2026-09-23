import * as vscode from 'vscode';

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
                'if/while не найдено в текущей строке'
            );
            return;
        }
        if (newText === lineText) {
            vscode.window.showInformationMessage('Условие уже в порядке');
            return;
        }

        editor.edit((editBuilder) => {
            editBuilder.replace(lineRange, newText);
        });
    });

    context.subscriptions.push(disposable);
}

// Null - если не найден if/while
// Иначе конвертированную строку
function convertCondition(lineText: string): string | null {
    return null;
}

export function deactivate() { }

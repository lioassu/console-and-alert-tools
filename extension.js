
const vscode = require('vscode');

function activate(context) {
    let log = vscode.commands.registerCommand('extension.log', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const textString = editor.document.getText(selection);
        //去掉末尾的逗号,不然obj=a;  复制到分号回变成console.log("a",a;),多了分号会报错
        const textVariable = textString.endsWith(';') ? textString.slice(0, -1) : textString;

        //读配置
        const config = vscode.workspace.getConfiguration();
        const prefix = config.get('console-alert-tool.prefix', '');
        const suffix = config.get('console-alert-tool.suffix', '');

        const logStatement = textString ? `console.log("${prefix}${textString}${suffix}", ${textVariable});` : `console.log("${prefix}${suffix}");`;

        const currentLine = editor.document.lineAt(selection.active.line);
        const isLineEmpty = !currentLine.text.trim(); //当前行是否为空
        const indentation = currentLine.text.substring(0, currentLine.firstNonWhitespaceCharacterIndex); //获取当前行的缩进
        //检测是否是方法结尾,结尾的话,格式化的角度要加一个缩进
        const additionalIndent = currentLine?.text?.trim()?.endsWith('{') ? '\t' : '';

        //设置新的光标位置
        let position = selection?.active?.line;
        if(!isLineEmpty){
            position += 1   
        }
        const newPosition = new vscode.Position(position, 0);
        //设置插入文本
        let insertText = additionalIndent + indentation + logStatement ;
        if(!isLineEmpty){
            insertText += '\n'  
        }

        editor.edit(editBuilder => {
            editBuilder.insert(newPosition, insertText);
        }).then(success => {
            if (success) {
                // 光标位置
                const cursorPosition = new vscode.Position(position, insertText.length - 3); //光标定到变量前面
                editor.selection = new vscode.Selection(cursorPosition, cursorPosition);
            }
        });
    });
    context.subscriptions.push(log);

    let alert = vscode.commands.registerCommand('extension.alert', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const textString = editor.document.getText(selection);
        //去掉末尾的逗号,不然obj=a;  复制到分号回变成console.log("a",a;),多了分号会报错
        const textVariable = textString.endsWith(';') ? textString.slice(0, -1) : textString;

        //读配置
        const config = vscode.workspace.getConfiguration();
        const prefix = config.get('console-alert-tool.prefix', '');
        const suffix = config.get('console-alert-tool.suffix', '');

        const alertStatement = textString ? `alert("${prefix}${textString}${suffix}"+JSON.stringify(${textVariable}));` : `alert("${prefix}${suffix}");`;
        const currentLine = editor.document.lineAt(selection.active.line);
        const isLineEmpty = !currentLine.text.trim(); //当前行是否为空
        const indentation = currentLine.text.substring(0, currentLine.firstNonWhitespaceCharacterIndex); //获取当前行的缩进
        //检测是否是方法结尾,结尾的话,格式化的角度要加一个缩进
        const additionalIndent = currentLine?.text?.trim()?.endsWith('{') ? '\t' : '';

        //设置新的光标位置
        let position = selection?.active?.line;
        if(!isLineEmpty){
            position += 1   
        }
        const newPosition = new vscode.Position(position, 0);
        //设置插入文本
        let insertText = additionalIndent + indentation + alertStatement ;
        if(!isLineEmpty){
            insertText += '\n'  
        }
        editor.edit(editBuilder => {
            editBuilder.insert(newPosition, insertText);
        }).then(success => {
            if (success) {
                // 光标位置
                const cursorPosition = new vscode.Position(position, insertText.length - 3); //光标定到变量前面
                editor.selection = new vscode.Selection(cursorPosition, cursorPosition);
            }
        });
    });
    context.subscriptions.push(alert);

}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}

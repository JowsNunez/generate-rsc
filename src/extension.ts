// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { runJar } from './excmd';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
let disposable: any;
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "generate-rsc" is now active!');

	disposable = vscode.commands.registerCommand('generateRsc.doSomething', () => {
		const jarRelativePath = 'lib/nbersc-vscode.jar'; // Ruta relativa del archivo JAR dentro del directorio del plugin

		const jarAbsolutePath = vscode.Uri.joinPath(context.extensionUri, jarRelativePath).fsPath;

		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'java') {
			const filePath = editor.document.uri.fsPath;
			// Verificar la extensión del archivo
			if (filePath.endsWith('.java')) {
				// Ejecutar el archivo .jar	

				const command = `java -jar ${jarAbsolutePath} "${filePath}"`;
				
				runJar(command, () => {
					const detailsMsg = '1.- Verify package in your entity, only lowercase.\n2.- Verify id declaration, begin with id.\n3.- Add @author in the file .java.\n4.- Don\'t use implements or extends before create your entity, you do it after.'
					vscode.window.showErrorMessage("You must use lower case in packages and define @author", { detail: detailsMsg, modal: true });
				})


			}
		}
	});

	context.subscriptions.push(disposable);


}

// This method is called when your extension is deactivated
export function deactivate() {
	disposable.dispose();
}

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

function leadingZero (n: number): string { return n <= 9 ? `0${n}` : n.toString() };

function theTime(): string {
	var date = new Date();
	let hours = leadingZero(date.getHours());
	let minutes = leadingZero(date.getMinutes());
	let seconds = leadingZero(date.getSeconds());
	return `⌚️ ${hours}:${minutes}:${seconds}`;
}

export function activate({ subscriptions }: vscode.ExtensionContext) {

	const myCommandId = 'extension.bottomWatch';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		myStatusBarItem.text = theTime();
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);
	myStatusBarItem.show();
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = theTime();
	setTimeout(updateStatusBarItem, 1000);
}

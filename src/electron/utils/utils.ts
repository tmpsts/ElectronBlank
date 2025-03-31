import { pathToFileURL } from "url";
import { ipcMain } from "electron";

import pathResolver from "../pathResolver.js";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle(key, handler) {
  ipcMain.handle(key, (event, ...args) => {
    // if (event.senderFrame) {
    //   validateEventFrame(event.senderFrame);
    // }
    return handler(...args);
  });
}

export function ipcMainOn(key, handler) {
  ipcMain.on(key, (event, payload) => {
    // if (event.senderFrame) {
    //   validateEventFrame(event.senderFrame);
    // }
    return handler(payload);
  });
}

export function ipcWebContentsSend(key, webContents, payload) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame) {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(pathResolver.getUIPath()).toString()) {
    throw new Error("Malicious event");
  }
}

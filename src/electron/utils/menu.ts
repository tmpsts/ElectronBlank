import { BrowserWindow, Menu, app } from "electron";
import { ipcWebContentsSend, isDev } from "./utils.js";

export default function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
    ])
  );
}

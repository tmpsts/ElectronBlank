import { app, BrowserWindow, Menu, Tray } from "electron";
import pathResolver from "../pathResolver.js";
import path from "path";

export default function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      pathResolver.getAssetPath(),
      process.platform === "darwin"
        ? "trayiconTemplate@4x.png"
        : "trayicon.png",
    ),
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
      {
        label: "DevTools",
        click: () => mainWindow.webContents.openDevTools(),
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]),
  );
}

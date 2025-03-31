import { ipcMainHandle, ipcMainOn, isDev } from "./utils/utils.js";
import { app, BrowserWindow } from "electron";

import createTray from "./utils/tray.js";
import createMenu from "./utils/menu.js";

import pathResolver from "./pathResolver.js";

let mainWindow: BrowserWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    webPreferences: {
      preload: pathResolver.getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  console.log(
    "\n\n----------------------- Created Window -----------------------\n",
  );
}

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}

// Wait for app to start then open window
app.on("ready", () => {
  createMainWindow();

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(pathResolver.getUIPath());
  }

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});

// Exit app on window close
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMainHandle("test-invoke", (params) => {
  const date = new Date(params);
  const formattedDate = date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
  console.log("Received params:", formattedDate);

  mainWindow.webContents.send(
    "test-on",
    `[Main] Hello from main! ${formattedDate}`,
  );
  return "Hello from main";
});

ipcMainOn("test-send", (params) => {
  console.log("Received params:", params);

  mainWindow.webContents.send(
    "test-on",
    `[Main] Recieved from renderer: ${params}`,
  );
  return;
});

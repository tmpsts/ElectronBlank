import { fileURLToPath } from "url";
import { app } from "electron";
import path from "path";
import fs from "fs";

import { isDev } from "./utils/utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAppRoot() {
  return path.join(__dirname, "..");
}

function getPreloadPath() {
  return path.join(__dirname, "preload.cjs");
}

function getUIPath() {
  return path.join(app.getAppPath() + "/dist-react/index.html/");
}

function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}

function getProjectDirectory() {
  if (isDev()) {
    const projectPath = path.join(__dirname, "./saved/");

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    }

    return projectPath;
  } else {
    const documentsPath = app.getPath("documents");
    const glidePath = path.join(documentsPath, "JohnnyFiveTest");

    if (!fs.existsSync(glidePath)) {
      fs.mkdirSync(glidePath);
    }

    return glidePath;
  }
}

export default {
  getAppRoot,
  getPreloadPath,
  getUIPath,
  getAssetPath,
  getProjectDirectory,
};

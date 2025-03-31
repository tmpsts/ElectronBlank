import electron from "electron";

electron.contextBridge.exposeInMainWorld("electronIPC", {
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload),

  // ipcInvoke
  testInvoke: async (params) => ipcInvoke("test-invoke", params),

  // ipcSend
  testSend: async (params) => ipcSend("test-send", params),

  // ipcOn
  testOn: (callback) => ipcOn("test-on", callback),
});

function ipcInvoke(key, ...args) {
  return electron.ipcRenderer.invoke(key, ...args);
}

function ipcOn(key, callback) {
  const wrappedCallback = (_event, ...args) => callback(...args);
  electron.ipcRenderer.on(key, wrappedCallback);
  return () =>
    electron.ipcRenderer.off(key, wrappedCallback) &&
    electron.ipcRenderer.removeAllListeners(key);
}

function ipcSend(key, payload) {
  electron.ipcRenderer.send(key, payload);
}

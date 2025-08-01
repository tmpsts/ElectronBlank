import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'

import { createWindow } from './win'
import { registerIPC } from './ipc'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development and ignore Control + R in production.
  // https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Create BrowserWindow
  createWindow()

  // Register IPC Handlers
  registerIPC()

  // On macOS it's common to re-create a window in the app
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

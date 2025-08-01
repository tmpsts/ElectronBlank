import { WindowAction } from '@shared/types'
import { mainWindow } from './win'
import { ipcMain } from 'electron'

export const handle = (
  channel: string,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any
) => ipcMain.handle(channel, listener)

export const on = (
  channel: string,
  listener: (event: Electron.IpcMainEvent, ...args: any[]) => void
) => ipcMain.on(channel, listener)

export const send = (key: string, payload: any) => mainWindow.webContents.send(key, payload)

export function registerIPC() {
  on('frame-action', (_, action: WindowAction) => {
    switch (action) {
      case 'MINIMIZE':
        mainWindow.minimize()
        break
      case 'MAXIMIZE':
        !mainWindow.isMaximized() ? mainWindow.maximize() : mainWindow.unmaximize()
        break
      case 'FULLSCREEN':
        !mainWindow.isFullScreen()
          ? mainWindow.setFullScreen(true)
          : mainWindow.setFullScreen(false)
        break
      case 'CLOSE':
        mainWindow.close()
        break
    }
  })

  handle('test-invoke', (_, params) => {
    const date = new Date(params)
    const formattedDate = date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    })
    console.log('test-invoke... invoked! @ ', formattedDate)

    send('test-on', `Hello from main! @ ${formattedDate}`)
    return 'Hello from main'
  })

  on('test-send', (_, params) => {
    console.log('test-send... sent! Your message: ', params)

    send('test-on', `Hello from main! Your message: ${params}`)
    return
  })
}

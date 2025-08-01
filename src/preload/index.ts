import { WindowAction } from '@shared/types'
import { contextBridge } from 'electron'
import { ipcRenderer } from 'electron'

export const send = (key: string, ...args: any[]) => ipcRenderer.send(key, ...args)
export const sendSync = (key: string, ...args: any[]) => ipcRenderer.sendSync(key, ...args)
export const invoke = (key: string, ...args: any[]) => ipcRenderer.invoke(key, ...args)
export const on = (key: string, callback: (...args: any[]) => any) => {
  const wrappedCallback = (_event: Electron.IpcRendererEvent, ...args: any[]) => callback(...args)
  ipcRenderer.on(key, wrappedCallback)
  return () => ipcRenderer.off(key, wrappedCallback) && ipcRenderer.removeAllListeners(key)
}

const ipc = {
  sendFrameAction: (payload: WindowAction) => send('frame-action', payload),
  testInvoke: async (...params: any[]) => invoke('test-invoke', params),
  testSend: async (...params: any[]) => send('test-send', ...params),
  testOn: (callback: (...args: any[]) => any) => on('test-on', callback)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('ipc', ipc)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.ipc = ipc
}

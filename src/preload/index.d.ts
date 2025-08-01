import { ElectronAPI } from '@electron-toolkit/preload'
import { WindowAction } from '@shared/types'

declare global {
  interface Window {
    ipc: {
      sendFrameAction: (payload: WindowAction) => void
      testInvoke: (...params: any[]) => Promise<void>
      testSend: (...params: any[]) => void
      testOn: (callback: (...args: any[]) => any) => () => void
    }
  }
}

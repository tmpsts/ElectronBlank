interface Window {
  electronIPC: {
    sendFrameAction: (payload: any) => void;
    testInvoke: (params: any) => void;
    testSend: (params: any) => void;
    testOn: (callback: any) => void;
  };
}

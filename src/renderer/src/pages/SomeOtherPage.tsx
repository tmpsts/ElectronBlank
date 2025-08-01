import { useEffect, useState } from 'react'

export default function SomeOtherPage() {
  const [data, setData] = useState<string[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    // Recieve backend updates
    const unsub = window.ipc.testOn((data) => {
      setData((prev) => [data, ...prev])
    })

    return () => {
      // Clean up on page reload
      unsub()
    }
  }, [])

  return (
    <div className="mt-3 flex h-full w-full flex-col items-center justify-center gap-8 p-5">
      {/* Title */}
      <h1 className="text-6xl font-medium tracking-tight">This is some other page.</h1>

      {/* IPC */}
      <div className="flex w-full gap-8 p-8">
        <div className="flex w-3/7 flex-col gap-8 border-r border-white/20 pr-8">
          {/* Do Something */}
          <div className="w-full">
            <h2 className="mb-2 text-lg font-medium text-white">Do Something</h2>
            <button
              className="w-full rounded-xl border border-white/20 bg-white/20 p-2 text-white duration-150 hover:bg-white hover:text-black hover:shadow-xl"
              onClick={() => window.ipc.testInvoke(`${new Date().toISOString()}`)}
            >
              Test Invoke
            </button>
          </div>

          {/* Send Something */}
          <div className="w-full">
            <h2 className="mb-2 text-lg font-medium text-white">Send Something</h2>
            <form action="" className="flex w-full gap-2">
              <input
                className="w-full rounded-xl border border-white/20 bg-neutral-800/80 p-2 text-white"
                type="text"
                placeholder="Say something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="rounded-xl border border-white/20 bg-white/20 p-2 text-white duration-150 hover:bg-white hover:text-black hover:shadow-xl"
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  window.ipc.testSend(input)
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Receive Something */}
        <div className="w-4/7">
          <h2 className="mb-2 text-lg font-medium text-white">Receive Something</h2>
          <div className="h-40 w-full overflow-clip rounded-xl border border-white/20 bg-neutral-800/80 p-2 text-sm text-white/80">
            <div className="h-full w-full overflow-y-auto">
              {data.map((line, i) => (
                <p key={i} className="line-clamp-3 break-words select-text">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

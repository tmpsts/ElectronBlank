import { useEffect, useState } from "react";

export default function SomeOtherPage() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    window.electronIPC.testOn((data) => {
      console.log("Received data:", data);
      setData(data);
    });
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 p-3 px-5">
      <h1 className="text-6xl font-medium tracking-tight">
        This is some other page.
      </h1>

      {/* IPC */}
      <div className="flex gap-12">
        {/* Do Something */}
        <div className="w-50 border-r border-white/20 pr-12">
          <h2 className="mb-5 text-lg font-medium text-white">Do Something</h2>
          <button
            className="w-full rounded-xl border border-white/20 bg-white/20 p-2 text-white duration-150 hover:bg-white hover:text-black hover:shadow-xl"
            onClick={() =>
              window.electronIPC.testInvoke(`${new Date().toISOString()}`)
            }
          >
            Test Invoke
          </button>
        </div>

        {/* Send Something */}
        <div className="w-fit border-r border-white/20 pr-12">
          <h2 className="mb-5 text-lg font-medium text-white">
            Send Something
          </h2>
          <form action="" className="flex gap-2">
            <input
              className="rounded-xl border border-white/20 bg-neutral-800/80 p-2 text-white"
              type="text"
              placeholder="Say something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="rounded-xl border border-white/20 bg-white/20 p-2 text-white duration-150 hover:bg-white hover:text-black hover:shadow-xl"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                window.electronIPC.testSend(input);
              }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Receive Something */}
        <div className="w-80">
          <h2 className="mb-2 text-lg font-medium text-white">
            Receive Something
          </h2>
          <div className="h-20 w-84 rounded-xl border border-white/20 bg-neutral-800/80 p-2 text-sm text-white/80">
            <p className="line-clamp-3 break-words select-text">{data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

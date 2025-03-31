import { Minus, Square, X } from "lucide-react";
import { Link } from "react-router";

function TopBar() {
  return (
    <div className="drag bg-bg1 relative flex h-12 items-center justify-between pt-2 pb-5 select-none">
      <div className="flex h-6 w-full items-center justify-between pr-2.5 pl-3.5">
        <div className="nodrag mt-0.5 flex font-bold tracking-wider">
          <Link
            to={"/"}
            className="text-white/80 duration-200 hover:text-white"
          >
            ElectronBlank
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="nodrag flex h-6 w-10 items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
            onClick={() => window.electronIPC.sendFrameAction("MINIMIZE")}
          >
            <Minus size={17} />
          </button>
          <button
            className="nodrag flex h-6 w-10 items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
            onClick={() => window.electronIPC.sendFrameAction("MAXIMIZE")}
          >
            <Square size={12} />
          </button>
          <button
            className="nodrag flex h-6 w-7 items-center justify-center pl-2 text-center text-sm leading-none font-light text-white/60 transition-colors duration-200 hover:text-white"
            onClick={() => window.electronIPC.sendFrameAction("CLOSE")}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <h1 className="text-6xl font-medium tracking-tight">
        This is the Home page.
      </h1>
      <Link
        to="/some-other-path"
        className="rounded-full border border-white/20 bg-white/20 p-8 py-3 text-xl text-white/90 duration-150 hover:bg-white hover:text-black hover:shadow-xl"
      >
        Go Somewhere Else
      </Link>
    </div>
  );
}

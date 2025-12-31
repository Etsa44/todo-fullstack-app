import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <main>
        <section className="text-slate-900 flex flex-col justify-center items-center gap-8">
          <h1 className="font-semibold text-2xl lg:text-8xl">TODO APP</h1>
          <p className="text-center text-xl w-96 lg:w-2xl lg:text-4xl">
            The simple platform to manage your daily tasks and boost your
            productivity.
          </p>
          <div className="text-white flex gap-4">
            <Link
              href={"/login"}
              className="w-32 h-10 bg-slate-950 flex justify-center items-center rounded-xl lg:w-40 lg:h-14"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="w-32 h-10 bg-slate-950 flex justify-center items-center rounded-xl lg:w-40 lg:h-14"
            >
              Register
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

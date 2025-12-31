"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <main className="w-screen h-screen flex justify-center items-center">
        <section className="h-auto py-10 w-full max-w-lg text-black p-4 flex flex-col justify-center items-center gap-8 shadow-xl rounded-lg bg-white border border-gray-100">
          <h1 className="font-bold text-2xl uppercase tracking-wider">
            Register
          </h1>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <form
            onSubmit={handleRegister}
            className="flex flex-col justify-center items-center gap-4 w-full"
          >
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64 h-14 p-2 border-gray-400 border rounded-lg lg:w-96"
              placeholder="Name"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 h-14 p-2 border-gray-400 border rounded-lg lg:w-96"
              placeholder="Email"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 h-14 p-2 border-gray-400 border rounded-lg lg:w-96"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-40 h-12 text-white bg-black rounded-lg cursor-pointer hover:bg-gray-800 transition font-medium"
            >
              Register
            </button>
          </form>

          <div className="text-sm flex justify-center items-center gap-4 text-gray-600 font-medium">
            <Link
              href={"/login"}
              className="hover:text-black hover:underline transition"
            >
              Already have an account? Login
            </Link>
            <span>|</span>
            <Link
              href={"/"}
              className="hover:text-black hover:underline transition"
            >
              Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

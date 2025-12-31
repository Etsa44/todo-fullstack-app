"use client"; // Obligatoire pour utiliser useState et les événements

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Succès : on stocke le token et on redirige
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        router.push("/tasks");
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <main className="w-screen h-screen flex justify-center items-center">
        <section className="h-3/5 w-lg text-black p-4 flex flex-col justify-center items-center gap-8 shadow-xl rounded-lg">
          <h1 className="font-semibold text-2xl">Login</h1>

          <form
            onSubmit={handleSubmit} // On lie la fonction ici
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // On capte la saisie
              className="w-96 h-14 p-2 border-gray-400 border rounded-lg"
              placeholder="email"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // On capte la saisie
              className="w-96 h-14 p-2 border-gray-400 border rounded-lg"
              placeholder="password"
            />
            <button
              type="submit"
              className="w-40 h-12 text-white bg-black rounded-lg cursor-pointer hover:opacity-80 transition"
            >
              login
            </button>
          </form>

          <div className="text-sm flex justify-center items-center gap-4">
            <Link href={"/register"} className="hover:underline text-gray-600">
              Register
            </Link>
            <Link href={"/"} className="hover:underline text-gray-600">
              Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

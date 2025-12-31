// components/Navbar.tsx
"use client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 text-white rounded-lg mb-8 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-slate-950">
          Bienvenue, {userName}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="w-28 h-10 text-sm font-semibold bg-red-600 text-white rounded-lg cursor-pointer"
      >
        Déconnexion
      </button>
    </nav>
  );
}

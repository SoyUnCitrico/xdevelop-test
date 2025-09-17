"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
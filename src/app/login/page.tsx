"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const { setToken, setRole } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");  
  const [role, setRoleInput] = useState<"admin" | "user">("user");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      setRole(role);
      router.push("/users");
    } else {
      alert("Login invalido");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10 border p-6 rounded bg-white shadow"
    >
      <h1 className="text-xl font-bold text-center mb-8">Login</h1>
      <label htmlFor={"email"}><strong>{"Email"}</strong></label>
      <input
        id="email"
        name="email"
        className="border p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor={"password"}><strong>{"Contraseña"}</strong></label>
      <input
        id="password"
        name="password"
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Selector de rol */}
      <label htmlFor={"role"}><strong>{"Rol"}</strong></label>
      <select
        id={"Role"}
        name={"Role"}
        value={role}
        onChange={(e) => setRoleInput(e.target.value as "admin" | "user")}
        className="border p-2"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 hover:cursor-pointer">
        Login
      </button>

      <div><small>{`Para crear y borrar posts se debe ingresar con ADMIN`}</small></div>
    </form>
  );
}

export default LoginPage;
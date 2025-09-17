import { API_CONFIG } from "@/config/api";
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqResResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export async function fetchUsers(page: number): Promise<ReqResResponse> {
  const res = await fetch(`${API_CONFIG.REQRES}/users?page=${page}&per_page=${8}`, {
      method: "GET",
      headers: { "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
       },
    //   body: JSON.stringify({ email, password }),
    });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

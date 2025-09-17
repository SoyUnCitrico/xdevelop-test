import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import { usePostsStore } from "@/store/posts";
import { Post } from "@/store/posts";
import { API_CONFIG } from "@/config/api";

async function fetchPost(id: number): Promise<Post> {
  const res = await apiFetch(`${API_CONFIG.JSONPLACEHOLDER}/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export function usePostById(id: number) {
  const { localPosts } = usePostsStore();

  // 1️⃣ Buscar primero en posts locales
  const local = localPosts.find((p) => p.id === id);

  const query = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !local, // no ejecutar fetch si ya está en local
  });

  return {
    data: local ?? query.data,
    isLoading: query.isLoading && !local,
    isError: query.isError && !local,
  };
}

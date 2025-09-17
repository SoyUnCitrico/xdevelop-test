import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "@/store/posts";
import { Post } from "@/store/posts";
import { apiFetch } from "@/lib/apiClient";
import { API_CONFIG } from "@/config/api";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { addPost, replacePost } = usePostsStore();

  return useMutation({
    mutationFn: async (newPost: Omit<Post, "id">) => {
      const res = await apiFetch(`${API_CONFIG.JSONPLACEHOLDER}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      return { ...newPost, id: data.id || Date.now() };
    },
    onMutate: async (newPost) => {
      // Crear un post temporal con id único
      const tempId = Date.now();
      const tempPost: Post = { id: tempId, ...newPost };

      addPost(tempPost);

      // Retornar contexto con id temporal para poder reemplazar luego
      return { tempId };
    },
    onSuccess: (data, _variables, context) => {
      if (context?.tempId) {
        // Reemplazar el post temporal por el definitivo
        replacePost(context.tempId, data);
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

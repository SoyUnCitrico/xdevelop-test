import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore, Post } from "@/store/posts";
import { apiFetch } from "@/lib/apiClient";
import { API_CONFIG } from "@/config/api";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { removePost, addPost } = usePostsStore();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiFetch(`${API_CONFIG.JSONPLACEHOLDER}/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    },
    onMutate: async (id) => {
      // Guardamos el post borrado para revertir en caso de error
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Actualizamos Zustand inmediatamente (optimista)
      removePost(id);

      return { previousPosts };
    },
    onError: (_error, _id, context) => {
      // Si hubo error, revertimos al estado anterior
      if (context?.previousPosts) {
        context.previousPosts.forEach((p) => addPost(p));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

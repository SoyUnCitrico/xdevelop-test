import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore, Post } from "@/store/posts";
import { apiFetch } from "@/lib/apiClient";
import { API_CONFIG } from "@/config/api";

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { updatePost, replacePost } = usePostsStore();

  return useMutation({
    mutationFn: async (post: Post) => {
      const res = await apiFetch(`${API_CONFIG.JSONPLACEHOLDER}/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      return data as Post;
    },
    onMutate: async (post) => {
      updatePost(post.id, { title: post.title, body: post.body });
    },
    onSuccess: (data) => {
      replacePost(data.id, data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

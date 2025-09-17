"use client";
import { useQuery} from "@tanstack/react-query";
import { fetchComments } from "@/services/jsonplaceholder";
import { apiFetch } from "@/lib/apiClient";
import { usePostsStore } from "@/store/posts";
import { API_CONFIG } from "@/config/api";

export function usePosts() {
  const { localPosts } = usePostsStore();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await apiFetch(`${API_CONFIG.JSONPLACEHOLDER}/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    }
  });

  return {
    ...query,
    data: query.data ? [...localPosts, ...query.data] : localPosts,
  };
}

export function useComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}

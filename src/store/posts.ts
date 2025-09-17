import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  localPosts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: number, updated: Partial<Post>) => void;
  replacePost: (id: number, newPost: Post) => void;
  removePost: (id: number) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      localPosts: [],
      addPost: (post) =>
        set((state) => ({ localPosts: [post, ...state.localPosts] })),
      updatePost: (id, updated) =>
        set((state) => ({
          localPosts: state.localPosts.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),
      replacePost: (id, newPost) =>
        set((state) => ({
          localPosts: state.localPosts.map((p) =>
            p.id === id ? newPost : p
          ),
        })),
      removePost: (id) =>
        set((state) => ({
          localPosts: state.localPosts.filter((p) => p.id !== id),
        })),
    }),
    { name: "posts-storage" }
  )
);

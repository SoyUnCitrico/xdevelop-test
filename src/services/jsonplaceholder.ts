import { API_CONFIG } from "@/config/api";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_CONFIG.JSONPLACEHOLDER}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${API_CONFIG.JSONPLACEHOLDER}/posts/${postId}/comments`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}


export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const res = await fetch(`${API_CONFIG.JSONPLACEHOLDER}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(id: number, post: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_CONFIG.JSONPLACEHOLDER}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
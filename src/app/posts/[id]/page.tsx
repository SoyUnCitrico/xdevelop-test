"use client";

import { useParams } from "next/navigation";
import { useComments } from "@/hooks/usePosts";
import { usePostById } from "@/hooks/usePostsById";
import Link from "next/link";

const PostDetailPage = () => {
  const params = useParams();
  const id = Number(params?.id);

  const { data: post, isLoading: loadingPost, isError } = usePostById(id);
  const { data: comments, isLoading: loadingComments } = useComments(id);

  if (loadingPost) return <p>Cargando el post...</p>;  
  if (isError || !post) return <p>No se encontró el post.</p>;
  
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="grid justify-items-start mb-4"><small >
        <Link href={"/posts"} className="hover:bg-gray-500 hover:text-gray-100 rounded p-2">{"<- Regresar"}</Link>
      </small></div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-8 text-gray-700">{post.body}</p>

      {loadingComments ? 
        <p>Cargando comentarios...</p>
      : comments != undefined && comments.length > 0 &&
        <>
        <h2 className="text-xl font-semibold mt-8 mb-4">Comentarios</h2>
        <ul className="space-y-4">
          {comments?.map((c) => (
            <li key={c.id} className="border p-4 rounded bg-gray-50">
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">{c.email}</p>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
        </>
      }
      
      <p className="mt-8 text-right text-sm text-gray-500">ID: {post.id}</p>
    </div>
  );
}
export default PostDetailPage;
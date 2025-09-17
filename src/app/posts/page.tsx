"use client"
import Link from "next/link";
import { useState } from "react";
import { useFavoritesStore } from "@/store/favorites";
import { usePosts } from "@/hooks/usePosts";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useAuthStore } from "@/store/auth";

const PostsPage = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const createPost = useCreatePost();
  const deletePost = useDeletePost();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { role } = useAuthStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [page, setPage] = useState(1); // control de paginación
  const pageSize = 10;

  if (isLoading) return <p>Cargando posts...</p>;
  if (isError) return <p>Error cargando posts.</p>;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" && body === "") {
      alert("El post debe contener algo");
    } else if (title === "") {
      alert("Agrega un titulo al post");
    } else if (body === "") {
      alert("Agrega contenido al post");
    } else {
      createPost.mutate({ title, body, userId: 1 });
      setTitle("");
      setBody("");
    }
  };

  // Paginación
  const totalPages = posts ? Math.ceil(posts.length / pageSize) : 1;
  const start = (page - 1) * pageSize;
  const currentPosts = posts?.slice(start, start + pageSize) ?? [];

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Publicaciones</h1>
     

      {/* Mostrar favoritos */}
      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Favoritos</h2>
          <div className="grid grid-cols-4 gap-4">
            {favorites.map((f) => (
              <Link href={`/posts/${f.id}`} key={f.id}>
                <div className="p-3 border rounded bg-yellow-100 min-h-18 hover:bg-yellow-300">
                  <strong>{f.title.length > 25 ? f.title.substring(0,25) + "..." : f.title}</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lista de posts */}
      <div className="mt-8">
        <div className="flex mb-8 justify-between">
          <h2 className="text-xl font-semibold ">Todos los posts</h2>
          {role === "admin" && (
            <div className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" ><Link href={"#createPost"}>Crear Post</Link></div>
          )}
        </div>
        <ul className="space-y-4">
          {currentPosts.map((post) => (
            <li
              key={post.id}
              className="border p-4 rounded flex justify-between items-start"
            >
              <div>
                <Link
                  href={`/posts/${post.id}`}
                  className="text-lg font-semibold text-blue-600"
                >
                  {post.title}
                </Link>
                <p>
                  {post?.body.length > 60
                    ? post?.body.substring(0, 60) + "..."
                    : post?.body}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleFavorite(post)}
                  className={`px-3 py-1 rounded text-sm hover:cursor-pointer ${
                    favorites.some((f) => f.id === post.id)
                      ? "bg-yellow-400 hover:bg-yellow-300"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {favorites.some((f) => f.id === post.id) ? "★ Fav" : "☆ Fav"}
                </button>

                {/* Solo mostrar borrar en posts de usuario */}
                {post.id > 100 && role === "admin" && (
                  <button
                    onClick={() => deletePost.mutate(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Borrar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer hover:bg-gray-400"
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer hover:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Formulario de creación, solo admin */}
      {role === "admin" && (
        <form
          id={"createPost"}
          onSubmit={handleAdd}
          className="mt-16 mb-8 space-y-4 border p-4 rounded bg-gray-50"
        >
          <h2 className="font-semibold">Crear Post</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="border p-2 w-full"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Contenido"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 hover:cursor-pointer"
          >
            Agregar Post
          </button>
        </form>
      )}
    </div>

    
  );
};

export default PostsPage;

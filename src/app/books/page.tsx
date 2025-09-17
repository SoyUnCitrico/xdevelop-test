"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import Link from "next/link";

const BooksPage = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const { data, isLoading, isError } = useBooks(search, page, author, year);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(query);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Libros</h1>

      {/* Buscador con filtros */}
      <form onSubmit={handleSearch} className="space-y-2 border p-4 rounded bg-gray-50">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busqueda de libros..."
          className="border p-2 w-full"
        />
        <div className="flex gap-2">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
            className="border p-2 flex-1"
          />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Año"
            className="border p-2 w-28"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:cursor-pointer hover:bg-blue-700 active:bg-blue-900">
          Buscar
        </button>
      </form>

      {/* Resultados */}
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error cargando books.</p>}

      {data && (
        <>
          <ul className="space-y-3">
            {data.docs.map((book) => (
              <li key={book.key} className="p-3 border rounded bg-white shadow-sm">
                <Link
                  href={`/books/${book.key.split("/")[2]}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  <h2 className="font-semibold text-lg">{book.title}</h2>
                  <p className="text-sm text-gray-600">
                    {book.author_name?.join(", ") || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {book.first_publish_year || "Year N/A"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} ({data.numFound.toLocaleString()} resultados)
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={data.docs.length === 0}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BooksPage;
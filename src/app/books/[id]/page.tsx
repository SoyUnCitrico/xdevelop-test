"use client";
import { useParams } from "next/navigation";
import { useAuthors, useBook } from "@/hooks/useBooks";
import Link from "next/link";


export default function BookDetailPage() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useBook(id as string);
  const authorKeys = book?.authors?.map((a: any) =>
    a?.author?.key?.split("/")[2]
  );

  const authorQueries = useAuthors(authorKeys);
  if (isLoading) return <p>Cargando detalle...</p>;
  if (isError || !book) return <p>No se encontró el libro.</p>;
  
  // console.log((typeof book === 'object' && book !== null && !Array.isArray(book)))
  return (
    <div className="block bg-gray-100 rounded-lg p-4 pb-8 max-w-4xl mx-auto">
      <div className="max-w-2xl mx-auto mt-10 grid justify-items-start mb-4 "><small >
        <Link href={"/books"} className="hover:bg-gray-500 hover:text-gray-100 rounded p-2">{"<- Regresar"}</Link>
      </small></div>
      <main className="max-w-2xl mx-auto mt-4 space-y-4">

        <h1 className="text-3xl font-bold mb-8">{`${book?.title}`}</h1>        
        <h5 className="text-lg text-gray-700">{`Autor(es):`}</h5>
        <ul>
          {authorQueries.map((query, index) => (
            <li key={index}>
              {query.isLoading
                ? "Cargando autor..."
                : query.isError
                ? "Error al cargar autor"
                : query.data?.name}
            </li>
          ))}
        </ul>
        
        <h5 className="text-gray-600 mb-10">{`Año:  ${book?.first_publish_date}`}</h5>
        <div className="max-w-800px"> {`${(typeof book?.description === 'object' && book?.description !== null && !Array.isArray(book?.description)) ? book?.description?.value : book?.description}`}</div>
        
        
      </main>
    </div>
  );
}

import { API_CONFIG } from "@/config/api";
export interface BookDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

export interface SearchResponse {
  numFound: number;
  docs: BookDoc[];
}

export async function searchBooks(
  query: string,
  page: number = 1,
  author?: string,
  year?: string
): Promise<SearchResponse> {
  let url = `${API_CONFIG.OPENLIBRARY}/search.json?q=${encodeURIComponent(query)}&page=${page}`;

  if (author) url += `&author=${encodeURIComponent(author)}`;
  if (year) url += `&first_publish_year=${encodeURIComponent(year)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Fallo al contactar a OpenLibrary");
  return res.json();
}


export async function searchBook(
  id: string,
): Promise<SearchResponse> {
  let url = `${API_CONFIG.OPENLIBRARY}/works/${encodeURIComponent(id)}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fallo al descargar el libro");
  return res.json();
}

export async function searchAuthor(
  id: string,
): Promise<SearchResponse> {
  let url = `${API_CONFIG.OPENLIBRARY}/authors/${encodeURIComponent(id)}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fallo al descargar el autor");
  return res.json();
}

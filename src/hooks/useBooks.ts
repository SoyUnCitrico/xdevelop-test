"use client";
import { useQuery, keepPreviousData, useQueries } from "@tanstack/react-query";
import { searchBooks, searchBook, searchAuthor } from "@/services/openlibrary";

export function useBooks(query: string, page: number, author?: string, year?: string) {
  return useQuery({
    queryKey: ["books", query, page, author, year],
    queryFn: () => searchBooks(query, page, author, year),
    enabled: !!query, // solo busca si hay query
    placeholderData: keepPreviousData
  });
}


export const useBook = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => searchBook(id)
    // enabled: !!id,
  });
}

export const useAuthors = (authorKeys: string[] | undefined) => {
  
  return useQueries({
    queries: authorKeys?.map((key) => ({
      queryKey: ["author", key],
      queryFn: () => searchAuthor(key),
      enabled: !!key,
    })) ?? [],
  });
};
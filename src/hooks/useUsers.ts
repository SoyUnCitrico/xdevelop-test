"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/reqres";

export function useUsers(page: number) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
  });
}

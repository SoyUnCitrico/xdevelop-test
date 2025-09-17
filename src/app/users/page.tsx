"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/services/reqres";
import Papa from "papaparse";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUsers(page);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "first_name",
      header: "Nombre",
    },
    {
      accessorKey: "last_name",
      header: "Apellido",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      ),
    },
  ];

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error cargando usuarios.</p>;

  const handleExportCSV = () => {
    if (!data?.data) return;
    const csv = Papa.unparse(data.data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-page-${page}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usurios</h1>
        <button
          onClick={handleExportCSV}
          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-3 py-1 rounded "
        >
          Exportar CSV
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 hover:cursor-pointer"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {data?.page} de {data?.total_pages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 hover:cursor-pointer"
          onClick={() =>
            setPage((p) => (data?.total_pages ? Math.min(p + 1, data.total_pages) : p))
          }
          disabled={page === data?.total_pages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default UsersPage;
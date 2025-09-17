export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, init);

  // Si el token expira o está inválido → intentamos refrescar
  if (res.status === 401) {
    const refresh = await fetch("/api/auth/refresh", { method: "POST" });
    if (refresh.ok) {
      // Retry la petición original
      res = await fetch(input, init);
    }
  }

  return res;
}

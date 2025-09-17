# Frontend XDevelop — Prueba Técnica con Next.js

Este proyecto es una **prueba técnica** desarrollada con **Next.js (App Router)** que implementa:

- Autenticación con **login/logout**, middleware de protección de rutas y simulación de **refresh tokens** (`HttpOnly`, `Secure`, `SameSite=Lax`).
- Páginas protegidas: `/users`, `/posts`, `/books`.
- Estado global con **Zustand** (favoritos, sesión).
- Gestión de datos con **TanStack Query** (fetch + caching + actualizaciones optimistas).
- **Paginación con ReqRes API** en usuarios.
- Busqueda de libros usando **OpenLibrary API**.
- CRUD de posts con **JSONPlaceholder API** y **actualizaciones optimistas**.
- Exportación de usuarios a **CSV** con `papaparse`.
- Estilos con **TailwindCSS 4** + utilidades (`clsx`, `tailwind-merge`, `cva`).
- Configuración moderna con `Turbopack`.

---

## 🚀 Requisitos

- Node.js **>=20**
- WSL2 (en caso de Windows) con Ubuntu/Debian recomendado

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/front-xdevelop.git
cd front-xdevelop

# Instalar dependencias
npm install

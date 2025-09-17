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

## Requisitos

- Node.js **>=20**
- WSL2 (en caso de Windows) con Ubuntu/Debian recomendado

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/front-xdevelop.git
cd front-xdevelop

# Instalar dependencias
npm install
```

## Arquitectura
La arquitectura de esta aplicación está diseñada para maximizar la escalabilidad, seguridad y mantenibilidad, aplicando prácticas modernas de desarrollo frontend con Next.js 15 (App Router) y un enfoque modular en la gestión de datos y estado.

### 1. Framework y Rendering

Se eligió Next.js como framework principal por su soporte nativo a SSR (Server-Side Rendering), SSG (Static Site Generation) y ISR (Incremental Static Regeneration), lo que permite optimizar el rendimiento y la indexación en buscadores.
Se utiliza el App Router y Middleware en Edge Runtime para controlar el acceso a rutas protegidas, mejorando la seguridad al interceptar solicitudes antes de renderizar la página.

### 2. Gestión de Estado y Datos

TanStack Query se emplea para manejar fetching, caching y sincronización de datos, con soporte para actualizaciones optimistas. Esto reduce llamadas redundantes a las APIs y mejora la experiencia de usuario con interfaces reactivas.

Zustand se integra para la gestión de estado global ligero (favoritos, sesión y rol de usuario), evitando el overhead de soluciones más complejas como Redux cuando no es necesario.

### 3. Seguridad y Autenticación

La autenticación se basa en JWT tokens simulados:
accessToken se almacena en una cookie accesible por el cliente con una vida corta (15 min).
refreshToken se almacena en una cookie HttpOnly, Secure, SameSite=Lax, inaccesible desde JavaScript y persistente (7 días), siguiendo las mejores prácticas recomendadas para aplicaciones web modernas.
Un middleware de autenticación asegura que las rutas críticas (/users, /posts, /books) solo sean accesibles con un token válido.
Se implementa un flujo de refresh automático, renovando el accessToken de forma transparente cuando expira, mejorando la usabilidad sin comprometer la seguridad.

### 4. Módulos funcionales

/users → consumo de la API de ReqRes con paginación y exportación a CSV.
/posts → integración con JSONPlaceholder, soportando creación, edición y eliminación con actualizaciones optimistas.
/books → integración con OpenLibrary, con búsqueda y listados dinámicos.
/login → gestión de credenciales y establecimiento de cookies seguras vía API Routes centralizadas.
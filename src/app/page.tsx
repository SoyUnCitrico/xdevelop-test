import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <>
    <div className="font-sans grid grid-cols-12 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="grid col-span-6 max-w-4xl">
        <div className="grid place-content-center">
          <h1 className="text-6xl text-center mb-8">Gestiona tus Posts, Usuarios y Libros en un solo lugar</h1>
          <h3 className="text-2xl text-left mt-12">Una plataforma moderna construida con Next.js, React Query y Zustand que te permite explorar usuarios, crear publicaciones con actualizaciones optimistas y descubrir libros de manera rápida y segura.</h3>
          <Link href="/login"><button className="grid bg-orange-400 hover:cursor-pointer hover:bg-orange-600 p-4 rounded-lg text-gray-100 justify-self-center mt-12">
            Inicia sesión
          </button></Link>
        </div>
      </main>
      <div className="grid col-span-6 max-w-4xl">
        <div className="flex">
          <Image
            aria-hidden
            src="/phone.png"
            alt="Phone Image"
            width={428}
            height={620}
          />
          <Image
            aria-hidden
            src="/phone_2.png"
            alt="Phone Image"
            width={428}
            height={620}
          />
          </div>
      </div>
    </div>

    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://emme.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Mi web
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/soyuncitrico"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/Github.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https:/github.com/soyuncitrico"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/Code.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Código fuente →
        </a>
      </footer>
    </>
  );
}

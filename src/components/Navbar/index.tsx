"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Fragment } from "react";
import LogoutButton from "../LogoutButton";
import clsx from "clsx";

const navItems = [
  { href: "/users", label: "Usuarios" },
  { href: "/posts", label: "Posts" },
  { href: "/books", label: "Libros" }
];


const Navbar = () => {
  const pathname = usePathname();
  const { token } = useAuthStore();
  
  return (
    <nav className="bg-blue-950 text-white px-6 py-3 grid grid-cols-12">
      <div className="col-span-4" key={0}>
                <Link
                  key={0}
                  href={"/"}
                  className={clsx(
                    "hover:text-blue-400 transition-colors",
                    pathname === navItems[0].href && "font-bold text-blue-400"
                  )}
                >
                  {"Home"}
                </Link>
      </div>
      <div className="col-span-8 grid grid-cols-4 content-between" key={1}>
        
        {navItems.map((item, index) => (              
              item.label != "Login" ?
                <Link
                  key={index}
                  href={item.href}
                  className={clsx(
                    "hover:text-blue-400 transition-colors text-center",
                    pathname === item.href && "font-bold text-blue-400"
                )}>
                    {item.label}
                </Link> : <Fragment key={99999}></Fragment>
          ))
        }
                
        {token == null && <Link
          key={0}
          href={"/login"}
          className={clsx(
            "hover:text-blue-400 transition-colors text-center",
            pathname === "/login" && "font-bold text-blue-400"
        )}>
            {"Login"}
        </Link>}
        {token !== null && <LogoutButton />}
        {/* {!!token && <LogoutButton />} */}
        
      </div>
    </nav>
  );
}

export default Navbar;
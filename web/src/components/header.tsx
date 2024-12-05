import React from "react";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b dark:border-gray-800">
      <Link href="/" className="flex items-center justify-center">
        <Home className="h-6 w-6" />
        <span className="ml-2 font-semibold">Cuspide</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-gray-300" href="/">
          {" "}
          Inicio{" "}
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-300"
          href="/propiedades"
        >
          Propiedades
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-300"
          href="/nosotros"
        >
          Nosotros
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-300"
          href="/contacto"
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}

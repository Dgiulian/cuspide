import React from "react";
import { Home } from "lucide-react";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b dark:border-gray-800">
      <a href="/" className="flex items-center justify-center">
        <Home className="h-6 w-6" />
        <span className="ml-2 font-semibold">Cuspide</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:text-gray-300" href="/">
          {" "}
          Inicio{" "}
        </a>
        <a
          className="text-sm font-medium hover:text-gray-300"
          href="/propiedades"
        >
          Propiedades
        </a>
        <a className="text-sm font-medium hover:text-gray-300" href="/nosotros">
          Nosotros
        </a>
        <a className="text-sm font-medium hover:text-gray-300" href="/contacto">
          Contacto
        </a>
      </nav>
    </header>
  );
}

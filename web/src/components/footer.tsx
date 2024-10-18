import React from "react";
import FacebookIcon from "@/icons/facebook.svg";
import InstagramIcon from "@/icons/instagram.svg";

export default function Footer() {
  return (
    <footer className="flex gap-2 justify-between sm:flex-row py-6 w-full shrink-0 items-baseline px-4 md:px-6 border-t border-gray-300 dark:border-gray-800">
      <p className="text-xs text-gray-900 dark:text-gray-400 ">
        &copy; 2024 Cuspide Bienes Raices. Todos los derechos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
        <div className="flex flex-col align-middle justify-center space-y-2 ">
          <p className="text-sm">Seguinos en</p>

          <div className="flex justify-center space-x-2">
            <a href="https://www.facebook.com/CuspideBr">
              <FacebookIcon width={24} height={24} />
            </a>
            <a href="https://www.instagram.com/cuspide.neuquen/">
              <InstagramIcon width={24} height={24} />
            </a>
          </div>
        </div>
        <a className="text-sm hover:text-gray-300 inline-block" href="#">
          Términos de Servicio
        </a>
        <a className="text-sm hover:text-gray-300" href="#">
          Privacidad
        </a>
      </nav>
    </footer>
  );
}

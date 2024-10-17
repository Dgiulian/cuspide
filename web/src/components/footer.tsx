import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-300 dark:border-gray-800">
      <p className="text-xs text-gray-900 dark:text-gray-400">
        &copy; 2024 Cuspide Bienes Raices. Todos los derechos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 justify-between">
        <div className="flex flex-col align-middle justify-center space-y-2">
          <p>Seguinos en</p>

          <div className="flex justify-center space-x-2">
            <a href="https://www.facebook.com/CuspideBr">
              {/* <Icon
                name="facebook"
                size="32"
                className="bg-slate-200 p-2 text-gray-900 rounded-sm"
              /> */}
            </a>
            <a href="https://www.instagram.com/cuspide.neuquen/">
              {/* <Icon
                name="instagram"
                size="32"
                className="bg-slate-200 p-2 text-gray-900 rounded-sm"
              /> */}
            </a>
          </div>
        </div>
        <a className="text-xs hover:text-gray-300" href="#">
          {" "}
          Términos de Servicio{" "}
        </a>
        <a className="text-xs hover:text-gray-300" href="#">
          {" "}
          Privacidad{" "}
        </a>
      </nav>
    </footer>
  );
}

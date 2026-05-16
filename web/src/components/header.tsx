"use client";

import React, { useState } from "react";
import { Home, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center">
        <Home className="h-6 w-6" />
        <span className="ml-2 font-semibold">Cuspide</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className="text-sm font-medium hover:text-primary transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

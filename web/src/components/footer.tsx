import React from "react";
import Link from "next/link";
import { 
  Home, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/busqueda", label: "Buscar" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  const propertyTypes = [
    { href: "/busqueda?type=casa", label: "Casas" },
    { href: "/busqueda?type=departamento", label: "Departamentos" },
    { href: "/busqueda?type=terreno", label: "Terrenos" },
    { href: "/busqueda?type=duplex", label: "Dúplex" },
    { href: "/busqueda?type=local", label: "Locales" },
  ];

  return (
    <footer className="bg-secondary/30 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Cuspide</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Tu agencia de bienes raíces de confianza en el Alto Valle de Rio Negro y Neuquén. 
              Ayudamos a familias a encontrar su hogar ideal desde 2015.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/CuspideBr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/cuspide.neuquen/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tipos de Propiedad</h3>
            <ul className="space-y-3">
              {propertyTypes.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Sarmiento 456, Neuquén Capital<br />
                  Neuquén, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+542995550123" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +54 299 555-0123
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@cuspidebr.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@cuspidebr.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Lun - Vie: 9:00 - 18:00<br />
                  Sáb: 9:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Cuspide Bienes Raices. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Términos de Servicio
              </Link>
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

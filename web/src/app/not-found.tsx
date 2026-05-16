import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export const metadata = {
  title: "Página no encontrada | Cuspide Bienes Raices",
  description: "La página que buscas no existe. Explora nuestras propiedades o vuelve al inicio.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/propiedades">
              <Search className="mr-2 h-4 w-4" />
              Ver propiedades
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

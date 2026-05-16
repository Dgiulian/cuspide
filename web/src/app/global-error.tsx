"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="flex flex-col items-center text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold mb-2">Error en la aplicación</h1>
            <p className="text-muted-foreground mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => reset()} 
                variant="default"
                className="flex items-center"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
              <Button 
                onClick={() => window.location.href = "/"} 
                variant="outline"
                className="flex items-center"
              >
                <Home className="mr-2 h-4 w-4" />
                Ir al inicio
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

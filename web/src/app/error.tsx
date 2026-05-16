"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
        <p className="text-muted-foreground mb-6">
          Lo sentimos, ha ocurrido un error al cargar esta página. Por favor, intenta nuevamente.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset} variant="default">
            Intentar de nuevo
          </Button>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

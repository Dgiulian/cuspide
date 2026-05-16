import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              ¿Listo para Encontrar Tu Hogar Ideal?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Contáctanos hoy y deja que nuestros expertos agentes te
              ayuden a encontrar la propiedad perfecta.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button asChild size="lg" className="w-full">
              <Link href="/contacto">
                Contáctanos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

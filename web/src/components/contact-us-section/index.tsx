import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/reveal";

export function ContactUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Reveal className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              ¿Listo para encontrar tu hogar ideal?
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
        </Reveal>
      </div>
    </section>
  );
}

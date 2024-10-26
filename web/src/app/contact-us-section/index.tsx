import Link from "next/link";

export function ContactUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              ¿Listo para Encontrar Tu Hogar Ideal?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Cont&aacute;ctanos hoy y deja que nuestros expertos agentes te
              ayuden a encontrar la propiedad perfecta.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Link
              className="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              href="/contacto"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

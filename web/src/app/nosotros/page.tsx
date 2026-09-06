import { Metadata } from "next";
import { 
  Building2, 
  Users, 
  Trophy, 
  Target, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  Award,
  HeartHandshake,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllListings } from "@/services/listings";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/contact-info";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Cuspide Bienes Raices",
  description: "Conoce a Cuspide Bienes Raices. Somos una agencia inmobiliaria líder en el Alto Valle de Rio Negro y Neuquén con años de experiencia ayudando a familias a encontrar su hogar ideal.",
  keywords: ["nosotros", "bienes raices", "inmobiliaria", "Neuquén", "Rio Negro", "historia", "equipo", "misión"],
  openGraph: {
    title: "Sobre Nosotros | Cuspide Bienes Raices",
    description: "Conoce a Cuspide Bienes Raices. Agencia inmobiliaria líder en el Alto Valle de Rio Negro y Neuquén.",
    type: "website",
  },
  alternates: {
    canonical: "https://cuspidebr.com.ar/nosotros",
  },
};

export default async function NosotrosPage() {
  // Fetch real stats
  const listings = await getAllListings();
  const propertyCount = listings.length;
  const cities = new Set(listings.map(l => l.city).filter(Boolean)).size;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Tu Agencia de Confianza en el <span className="text-primary">Alto Valle</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Más que una inmobiliaria, somos tu aliado en la búsqueda del hogar perfecto. 
              Con años de experiencia en Neuquén y Rio Negro, hacemos realidad tus sueños inmobiliarios.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{propertyCount}+</div>
              <div className="text-muted-foreground">Propiedades</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{cities}+</div>
              <div className="text-muted-foreground">Ciudades</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Familias Felices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Compromiso</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Building2 className="mr-3 h-8 w-8 text-primary" />
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fundada en Neuquén Capital, <strong>Cuspide Bienes Raices</strong> nació con una visión clara: 
                  transformar la experiencia inmobiliaria en el Alto Valle de Rio Negro y Neuquén.
                </p>
                <p>
                  Lo que comenzó como un pequeño emprendimiento familiar, hoy se ha convertido en una de las 
                  agencias inmobiliarias más reconocidas de la región, con presencia en múltiples ciudades 
                  y cientos de familias que han confiado en nosotros para encontrar su hogar.
                </p>
                <p>
                  Nuestra pasión por el servicio al cliente y el profundo conocimiento del mercado local 
                  nos han permitido crecer sostenidamente, manteniendo siempre los valores que nos caracterizan: 
                  honestidad, transparencia y dedicación.
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Trophy className="mr-3 h-7 w-7 text-primary" />
                Nuestros Logros
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Award className="mr-3 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Reconocimiento como una de las inmobiliarias de mayor crecimiento en la región</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="mr-3 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>+500 operaciones inmobiliarias exitosas en los últimos años</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Expansión a 5 ciudades principales del Alto Valle</span>
                </li>
                <li className="flex items-start">
                  <HeartHandshake className="mr-3 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>98% de clientes satisfechos que nos recomiendan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Target className="mr-3 h-8 w-8 text-primary" />
                Nuestra Misión
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Simplificar el proceso de compra, venta y alquiler de propiedades, proporcionando un 
                servicio personalizado y de alta calidad a cada uno de nuestros clientes. Nos comprometemos 
                a ser el puente que conecta familias con su hogar ideal, acompañándolos en cada paso del camino 
                con profesionalismo, transparencia y dedicación.
              </p>
            </div>

            {/* Team */}
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Users className="mr-3 h-8 w-8 text-primary" />
                Nuestro Equipo
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Contamos con un equipo de profesionales altamente calificados y dedicados. Nuestros 
                agentes inmobiliarios tienen un profundo conocimiento del mercado local y están 
                comprometidos a proporcionar un servicio excepcional a cada cliente.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">Agentes Certificados</div>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compromiso</h3>
              <p className="text-muted-foreground">
                Nos dedicamos en cuerpo y alma a cada cliente, asegurando que encuentren exactamente lo que buscan.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excelencia</h3>
              <p className="text-muted-foreground">
                Buscamos la perfección en cada detalle, desde la primera visita hasta la firma final.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovación</h3>
              <p className="text-muted-foreground">
                Adaptamos las últimas tecnologías y tendencias para ofrecer el mejor servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para Encontrar tu Hogar Ideal?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Estamos aquí para ayudarte en cada paso del proceso. Contáctanos hoy y descubre 
            por qué somos la inmobiliaria preferida en el Alto Valle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contacto">
                <Phone className="mr-2 h-5 w-5" />
                Contactar Ahora
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/propiedades">
                Ver Propiedades
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <span>{CONTACT_EMAIL}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span>Lun-Vie: 9:00 - 18:00</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

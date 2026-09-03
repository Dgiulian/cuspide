import { Metadata } from "next";
import { ContactForm } from "@/components/contacto-form";
import {
  // MapPin,
  Phone,
  // Mail,
  // Clock,
  Facebook,
  Instagram,
  MessageCircle,
  // Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto | Cuspide Bienes Raices",
  description:
    "Contacta a Cuspide Bienes Raices. Estamos aquí para ayudarte a encontrar tu propiedad ideal en Neuquén y Rio Negro. Atención personalizada de lunes a sábado.",
  keywords: [
    "contacto",
    "bienes raices",
    "inmobiliaria",
    "Neuquén",
    "Rio Negro",
    "teléfono",
    "email",
  ],
  openGraph: {
    title: "Contacto | Cuspide Bienes Raices",
    description:
      "Contacta a Cuspide Bienes Raices. Estamos aquí para ayudarte a encontrar tu propiedad ideal.",
    type: "website",
  },
  alternates: {
    canonical: "https://cuspidebr.com.ar/contacto",
  },
};

const contactInfo = [
  // {
  //   icon: MapPin,
  //   title: "Dirección",
  //   content: "Sarmiento 456, Neuquén Capital",
  //   subContent: "Neuquén, Argentina",
  //   href: "https://maps.google.com/?q=Sarmiento+456+Neuquén",
  // },
  // {
  //   icon: Phone,
  //   title: "Teléfono",
  //   content: "+54 299 555-0123",
  //   subContent: "Lun-Vie: 9:00 - 18:00",
  //   href: "tel:+542995550123",
  // },
  // {
  //   icon: Mail,
  //   title: "Email",
  //   content: "info@cuspidebr.com",
  //   subContent: "Respuesta en 24hs",
  //   href: "mailto:info@cuspidebr.com",
  // },
  // {
  //   icon: Clock,
  //   title: "Horario",
  //   content: "Lun-Vie: 9:00 - 18:00",
  //   subContent: "Sáb: 9:00 - 13:00",
  //   href: null,
  // },
];

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/CuspideBr",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/cuspide.neuquen/",
    color: "hover:bg-pink-600 hover:text-white",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/542995550123",
    color: "hover:bg-green-600 hover:text-white",
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              ¿Hablamos de tu{" "}
              <span className="text-primary">Próxima Propiedad</span>?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Estamos aquí para ayudarte en cada paso del proceso. Contáctanos y
              un asesor experto te responderá a la brevedad.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item) => (
              <Card
                key={item.title}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-foreground font-medium">{item.content}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.subContent}
                  </p>
                  {item.href && (
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-primary"
                      asChild
                    >
                      <Link
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                      >
                        Ver más →
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Envíanos un Mensaje</h2>
                <p className="text-muted-foreground">
                  Completa el formulario y nos pondremos en contacto contigo lo
                  antes posible. Tu consulta será atendida por un asesor
                  especializado.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Síguenos en Redes
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-all ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* 
              <Card className="overflow-hidden">
                <CardHeader className="bg-secondary/30">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Nuestra Oficina
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.788489034574!2d-68.0591!3d-38.9515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzA1LjQiUyA2OMKwMDMnMzIuOCJX!5e0!3m2!1ses!2sar!4v1609459200000!5m2!1ses!2sar"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "300px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-2">
                      Cuspide Bienes Raices
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Sarmiento 456, Neuquén Capital
                      <br />
                      Neuquén, Argentina
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href="https://maps.google.com/?q=Sarmiento+456+Neuquén"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Cómo Llegar
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card> */}

              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    ¿Por qué Contactarnos?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <strong>Atención personalizada:</strong> Cada cliente es
                        único y merece un servicio a medida.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <strong>Respuesta rápida:</strong> Te contactamos en
                        menos de 24 horas hábiles.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <strong>Experiencia comprobada:</strong> Más de 500
                        familias han confiado en nosotros.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <strong>Sin compromiso:</strong> Consulta gratuita sin
                        ningún tipo de obligación.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Prefieres que te Llamemos?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Déjanos tu número y un asesor te contactará en el horario que
            prefieras.
          </p>
          <Button asChild size="lg">
            <a href="tel:+542995550123">
              <Phone className="mr-2 h-5 w-5" />
              Llamar Ahora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

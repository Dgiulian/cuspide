import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  FileDown, 
  Share2, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ChevronRight,
  MapPinned
} from "lucide-react";
import { Mapa } from "@/components/mapa";
import PropertyDetails from "@/components/property-details";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/services/listings";
import { getRelatedListings } from "@/services/listing-search";
import { Geopoint, Property } from "@/domain/property";
import type { Metadata } from "next";
import Link from "next/link";
import ListingCard from "@/components/listings-list/listing-card";
import { formatPrice } from "@/lib/utils";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, CONTACT_WHATSAPP } from "@/lib/contact-info";

interface Props {
  params: Promise<{ listingSlug: string }>;
}

const DEFAULT_LOCATION: Geopoint = {
  _type: "geopoint",
  lat: -38.9515,
  lng: -68.0591,
  alt: 0,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listingSlug } = await params;
  const property = await getListingBySlug(listingSlug);
  
  if (!property) {
    return {
      title: "Propiedad no encontrada | Cuspide Bienes Raices",
    };
  }

  const title = `${property.title} | Cuspide Bienes Raices`;
  const description = property.description 
    ? `${property.title} - ${property.type} en ${property.city}. ${property.rooms} hab, ${property.bathrooms} baños. ${formatPrice(property.price?.toString() || "0", property.currency || "ars")}`
    : `Propiedad en ${property.city} - ${property.type}. Encuentra tu hogar ideal con Cuspide Bienes Raices.`;

  return {
    title,
    description,
    keywords: [property.type, property.city, property.state, "propiedad", "venta", "bienes raices"].filter(Boolean),
    openGraph: {
      title,
      description,
      url: `https://cuspidebr.com.ar/detalle/${listingSlug}`,
      siteName: "Cuspide Bienes Raices",
      locale: "es_AR",
      type: "website",
      images: property.image_cover
        ? [{ url: property.image_cover, width: 1200, height: 630, alt: property.title ?? "Propiedad" }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: property.image_cover ? [property.image_cover] : [],
    },
    alternates: {
      canonical: `https://cuspidebr.com.ar/detalle/${listingSlug}`,
    },
  };
}

// JSON-LD Structured Data
function PropertyStructuredData({ property }: { property: Property }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://cuspidebr.com.ar/detalle/${property.slug}`,
    image: property.images?.[0] || property.image_cover,
    price: property.price,
    priceCurrency: property.currency?.toUpperCase() || "ARS",
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: "AR",
    },
    numberOfRooms: property.rooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.lot_size,
      unitCode: "MTK",
    },
    agent: {
      "@type": "RealEstateAgent",
      name: "Cuspide Bienes Raices",
      url: "https://cuspidebr.com.ar",
      telephone: CONTACT_PHONE_DISPLAY,
    },
    datePosted: property.publishedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Breadcrumb Component
function Breadcrumb({ property }: { property: Property }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/propiedades" className="hover:text-primary transition-colors">Propiedades</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground truncate max-w-[200px]">{property.title}</span>
    </nav>
  );
}

export default async function DetallePage({ params }: Props) {
  const { listingSlug } = await params;

  if (!listingSlug) return notFound();

  const property = await getListingBySlug(listingSlug);
  if (!property) return notFound();

  const relatedListings = await getRelatedListings(
    listingSlug,
    property.type,
    property.city,
    3
  );

  const statusLabels: Record<string, string> = {
    disponible: "Disponible",
    vendida: "Vendida",
    reservada: "Reservada",
    no_disponible: "No Disponible",
  };

  const statusColors: Record<string, string> = {
    disponible: "bg-green-100 text-green-800 border-green-200",
    vendida: "bg-red-100 text-red-800 border-red-200",
    reservada: "bg-yellow-100 text-yellow-800 border-yellow-200",
    no_disponible: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <>
      <PropertyStructuredData property={property} />
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb property={property} />
        </div>

        {/* Hero Section with Main Image */}
        <section className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            {/* Main Content */}
            <div>
              {/* Image Gallery */}
              <div className="mb-6">
                <ImageCarousel 
                  images={property.images?.length ? property.images : [property.image_cover].filter((img): img is string => Boolean(img))} 
                />
              </div>

              {/* Title & Price Section */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{property.city}, {property.state}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {property.price
                        ? formatPrice(property.price.toString(), property.currency ?? "ars")
                        : "Consultar"}
                    </div>
                    {property.price && (
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(Math.round(property.price / (property.lot_size || 1)).toString(), property.currency ?? "ars")} / m²
                      </div>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={statusColors[property.status || "disponible"]}>
                    {statusLabels[property.status || "disponible"]}
                  </Badge>
                  {property.featured && (
                    <Badge variant="secondary">Destacada</Badge>
                  )}
                  <Badge variant="outline">{property.type}</Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Bed className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{property.rooms || 0}</div>
                      <div className="text-xs text-muted-foreground">Habitaciones</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{property.bathrooms || 0}</div>
                      <div className="text-xs text-muted-foreground">Baños</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Square className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{property.lot_size || 0}</div>
                      <div className="text-xs text-muted-foreground">m² Totales</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{property.garage ? "Sí" : "No"}</div>
                      <div className="text-xs text-muted-foreground">Garage</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-8" />

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                {property.description ? (
                  <div className="prose prose-stone dark:prose-invert max-w-none">
                    <PropertyDetails property={property} hideTitle />
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Esta propiedad no tiene una descripción detallada. Contáctanos para más información.
                  </p>
                )}
              </div>

              <Separator className="my-8" />

              {/* Location */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPinned className="h-6 w-6" />
                  Ubicación
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[400px] rounded-t-lg overflow-hidden">
                      <Mapa location={property.location ?? DEFAULT_LOCATION} />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">{property.city}, {property.state}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar - Contact Card */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Contact Agent Card */}
              <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg">¿Interesado en esta propiedad?</CardTitle>
                  <CardDescription>
                    Contacta a nuestros agentes para más información o para agendar una visita.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`https://wa.me/${CONTACT_WHATSAPP}?text=Hola, estoy interesado en la propiedad: ${property.title}`} target="_blank">
                      <Phone className="mr-2 h-5 w-5" />
                      Contactar por WhatsApp
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link href={`tel:${CONTACT_PHONE_E164}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar Ahora
                    </Link>
                  </Button>

                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`mailto:${CONTACT_EMAIL}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Email
                    </Link>
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{CONTACT_PHONE_DISPLAY}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{CONTACT_EMAIL}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Lun-Vie: 9:00 - 18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/detalle/${property.slug}/pdf`} target="_blank">
                        <FileDown className="mr-2 h-4 w-4" />
                        PDF
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property ID */}
              <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Publicación verificada</span>
                </div>
                <p className="mt-1">ID: {property.id.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Properties */}
        {relatedListings.length > 0 && (
          <section className="bg-secondary/30 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">Propiedades Similares</h2>
              <p className="text-muted-foreground mb-8">
                También te pueden interesar estas propiedades en {property.city}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} isGridView={true} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

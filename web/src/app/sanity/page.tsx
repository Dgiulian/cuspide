import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

import "@/app/globals.css";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { HeroSection } from "@/components/hero-section";
import BenefitsSection from "../benefits-section";

const PROPERTIES_QUERY = `*[
  _type == "listing" && featured == true
]|order(publishedAt desc)[0...12]
{_id, title, property-> { _id,     title,
    type,
    description,
    rooms,
    bathrooms,
    lot_size,
    garage,
    slug,
    publishedAt,
    image_cover,
    images,
    location}}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function HomePage() {
  const featuredProperties = await client.fetch<SanityDocument[]>(
    PROPERTIES_QUERY,
    {},
    options
  );
  // const featuredProperties = await getFeaturedProperties();
  console.log(featuredProperties);
  // const postImageUrl = post.image
  // ? urlFor(post.image)?.width(550).height(310).url()
  // : null;
  return (
    <>
      <HeroSection />
      <section
        className="w-full py-12 md:py-24 lg:py-32"
        id="propiedades-destacadas"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Propiedades Destacadas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((p) => (
              <Card
                key={p.id}
                className="dark:bg-gray-800 dark:border-gray-700"
              >
                <CardHeader>
                  <Image
                    alt={`${p.title}`}
                    className="aspect-[4/3] overflow-hidden rounded-t-xl object-cover"
                    height="300"
                    src={
                      urlFor(p.property.image_cover)?.url() ?? `/favicon.svg`
                    }
                    width="400"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="dark:text-gray-100">
                    {p.title}
                  </CardTitle>
                  <p className="text-sm dark:text-gray-400" />
                  <p className="text-lg font-bold mt-2 text-blue-400">
                    {p.price
                      ? formatPrice(p.price, p.currency)
                      : "Consultar precio"}
                  </p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1 dark:text-gray-400" />
                    <span className="text-sm dark:text-gray-400">
                      {p.city}, {p.state}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href={`/detalle/${p.documentId}`}
                    className="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  >
                    Ver Detalles
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <BenefitsSection />
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
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                size="lg"
              >
                Contactanos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

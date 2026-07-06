"use client";

import { Input } from "@/components/ui/input";
import heroBg from "@/images/hero-bg.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSection() {
  const router = useRouter();
  const [operation, setOperation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (operation) params.set("operation", operation);
    if (propertyType) params.set("type", propertyType);
    if (location) params.set("location", location);
    
    const queryString = params.toString();
    router.push(`/busqueda/venta${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-stone-950 py-24 md:py-36 lg:py-48 xl:py-64">
      {/* Background image with cinematic scrim */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/45 to-stone-950/80" />
      </div>

      <div className="container relative px-4 text-white md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 md:text-sm">
              Inmobiliaria en el Alto Valle
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Encuentra tu{" "}
              <span className="italic text-primary">hogar ideal</span>
            </h1>
            <p className="mx-auto max-w-[640px] text-base text-white/80 md:text-xl">
              Descubre la propiedad perfecta con Cuspide. Estamos aquí para
              ayudarte en cada paso del camino.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <form
              onSubmit={handleSearch}
              className="flex w-full flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2.5 shadow-2xl backdrop-blur-md sm:flex-row"
            >
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="h-11 w-full rounded-xl border-transparent bg-background/95 text-foreground sm:w-[110px]">
                  <SelectValue placeholder="Venta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                </SelectContent>
              </Select>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-11 w-full rounded-xl border-transparent bg-background/95 text-foreground sm:w-[150px]">
                  <SelectValue placeholder="Tipo Propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 flex-1 rounded-xl border-transparent bg-background/95 text-foreground placeholder:text-muted-foreground"
                placeholder="Ingresa una ubicación"
                type="text"
              />
              <Button
                type="submit"
                className="h-11 rounded-xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

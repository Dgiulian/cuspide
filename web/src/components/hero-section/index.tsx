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
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-[350px] bg-secondary">
      {/* Background image */}
      <div className="absolute inset-0 blur-sm filter">
        <Image
          src={heroBg}
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      </div>
      <div className="container px-4 md:px-6 relative text-white">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Encuentra Tu Hogar Ideal
            </h1>
            <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
              Descubre la propiedad perfecta con Cuspide. Estamos aquí para
              ayudarte en cada paso del camino.
            </p>
          </div>
          <div className="w-full max-w-xl space-y-2">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-[100px] bg-background text-foreground border-input">
                  <SelectValue placeholder="Venta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                </SelectContent>
              </Select>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-[140px] bg-background text-foreground border-input">
                  <SelectValue
                    placeholder="Tipo Propiedad"
                  />
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
                className="max-w-lg flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground"
                placeholder="Ingresa una ubicación"
                type="text"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
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

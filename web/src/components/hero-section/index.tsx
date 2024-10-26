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

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-[350px] bg-gray-200 dark:bg-gray-800">
      {/* Background image */}
      <div className="absolute inset-0  blur-sm filter">
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
            <p className="mx-auto max-w-[700px] dark:text-gray-400 md:text-xl">
              Descubre la propiedad perfecta con Cuspide. Estamos aquí para
              ayudarte en cada paso del camino.
            </p>
          </div>
          <div className="w-full max-w-xl space-y-2">
            <form className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-[100px]  bg-slate-50 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue placeholder="Venta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                  {/* <SelectItem value="system">System</SelectItem> */}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] bg-slate-50 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue
                    placeholder="Tipo Propiedad"
                    className="placeholder-red-800"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  {/* <SelectItem value="system">System</SelectItem> */}
                </SelectContent>
              </Select>
              <Input
                className="max-w-lg flex-1 bg-slate-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                placeholder="Ingresa una ubicación"
                type="text"
              />
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
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

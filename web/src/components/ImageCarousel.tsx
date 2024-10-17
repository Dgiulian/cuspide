// import { Image } from "astro:assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type PropiedadType = {
  imagenes: string[];
};

interface Props {
  propiedad: PropiedadType;
}

const ImageCarousel = ({ propiedad }: Props) => (
  <Carousel className="w-full max-w-3xl mx-auto mb-8">
    <CarouselContent>
      {propiedad.imagenes.map((src, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <Image
              src={src}
              alt={`Imagen de la propiedad ${index + 1}`}
              width={600}
              height={400}
              className="w-full object-cover rounded-lg"
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

export default ImageCarousel;

// import { Image } from "astro:assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StrapiImage } from "@/services/properties";
import Image from "next/image";

interface Props {
  images: string[] | StrapiImage[];
}

const ImageCarousel = ({ images }: Props) => {
  return (
    <Carousel className="w-full max-w-3xl mx-auto mb-8">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={getImageUrl(src)}
                alt={`Imagen de la propiedad ${index + 1}`}
                width={600}
                height={400}
                className="w-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-gray-600 dark:text-white" />
      <CarouselNext className="text-gray-600 dark:text-white" />
    </Carousel>
  );
};

export default ImageCarousel;

function getImageUrl(image: string | StrapiImage) {
  if (typeof image === "string") {
    return image;
  }
  return image.url;
}

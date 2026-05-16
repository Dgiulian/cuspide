"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  images: string[];
}

const ImageCarousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter out empty/null images
  const validImages = images.filter(Boolean);
  
  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[16/10] bg-secondary rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-secondary">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full h-full cursor-zoom-in">
              <Image
                src={validImages[currentIndex]}
                alt={`Imagen ${currentIndex + 1} de ${validImages.length}`}
                fill
                className="object-cover transition-transform duration-500"
                priority
              />
              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 text-white p-2 rounded-full">
                  <Expand className="h-5 w-5" />
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={validImages[currentIndex]}
                alt={`Imagen ${currentIndex + 1} de ${validImages.length}`}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {validImages.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

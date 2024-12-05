import leftImage from "@/images/contacto-bg.jpg";
import { ContactForm } from "@/components/contacto-form";
import Image from "next/image";

export default function ContactoPage() {
  return (
    <div className="h-full dark:bg-gray-900 dark:text-gray-100">
      {/* Left side - Contact Form */}
      <div className="grid grid-cols-2 h-full">
        <div className="w-full p-8 overflow-auto dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 dark:text-gray-100">
            Contáctanos
          </h2>
          <ContactForm />
        </div>
        {/* Right side - Full-screen Responsive Image */}
        <div className="relative h-full">
          <Image
            src={leftImage}
            alt="Imagen de contacto"
            className="absolute inset-0 w-full h-full object-scale-down"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

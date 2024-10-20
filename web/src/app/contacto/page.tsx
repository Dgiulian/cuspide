"use client";

import leftImage from "@/images/contacto-bg.jpg";
import { ContactForm } from "@/components/contacto-form";
import Image from "next/image";

export default function ContactoPage() {
  return (
    <div className="h-screen dark:bg-gray-900 dark:text-gray-100">
      {/* Left side - Contact Form */}
      <div className="flex ">
        <div className="w-1/2 p-8 overflow-auto dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 dark:text-gray-100">
            Contáctanos
          </h2>
          <ContactForm />
        </div>
        {/* Right side - Full-height Image */}
        <div className="w-1/2 h-full">
          <Image
            src={leftImage}
            alt="Imagen de contacto"
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

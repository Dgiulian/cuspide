import { ServiceCard } from "@/app/benefits-section/service-card";
import React from "react";

const BenefitsSection = () => {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800"
      id="destacados"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          Por qu&eacute; elegirnos
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Agentes Expertos",
              description:
                "Nuestro equipo de agentes experimentados está aquí para guiarte.",
            },
            {
              title: "Amplia Selección",
              description: "Explora nuestro extenso portafolio de propiedades.",
              subtitle: "confianza de miles",
            },
            {
              title: "Proceso Sencillo",
              description:
                "Hacemos que comprar y vender propiedades sea fácil y sin complicaciones.",
            },
          ].map((item, i) => (
            <ServiceCard
              key={i}
              title={item.title}
              description={item.description}
              subtitle={item.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

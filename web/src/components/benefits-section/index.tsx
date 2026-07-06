import { ServiceCard } from "@/components/benefits-section/service-card";
import Reveal from "@/components/reveal";
import React from "react";

const BenefitsSection = () => {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
      id="destacados"
    >
      <div className="container px-4 md:px-6">
        <Reveal className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Nuestra promesa
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Por qué elegirnos
          </h2>
        </Reveal>
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
            <Reveal key={i} delay={i * 120} className="h-full">
              <ServiceCard
                title={item.title}
                description={item.description}
                subtitle={item.subtitle}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

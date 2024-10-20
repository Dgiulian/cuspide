import { Building2, PhoneCall, Trophy, Users } from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Sobre Nosotros</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Building2 className="mr-2" />
            Nuestra Historia
          </h3>
          <p className="dark:text-gray-300">
            Fundada en 2024, Cuspide Bienes Raices ha sido líder en el mercado
            inmobiliario local durante más de 15 años. Nuestra pasión por ayudar
            a las personas a encontrar su hogar ideal nos ha convertido en la
            agencia de confianza para miles de clientes satisfechos.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" />
            Nuestro Equipo
          </h3>
          <p className="dark:text-gray-300">
            Contamos con un equipo de profesionales altamente calificados y
            dedicados. Nuestros agentes inmobiliarios tienen un profundo
            conocimiento del mercado local y están comprometidos a proporcionar
            un servicio excepcional a cada cliente.
          </p>
        </div>
      </div>

      <div className="dark:bg-gray-800 p-6 rounded-lg mb-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
          <Trophy className="mr-2" />
          Nuestros Logros
        </h3>
        <ul className="list-disc list-inside dark:text-gray-300">
          <li>Más de 10,000 propiedades vendidas</li>
          <li>
            Galardonados como &quot;Mejor Agencia Inmobiliaria&quot; en 2020 y
            2021
          </li>
          <li>98% de satisfacción del cliente</li>
          <li>Presencia en 5 ciudades principales</li>
        </ul>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Nuestra Misión</h3>
        <p className="dark:text-gray-300 mb-6">
          En Cuspide Bienes Raices, nuestra misión es simplificar el proceso de
          compra, venta y alquiler de propiedades, proporcionando un servicio
          personalizado y de alta calidad a cada uno de nuestros clientes.
        </p>
        <a
          href="/contacto"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <PhoneCall className="mr-2" />
          Contáctanos
        </a>
      </div>
    </div>
  );
}

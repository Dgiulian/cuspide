import { Bed, Bath, Square, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { PropiedadType } from "@/services/properties";
import { formatPrice } from "@/lib/utils";

interface Props {
  property: PropiedadType;
}

const PropertyDetails = ({ property }: Props) => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
      <CardHeader>
        <CardTitle>Descripción</CardTitle>
        <CardDescription className="text-gray-400">
          {/* propertyDetail?.description && (
          <BlocksRenderer
            content={propertyDetail.description as BlocksContent}
          />
        )*/}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            {property.price
              ? formatPrice(property.price, property.currency)
              : "Consultar precio"}
          </span>
          <Badge variant="secondary">En Venta</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Bed className="mr-2" />
            <span>{property.rooms} Habitaciones</span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-2" />
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="flex items-center">
            <Square className="mr-2" />
            <span>{property.built_surface} m²</span>
          </div>
        </div>

        {property.agente && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="font-semibold mb-2">Contactar al Agente</h3>
            <p className="font-medium">{property.agente?.name}</p>
            <div className="flex items-center mt-2">
              <Phone className="mr-2" size={16} />
              <span>{property.agente?.phone}</span>
            </div>
            <div className="flex items-center mt-1">
              <Mail className="mr-2" size={16} />
              <span>{property.agente?.email}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyDetails;

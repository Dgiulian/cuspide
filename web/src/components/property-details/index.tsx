import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Square } from "lucide-react";

import { Property } from "@/domain/property";
import { formatPrice } from "@/lib/utils";
import BlockArrayRenderer from "../block-array-render";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  property: Property;
}

const PropertyDetails = ({ property }: Props) => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 flex flex-col">
      <CardHeader className=" flex-1">
        <CardTitle>Descripción</CardTitle>
        <CardDescription className="text-gray-400">
          {property?.description && (
            <BlockArrayRenderer blockArrayContent={property.description} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="justify-self-end">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            {property.price
              ? formatPrice(
                  property.price.toString(),
                  property.currency ?? "ars"
                )
              : "Consultar precio"}
          </span>
          <Badge variant="secondary">En Venta</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Bed className="mr-2" />
            <span>
              {`${property.rooms} ${property.rooms === 1 ? "Habitación" : "Habitaciones"}`}{" "}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-2" />
            <span>{`${property.bathrooms} ${property.bathrooms === 1 ? "Baño" : "Baños"}`}</span>
          </div>
          <div className="flex items-center">
            <Square className="mr-2" />
            <span>{property.lot_size} m²</span>
          </div>
        </div>

        {/* property.agente && (
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
        ) */}
      </CardContent>
    </Card>
  );
};

export default PropertyDetails;

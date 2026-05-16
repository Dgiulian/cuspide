import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Car, Calendar, Home } from "lucide-react";
import { Property } from "@/domain/property";
import { formatPrice } from "@/lib/utils";
import BlockArrayRenderer from "../block-array-render";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  property: Property;
  hideTitle?: boolean;
}

const PropertyDetails = ({ property, hideTitle = false }: Props) => {
  const typeLabels: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    duplex: "Dúplex",
    local: "Local Comercial",
  };

  return (
    <div className="space-y-6">
      {!hideTitle && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Detalles de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent>
            {property.description && (
              <div className="prose prose-stone dark:prose-invert max-w-none">
                <BlockArrayRenderer blockArrayContent={property.description} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Features Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Características</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {property.type && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Home className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Tipo</div>
                  <div className="font-medium">{typeLabels[property.type] || property.type}</div>
                </div>
              </div>
            )}
            
            {property.rooms !== null && property.rooms !== undefined && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Bed className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Habitaciones</div>
                  <div className="font-medium">{property.rooms} {property.rooms === 1 ? "habitación" : "habitaciones"}</div>
                </div>
              </div>
            )}
            
            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Bath className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Baños</div>
                  <div className="font-medium">{property.bathrooms} {property.bathrooms === 1 ? "baño" : "baños"}</div>
                </div>
              </div>
            )}
            
            {property.lot_size && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Square className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Superficie</div>
                  <div className="font-medium">{property.lot_size} m²</div>
                </div>
              </div>
            )}
            
            {property.garage !== null && property.garage !== undefined && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Garage</div>
                  <div className="font-medium">{property.garage ? "Sí" : "No"}</div>
                </div>
              </div>
            )}
            
            {property.publishedAt && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Publicado</div>
                  <div className="font-medium">
                    {new Date(property.publishedAt).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Precio</div>
                <div className="text-2xl font-bold text-primary">
                  {property.price
                    ? formatPrice(property.price.toString(), property.currency ?? "ars")
                    : "Consultar precio"}
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                En Venta
              </Badge>
            </div>
            
            {property.price && property.lot_size && (
              <div className="mt-2 text-sm text-muted-foreground">
                {formatPrice(Math.round(property.price / property.lot_size).toString(), property.currency ?? "ars")} / m²
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetails;

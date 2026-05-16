import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description?: string;
  subtitle?: string;
}

export function ServiceCard({
  title,
  description,
  subtitle,
}: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">
          <slot name="icon" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {subtitle && (
        <CardFooter>
          <Check className="text-primary mr-2" />
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        </CardFooter>
      )}
    </Card>
  );
}

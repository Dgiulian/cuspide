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
    <Card className="dark:bg-gray-700 dark:border-gray-600">
      <CardHeader>
        <div className="flex justify-center">
          <slot name="icon" />
        </div>
        <CardTitle className="dark:text-gray-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="dark:text-gray-300">{description}</p>
      </CardContent>
      {subtitle && (
        <CardFooter>
          <Check className="text-green-400 mr-2" />
          <span className="text-sm text-gray-400">{subtitle}</span>
        </CardFooter>
      )}
    </Card>
  );
}

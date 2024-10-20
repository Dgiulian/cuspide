"use client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending: isLoading } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isLoading ? "Enviando " : "Enviar "} Mensaje
    </Button>
  );
}

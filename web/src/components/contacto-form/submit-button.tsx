"use client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending: isLoading } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Enviando..." : "Enviar Mensaje"}
    </Button>
  );
}

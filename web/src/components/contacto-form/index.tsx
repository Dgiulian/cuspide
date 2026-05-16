"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactMessage } from "./actions";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { SubmitButton } from "./submit-button";
import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ingrese su nombre completo" }),
  email: z.string().email({ message: "Ingrese un email válido" }),
  phone: z.string().min(8, { message: "Ingrese un teléfono válido" }).optional().or(z.literal("")),
  subject: z.string().min(5, { message: "Ingrese un asunto" }),
  message: z.string().min(20, {
    message: "El mensaje debe tener al menos 20 caracteres",
  }),
});

const initialState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Success state
  if (!isPending && state.success) {
    return (
      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-200">
          ¡Mensaje enviado!
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          Gracias por contactarnos. Hemos recibido tu mensaje y un asesor se pondrá en contacto contigo en menos de 24 horas hábiles.
        </AlertDescription>
      </Alert>
    );
  }

  // Error state
  if (!isPending && state.message && !state.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Error al enviar</AlertTitle>
        <AlertDescription>
          {state.message || "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos por teléfono."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-5" action={formAction}>
        {/* Name & Email Row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: María González"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone & Subject Row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+54 299 123 4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asunto *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Consulta sobre propiedad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos en qué podemos ayudarte. Incluye detalles como tipo de propiedad, presupuesto, zona preferida, etc."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-muted-foreground">
          Al enviar este formulario, aceptas nuestra política de privacidad. 
          Tus datos serán tratados de forma confidencial.
        </p>

        <SubmitButton />
      </form>
    </Form>
  );
}

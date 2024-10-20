import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/form";
import { SubmitButton } from "./submit-button";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ingrese su nombre" }),
  email: z.string().email({ message: "Ingrese su email" }),
  phone: z.string({ message: "Ingrese un email valido" }).optional(),
  message: z.string().min(10, {
    message: "El mensaje debe tener por lo menos 10 caracteres",
  }),
});
export function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "Diego",
      email: "giuliani.diego@gmail.com",
      phone: "",
      message: "First contact form",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6" action={sendContactMessage}>
        <div className="space-y-2">
          <Label htmlFor="nombre" className="dark:text-gray-300">
            Nombre
          </Label>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="nombre"
                    placeholder="Tu nombre completo"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="dark:text-gray-300">
            Correo Electr&oacute;nico
          </Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono" className="dark:text-gray-300">
            Teléfono
          </Label>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 123 456 789"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mensaje" className="dark:text-gray-300">
            Mensaje
          </Label>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aqu&iacute;"
                    className="min-h-[100px] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton />
      </form>
    </Form>
  );
}

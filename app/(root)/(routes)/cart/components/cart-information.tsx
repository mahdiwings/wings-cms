'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema2 = z.object({
  name: z.string().min(1),
  merchantCode: z.string().min(8),
  storeEmail: z.string().min(6),
});

const CartInformation = ({onSubmit}) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      name: "",
      merchantCode: "",
      storeEmail: "",
    },
  });
  return (
    <div style={{ direction: "rtl" }} className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم فروشگاه:</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="E-Commerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name="merchantCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مرچنت کد (زرین پال):</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Merchant code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name="storeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل فروشگاه:</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CartInformation;

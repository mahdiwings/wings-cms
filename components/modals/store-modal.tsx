// !Done
"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast/headless";

const formSchema = z.object({
  name: z.string().min(1),
  merchantCode: z.string().min(8),
  storeEmail: z.string().min(6),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      merchantCode: "",
      storeEmail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://cms-9lh8.onrender.com/api/store",
        {
          storeName: values.name,
          storeEmail: values.storeEmail,
          merchantCode: values.merchantCode,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      window.location.assign(`/admin-cms/${response.data._id}`);
      // console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="ساخت فروشگاه"
      description="برای اضافه کردن یک فروشگاه جدید اطلاعات زیر را کامل کنید"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div style={{ direction: "rtl" }}>
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
                      <Input disabled={loading} placeholder="Merchant code" {...field} />
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
              <div className="space-x-2 gap-x-2 pt-6 flex justify-end items-center">
                <Button disabled={loading} type="submit">
                  ساخت فروشگاه
                </Button>
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={storeModal.onClose}
                >
                  لغو
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

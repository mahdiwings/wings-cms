"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";
import useCart from "@/hooks/store/use-cart";
import Currency from "@/components/store/ui/currency";
import Button from "@/components/store/ui/button";
// {/* User Information */}

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
// {/* User Information */}

const formSchema2 = z.object({
  fullName: z.string().min(3),
  email: z.string().min(3), 
  phoneNumber: z.string().min(10).refine(value => /^\d+$/.test(value), {
    message: "شماره تلفن باید فقط دارای ارقام باشد.",
  }),  // products: z.string().min(6),
  // totalPrice: z.string().min(6),
  address: z.string().min(8),
  zipCode: z.string().min(5).refine(value => /^\d+$/.test(value)), 
});

const Summary = () => {
  // {/* User Information */}

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      // products: "",
      // totalPrice: "",
      address: "",
      zipCode: "",
    },
  });
  // {/* User Information */}

  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async (values: z.infer<typeof formSchema2>) => {
    const response = await axios.post(
      `https://cms-9lh8.onrender.com/api/658f3c0965d0a349e228f59c/orders`,
      {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        products: items.map((item) => item._id),
        totalPrice: totalPrice,
        address: values.address,
        zipCode: values.zipCode,
      }
    );

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">مجموع سفارش</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <Currency value={totalPrice} />
          <div className="text-base font-medium text-gray-900">مبلغ کل</div>
        </div>
        <hr />
        <br />
      </div>
      <div>
        {/* User Information */}
        <div style={{ direction: "rtl" }} className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCheckout)}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="نام کامل شما"
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="09103261261"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل:</FormLabel>
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
              <br />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس :</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="text"
                        placeholder="تهران - خیابان مطهری ...."
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
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کدپستی :</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="4215828"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                // onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full mt-9"
              >
                تسویه حساب
              </Button>
            </form>
          </Form>
        </div>
        {/* User Information */}
      </div>
    </div>
  );
};

export default Summary;

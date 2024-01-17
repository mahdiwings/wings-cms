"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";

// interface SettingFormProps {
//   initialData: Store;
// }

const formSchema = z.object({
  name: z.string().min(1),
  merchantCode: z.string().min(5),
  storeEmail: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(
        `https://cms-9lh8.onrender.com/api/store/${params.storeId}`,
        {
          storeName: data.name,
          merchantCode: data.merchantCode,
          storeEmail: data.storeEmail,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      router.refresh();
      toast.success("Store Updated");
    } catch (error: any) {
      toast.error("something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`/api/stores/${params.storeId}`);
  //     router.refresh();
  //     router.push("/");
  //     toast.success("Store deleted.");
  //   } catch (error: any) {
  //     toast.error("Make sure you removed all products and categories first.");
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfrim={() => onDelete()}
      /> */}
      <div className="flex item-center justify-between ">
        <Heading title="Settings" description="Manage and Update Store preferences" />
        {/* <Button
          disabled={loading}
          variant={"destructive"}
          size={"icon"}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-6 w-6" />
        </Button> */}
      </div>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
           <div>
           <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="اسم فروشگاه"
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
                  <FormLabel>Merchant Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="مرچنت کد زرین پال"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ایمیل فروشگاه"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
          <br />
        </form>
      </Form>
      <hr />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      />
    </>
  );
};

export default SettingsForm;

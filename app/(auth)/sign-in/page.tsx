// !Done
"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/user-auth-form";
import { ToasterProvider } from "@/provider/toast-provider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

// const metadata: Metadata = {
//   title: "Login CMS",
//   description: "Authentication forms built using the components.",
// };

export default function AuthenticationPage() {
  const token = localStorage.getItem("token");
  // const router = useRouter();
  const GetStoreFetch = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/store`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const store = response.data;
      // console.log(response.data);

      // if (store.length > 0) {
      //   const selectedStore = store[0];
      //   router.push(`/admin-cms/${selectedStore._id}`);
      // }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  // useEffect(() => {
    GetStoreFetch();
  // }, []);

  return (
    <>
      <ToasterProvider />
      <div
        style={{ direction: "rtl" }}
        className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      >
        {/* <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          برگشت
        </Link> */}
        <div className="lg:p-8">
          <div className="mx-auto mt-[40%] sm:-mt-[10%] flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold ">ورود به پنل مدیریت</h1>
              <p className="text-sm text-muted-foreground">
                ایمیل و رمز عبور خود را در زیر وارد کنید.
              </p>
            </div>
            <UserAuthForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
        <div
          style={{ direction: "ltr" }}
          className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        >
          <div className="absolute inset-0 bg-zinc-950" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            WingsCMS
          </div>
          <Image
            src="https://images.wallpapersden.com/image/download/purple-glowing-wave-4k-windows-11_bmZmZWuUmZqaraWkpJRobWllrWdma2U.jpg"
            //   width={1280}
            //   height={843}
            fill
            alt="Authentication"
            className="opacity-60 dark:block"
          />
        </div>
      </div>
    </>
  );
}

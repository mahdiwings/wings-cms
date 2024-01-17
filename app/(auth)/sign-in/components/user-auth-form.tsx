// !Done
"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://cms-9lh8.onrender.com/api/users/adminlogin",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response);
      const { token } = response.data;

      // ذخیره توکن در localStorage یا در مکان مناسب دیگر
      localStorage.setItem("token", token);
      console.log("Admin Login successful");
      router.push("/admin-cms")
      toast.success("ورود موفقیت آمیز بود، خوش آمدید");
    } catch (err: any) {
      toast.error("رمز و ایمیل خود را به درستی وارد کنید");
      // console.log(err.response.data)
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="123456789"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            ورود به پنل
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

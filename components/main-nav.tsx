"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin-cms/${params.storeId}`,
      label: "Overview",
      active: pathname === `/admin-cms/${params.storeId}`,
    },
    {
      href: `/admin-cms/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/admin-cms/${params.storeId}/billboards`,
    },
    {
      href: `/admin-cms/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/admin-cms/${params.storeId}/categories`,
    },
    {
      href: `/admin-cms/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/admin-cms/${params.storeId}/sizes`,
    },
    {
      href: `/admin-cms/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `admin-cms/${params.storeId}/colors`,
    },
    {
      href: `/admin-cms/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/admin-cms/${params.storeId}/products`,
    },
    {
      href: `/admin-cms/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/admin-cms/${params.storeId}/orders`,
    },
    {
      href: `/admin-cms/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/admin-cms/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((rout) => (
        <Link
          key={rout.href}
          href={rout.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary", rout.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {rout.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;

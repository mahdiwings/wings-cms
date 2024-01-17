// !Done
"use client";
import React, { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import TokenChecker from "./token";
import axios from "axios";
import NotificationBell from "./notification-bell";

const Navbar = () => {
  const [storesId, setStoresId] = useState([]);

  const token = localStorage.getItem("token");
  <TokenChecker />;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cms-9lh8.onrender.com/api/store",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const stores = response.data;
      setStoresId(stores);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(storesId);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={storesId} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <NotificationBell /> */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

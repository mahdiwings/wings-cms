// !Done
"use client";
// components/AdminLayout.tsx
import { ToasterProvider } from "@/provider/toast-provider";
import { ModalProvider } from "@/provider/modal-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { constants } from "crypto";
import { useStoreModal } from "@/hooks/use-store-modal";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [IsStore, setTsStore] = useState(true);
  const router = useRouter();
  // ! Authortion
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/sign-in");
  }

  const GetStoreFetch = async () => {
    try {
      const response = await axios.get(
        "https://cms-9lh8.onrender.com/api/store",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const store = response.data;
      console.log(response.data);

      if (store.length > 0) {
        const selectedStore = store[0];
        router.push(`/admin-cms/${selectedStore._id}`);
        setTsStore(false);
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    GetStoreFetch();
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ToasterProvider />
          {IsStore ? <ModalProvider /> : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
export default AdminLayout;

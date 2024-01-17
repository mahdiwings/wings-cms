// !Done
import Navbar from "@/components/Navbar";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: string;
  params: { storeId: string };
}) {
  
  const GetStoreFetch = async () => {
    const token = localStorage.getItem("token");
    // ! Authortion
    if (!token) {
      redirect("/sign-in");
    }
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

      if (store.length <= 0) {
        redirect(`/admin-cms`);
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };
  GetStoreFetch();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

"use client";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import axios from "axios";
import { useEffect, useState } from "react";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: React.FC<SettingPageProps> = ({ params }) => {
  const [store, setStore] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/store/${params.storeId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setStore(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, []);

  console.log(store);
  
  // const store = await prismadb.store.findFirst({
  //     where: {
  //         id: params.storeId,
  //         userId
  //     }
  // })

  // if(!store) {
  //     redirect("/")
  // }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
        {/* <SettingsForm initialData={store} /> */}
      </div>
    </div>
  );
};

export default SettingPage;

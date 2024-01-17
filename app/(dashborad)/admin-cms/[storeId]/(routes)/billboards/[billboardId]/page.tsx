"use client";
import React, { useEffect, useState } from "react";
import { BillboardForm } from "./components/billboard-form";
import axios from "axios";
import token from "@/components/token";

const BillboardPage = ({ params }: { params: { billboardId: string } }) => {
  const [billboard, setBillboard] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBillboardData = async () => {
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/billboards/${params.billboardId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setBillboard(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching billboard data:", error);
      }
    };

    fetchBillboardData();
  }, []);

  console.log(billboard);

  //     const billboard = await prismadb.billboard.findUnique({
  //     where: {
  //       id: params.billboardId,
  //     },
  //   });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;

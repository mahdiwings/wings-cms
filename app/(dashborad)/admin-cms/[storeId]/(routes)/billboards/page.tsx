'use client'
import React, { useState } from "react";
import BillboardsClient from "./components/client";
import { BillboardColumn } from "./components/colmuns";
import { format } from "date-fns";
import axios from "axios";

const BillboardsPage = ({ params }: { params: { storeId: string } }) => {
  // const billboards = await prismadb.billboard.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });

  const [billboards, setBillboards] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBillboardData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/billboards`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setBillboards(response.data);
    } catch (error) {
      console.error("Error fetching billboard data:", error);
    }
  };
  fetchBillboardData()
  // const billboards: string[] = [
  //   {
  //     id: 1,
  //     label: "test",
  //     createdAt: "2023-12-13",
  //   },
  // ];
  // این بیلبورد بالا الکیه فقط برای رفع خطا

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item._id,
    label: item.lable,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <BillboardsClient data={formattedBillboards} />
        {/* <BillboardsClient  /> */}
      </div>
    </div>
  );
};

export default BillboardsPage;

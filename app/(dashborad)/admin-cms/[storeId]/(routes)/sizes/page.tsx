'use client'
import React, { useState } from "react";
import SizesClient from "./components/client";
import { SizesColumn } from "./components/colmuns";
import { format } from "date-fns";
import axios from "axios";

const SizesPage =  ({ params }: { params: { storeId: string } }) => {
  // const sizes = await prismadb.Size.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });

  const [sizes, setSizes] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSizeData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/sizes`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setSizes(response.data);
    } catch (error) {
      console.error("Error fetching size data:", error);
    }
  };
  fetchSizeData();

  const formattedSizes: SizesColumn[] = sizes.map((item) => ({
    id: item._id,
    name: item.title,
    value: item.value,
    // sizeLabel: item.size.label,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <SizesClient data={formattedSizes} />
        {/* <SizesClient  /> */}
      </div>
    </div>
  );
};

export default SizesPage;

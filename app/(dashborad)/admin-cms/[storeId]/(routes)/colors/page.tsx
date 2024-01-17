'use client'
import React, { useState } from "react";
import ColorsClient  from "./components/client";
import {ColorsColumn}  from "./components/colmuns";
import { format } from "date-fns";
import axios from "axios";

const ColorsPage = ({ params }: { params: { storeId: string } }) => {
  // const colors = await prismadb.color.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });
  const [colors, setColors] = useState([]);
  const token = localStorage.getItem("token");

  const fetchColorData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/colors`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setColors(response.data);
    } catch (error) {
      console.error("Error fetching color data:", error);
    }
  };
  fetchColorData();

  // این بیلبورد بالا الکیه فقط برای رفع خطا

  const formattedColors: ColorsColumn[] = colors.map((item) => ({
    id: item._id,
    name: item.title,
    value: item.value,
    // billboardLabel: item.billboard.label,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <ColorsClient data={formattedColors} />
        {/* <ColorsClient  /> */}
      </div>
    </div>
  );
};

export default ColorsPage;

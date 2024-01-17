// import prismadb from "@/lib/prismadb";
// "use client";
import axios from "axios";
import { useState } from "react";

export const getSalesCount = async (storeId: string) => {
  // const salesCount = await prismadb.order.count({
  //   where: {
  //     storeId,
  //     isPaid: true
  //   },
  // });
  // const [orders, setOrders] = useState(0);

  // const fetchOrderData = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await axios.get(
  //       `https://cms-9lh8.onrender.com/api/${storeId}/orders`,
  //       {
  //         headers: {
  //           authorization: `${token}`,
  //         },
  //       }
  //     );
  //     // محاسبه مجموع درآمد
  //     const totalIncome = response.data.reduce(
  //       (acc, purchase) => acc + purchase.amount,
  //       0
  //     );
  //     setOrders(totalIncome);
  //   } catch (error) {
  //     console.error("Error fetching order data:", error);
  //   }
  // };
  // fetchOrderData();
  // DataBase

  const salesCount = 10; // For Test

  return salesCount;
};

"use client";
import React, { useState } from "react";
import OrdersClient from "./components/client";
import { OrderColumn } from "./components/colmuns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import axios from "axios";

const OrdersPage = ({ params }: { params: { storeId: string } }) => {
  // const orders = await prismadb.order.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   include: {
  //     orderItems: {
  //       include: {
  //         product: true
  //       }
  //     }
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/orders`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setOrders(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  fetchOrderData();

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    phone: item.phoneNumber,
    email: item.email,
    address: item.address,
    zipCode: item.zipCode,
    totalPrice: `${item.totalPrice.toLocaleString("fa-IR")} تومان`,

    color: item.products.map((colorItem) => colorItem.color.title).join(" | "),
    size: item.products.map((orderItem) => orderItem.size.title).join(" | "),
    products: item.products.map((orderItem) => orderItem.title).join(" | "),
    // totalPrice: item.orderItems.reduce((total, item) => {
    //   return total + Number(item.product.price).toLocaleString("fa-IR");
    // }),
    // اینا برای رفع ارور کامنت شدن، باید برگردن
    isPaid: item.paid,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
        {/* <OrdersClient  /> */}
      </div>
    </div>
  );
};

export default OrdersPage;

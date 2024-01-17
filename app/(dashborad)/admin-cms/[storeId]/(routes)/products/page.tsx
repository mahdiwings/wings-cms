'use client'
import React, { useState } from "react";
import ProductsClient from "./components/client";
import { ProductColumn } from "./components/colmuns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import axios from "axios";

const ProductsPage = ({ params }: { params: { storeId: string } }) => {
  // const products = await prismadb.product.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   include: {
  //     category: true,
  //     size: true,
  //     color: true,
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCategorieData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/products`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching categorie data:", error);
    }
  };
  fetchCategorieData();

  // just test
  // const products: string[] = [
  //   {
  //     id: 1,
  //     name: "T-shirt",
  //     createdAt: "2023-12-13",
  //     price: "16000",
  //     category: "T Shirt",
  //     size: "XL",
  //     color: "Black",
  //     createdAt: "2020",
  //     isFeatured: true,
  //     isArchived: false,
  //   },
  // ];
  // این بیلبورد بالا الکیه فقط برای رفع خطا

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item._id,
    name: item.title,
    quantity: item.quantity,
    isFeatured: item.featured,
    isArchived: item.archived,
    price: `${item.price.toLocaleString("fa-IR")} تومان`,
    // price: formatter.format(item.price.toNumber()),
    category: item.category.title,
    size: item.size.title,
    color: item.color.value,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
        {/* <ProductsClient  /> */}
      </div>
    </div>
  );
};

export default ProductsPage;

'use client'
import React, { useState } from "react";
import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import axios from "axios";

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
  // const categories = await prismadb.Categorie.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCategorieData = async () => {
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/categories`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categorie data:", error);
    }
  };
  fetchCategorieData();
  // const categories: string[] = [
  //   {
  //     id: 1,
  //     name: "test-shop-1",
  //     createdAt: "2023-12-13",
  //   },
  // ];
  // این بیلبورد بالا الکیه فقط برای رفع خطا

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item._id,
    name: item.title,
    billboardLabel: item.billboard.lable,
    // createdAt: format(item.createdAt, "MMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMM do, yyyy"), //this is for test
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
        {/* <CategoriesClient  /> */}
      </div>
    </div>
  );
};

export default CategoriesPage;

'use client'
import React, { useEffect, useState } from "react";
import { CategoryForm } from "./components/category-form";
import axios from "axios";

const CategoryPage = ({ params }: { params: { categoryId: string , storeId: string} }) => {
  //     const Category = await prismadb.Category.findUnique({
  //     where: {
  //       id: params.CategoryId,
  //     },
  //   });

  // Get All Billboards
  const [billboards, setBillboards] = useState([]);
  const [category, setCategory] = useState(null);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchBillboardAndCategoriesData = async () => {
      
      // Get  Category Id
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/categories/${params.categoryId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }

      // Get All Billboards
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching billboard data:", error);
      }
    };

    fetchBillboardAndCategoriesData();
  }, []);

  console.log(billboards);
  console.log(category);
  // const billboards = await prismadb.billboard.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
        {/* <CategoryForm billboards={billboards} initialData={category} /> */}
      </div>
    </div>
  );
};

export default CategoryPage;

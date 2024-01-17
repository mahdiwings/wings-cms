'use client'
import React, { useEffect, useState } from "react";
import { ProductForm } from "./components/product-form";
import axios from "axios";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBillboardAndCategoriesData = async () => {
      // Get Product Id
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/products/${params.productid}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching produ data:", error);
      }
      // Get All Category
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }

      // Get All Sizes
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching size data:", error);
      }
      // Get All Colors
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching colors data:", error);
      }
    };
    fetchBillboardAndCategoriesData();

  }, []);

  // console.log(billboards);
  // console.log(category);
  // console.log(category);
  // console.log(category);
  //     const product = await prismadb.product.findUnique({
  //     where: {
  //       id: params.productId,
  //     },
  //     include: {
  //       images: true,
  //     },
  //   });
  
  // const categories = await prismadb.category.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  // const sizes = await prismadb.size.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  // const colors = await prismadb.color.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;

'use client'
import React, { useEffect, useState } from "react";
import { SizeForm } from "./components/size-form";
import axios from "axios";

const SizePage = ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const [size, setSize] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSizeData = async () => {
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/sizes/${params.sizeId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setSize(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching size data:", error);
      }
    };

    fetchSizeData();
  }, []);

  console.log(size);

  //     const size = await prismadb.size.findUnique({
  //     where: {
  //       id: params.sizeId,
  //     },
  //   }); 
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size}/>
        {/* <SizeForm initialData={size} /> */}
      </div>
    </div>
  );
};

export default SizePage;

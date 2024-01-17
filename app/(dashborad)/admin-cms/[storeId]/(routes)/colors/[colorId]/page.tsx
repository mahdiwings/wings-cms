'use client'
import React, { useEffect, useState } from "react";
import { ColorForm } from "./components/color-form";
import axios from "axios";

const ColorPage = ({ params }: { params: { colorId: string } }) => {
  const [color, setColor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchColorData = async () => {
      try {
        const response = await axios.get(
          `https://cms-9lh8.onrender.com/api/colors/${params.colorId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setColor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching color data:", error);
      }
    };

    fetchColorData();
  }, []);

  console.log(color);
  //     const color = await prismadb.color.findUnique({
  //     where: {
  //       id: params.colorId,
  //     },
  //   });
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;

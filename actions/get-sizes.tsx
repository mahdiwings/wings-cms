import { Size } from "@/types";

const URL=`https://cms-9lh8.onrender.com/api/658f3c0965d0a349e228f59c/sizes`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getSizes;

import { Category } from "@/types";

const URL=`https://cms-9lh8.onrender.com/api/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCategory;

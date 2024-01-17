import { Product } from "@/types";

const URL=`https://cms-9lh8.onrender.com/api/products`;

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;

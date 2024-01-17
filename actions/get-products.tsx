import { Product } from "@/types";
import qs from "query-string";

const URL=`https://cms-9lh8.onrender.com/api/658f3c0965d0a349e228f59c/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  featured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.featured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;

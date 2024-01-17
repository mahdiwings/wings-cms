// "use client";

import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import BillboardStore from "@/components/store/billboardstore";
import ProductList from "@/components/store/product-list";
import Container from "@/components/store/ui/container";
import React from "react";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ featured: true });
  // const billboard = getBillboard("");
  const billboard = await getBillboard("6591d1c01a5513d91e1a8337");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardStore data={billboard} />
        {/* <BillboardStore data={[billboard]} /> */}
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="محصولات ویژه" items={products} />
        
      </div>
      </div>
    </Container>
  );
};

export default HomePage;

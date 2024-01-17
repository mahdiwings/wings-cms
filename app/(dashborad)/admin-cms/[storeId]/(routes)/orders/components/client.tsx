"use client";

// import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
// import { Plus } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./colmuns";
import { DataTable } from "@/components/ui/data-table";
// import { ApiList } from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
  // order from Database
}

const OrdersClient: React.FC<OrderClientProps> = ({ data }) => {
  // const router = useRouter();
  // const params = useParams();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <hr />
      <DataTable searchKey="fullName" columns={columns} data={data} />
    </>
  );
};

export default OrdersClient;

"use client";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/admin/get-total-revenue";
import { getSalesCount } from "@/actions/admin/get-sales-count";
// import { getGraphRevenue } from "@/actions/admin/get-graph-revenue";
import { getStockCount } from "@/actions/admin/get-stock-count";
import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { getGraphRevenue } from "@/actions/admin/get-graph-revenue";

// interface DashboardPageProps {
//   params: {
//     storeId: string;
//   };
// }

const DashboardPage = ({ params }) => {

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [graphRevenue, setGraphRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
  const graphRevenueData = await getGraphRevenue(params.storeId);
  setGraphRevenue(graphRevenueData)
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get( 
          `https://cms-9lh8.onrender.com/api/${params.storeId}/orders`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const totalIncome = response.data.reduce(
          (acc, purchase) => acc + purchase.totalPrice,
          0
        );
        setTotalRevenue(totalIncome);

        setSalesCount(response.data.length);
////////////////////////////////////////////////////
        const responseProduct = await axios.get(
          `https://cms-9lh8.onrender.com/api/${params.storeId}/products`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const totalQuantity = responseProduct.data.reduce(
          (acc, purchase) => acc + purchase.quantity,
          0
        );
        setStockCount(totalQuantity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.storeId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <hr />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue.toLocaleString("en-EN")}
                <span className="text-sm"> تومان</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

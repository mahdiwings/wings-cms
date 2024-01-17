// 'use client'
import axios from "axios";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (
  storeId: string
): Promise<GraphData[] | undefined> => {

  
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://cms-9lh8.onrender.com/api/${storeId}/orders`,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );
 
    const paidOrders = response.data;
    // console.log(paidOrders);

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
      const month = new Date(order.createdAt).getMonth();
      let revenueForOrder = 0;
      revenueForOrder += order.totalPrice;
      
      // for (const item of order.products) {
      // }
      
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
      // console.log(revenueForOrder);
    }

    const graphData: GraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    for (const month in monthlyRevenue) {
      graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
  } catch (error) {
    console.error("Error fetching order data garaf:", error);  }
};
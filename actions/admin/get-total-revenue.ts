// // import prismadb from "@/lib/prismadb";

// import axios from "axios";

// export const getTotalRevenue = async (storeId: string) => {
// //   const paidOrders = await prismadb.order.findMany({
// //     where: {
// //       storeId,
// //       isPaid: true
// //     },
// //     include: {
// //       orderItems: {
// //         include: {
// //           product: true
// //         }
// //       }
// //     }
// //   }); DataBase
// // let totalIncome = 0;
// //  const fetchOrderData = async () => {
// //     const token = localStorage.getItem("token");
// //     try {
// //       const response = await axios.get(
// //         `https://cms-9lh8.onrender.com/api/${storeId}/orders`,
// //         {
// //           headers: {
// //             authorization: `${token}`,
// //           },
// //         }
// //       );
// //       // محاسبه مجموع درآمد
// //        totalIncome = response.data;
// //     } catch (error) {
// //       console.error("Error fetching order data:", error);
// //     }
// //   };
// //   fetchOrderData();

// //   const totalRevenue = totalIncome.reduce((total, order) => {
// //     const orderTotal = order.products.reduce((orderSum, item) => {
// //       return orderSum + item.product.price.toNumber();
// //     }, 0);
// //     return total + orderTotal;
// //   }, 0);  
// // // ! IS REAL

// const totalRevenue = 10000; // for Test

//   return totalRevenue;
// };
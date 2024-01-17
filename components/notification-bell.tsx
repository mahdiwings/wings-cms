import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { BellRing } from "lucide-react";

const NotificationBell = () => {
  // const [notifications, setNotifications] = useState(0);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [newOrderCount, setNewOrderCount] = useState(0);
  const lastCheckedRef = useRef(new Date()); // استفاده از useRef برای نگهداری مقدار در رندرهای متعدد

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Dependencies را خالی رها کنید تا فقط یک بار اجرا شود

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://cms-9lh8.onrender.com/api/${params.storeId}/orders`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      const orders = response.data;
      const newOrders = orders.filter((order) =>
        new Date(order.createdAt) > lastCheckedRef.current
      );

      if (newOrders.length > 0) {
        setNewOrderCount((prevCount) => prevCount + newOrders.length);
      }
    } catch (error) {
      console.error("Error fetching new orders:", error);
    }
  };

  const handleClick = () => {
    router.push(`/admin-cms/${params.storeId}/orders`); // ناوبری به صفحه سفارشات
    setNewOrderCount(0); // تعداد اعلان‌ها را به صفر بازنشانی کنید
    lastCheckedRef.current = new Date(); // به‌روز رسانی زمان آخرین چک
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <BellRing className="mr-2 mt-2.5 h-7 w-7" />
        {newOrderCount > 0 && (
          <span className="absolute bottom-0 left-0 rounded-full bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center">
            {newOrderCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
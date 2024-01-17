// !Done
"use client";
import { StoreModal } from "@/components/modals/store-modal";
import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 200);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!token ? (
        <StoreModal />
      ) : (
        <div className="w-full h-full flex justify-center items-center gap-x-4">
          <Loader />
          <p>لطفا چند لحضه منتظر بمانید</p>

        </div>
      )}
    </>
  );
};

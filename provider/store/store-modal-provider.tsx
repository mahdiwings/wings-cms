"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/store/preview-modal";

const StoreModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <PreviewModal />
    </>
   );
}
 
export default StoreModalProvider;
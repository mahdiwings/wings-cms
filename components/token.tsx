"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
          // @ts-ignore

const TokenChecker: React.FC = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    // ! Authentication
    if (!token) {
      redirect("/sign-in");
    }
  }, []);

  return <>{children}</>;
};

export default TokenChecker;

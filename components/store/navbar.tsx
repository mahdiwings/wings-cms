// 'use client'
import React, { useEffect, useState } from "react";
import Container from "./ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
        const categories = await getCategories();
    //     setCategories(categoriesData);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // };

    // fetchCategories();
  // }, []);
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">WingsWeb </p>
          </Link>
          {/* <MainNav data={[]} /> */}
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

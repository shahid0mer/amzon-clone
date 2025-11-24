import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";


export default function MainLayout() {
  return (
    <div className="min-h-screen bg-(--color-amazon-darkblue-lightgrey) flex flex-col">
      <Navbar />
      <BottomNav />

    
      <main className="flex-1 w-full ">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
}

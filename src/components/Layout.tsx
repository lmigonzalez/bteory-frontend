import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col pt-16 ">
      <Navbar />
      <main className="flex w-[1200px] max-w-full flex-1 flex-col px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;

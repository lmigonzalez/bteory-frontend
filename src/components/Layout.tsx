import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className="relative flex min-h-screen flex-col ">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

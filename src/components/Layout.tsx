import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { headers } from "next/dist/client/components/headers";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  name: string;
}

const Layout: React.FC<LayoutProps> = ({ children, name }) => {
  const a = new FormData();
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Created by Luis Miguel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center  pt-16">
        <Navbar />
        <main className="flex w-[1200px] max-w-full flex-1 flex-col px-4">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

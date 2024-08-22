import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-r from-blue-400 to-purple-500">
      <Header />
      <main className="h-full flex justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

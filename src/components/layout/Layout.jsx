import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;

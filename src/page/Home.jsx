import React from "react";
import ContentCarouse from "../components/Home/ContentCarouse";
import BestSeller from "../components/Home/BestSeller";
import DiscountedProduct from "../components/Home/DiscountedProduct";

const Home = () => {
  return (
    <div>
      <ContentCarouse />
      <p className="text-xl font-bold text-center p-3 m-3 w-fit bg-orange-300
       text-white rounded-2xl shadow-md">BEST SELLER PRODUCTS</p>
      <BestSeller />
      <p className="text-xl font-bold text-center p-3 m-3 w-fit bg-orange-300
       text-white rounded-2xl shadow-md">BEST DISCOUNTED PRODUCTS</p>
      <DiscountedProduct />
    </div>
  );
};

export default Home;

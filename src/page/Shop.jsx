import React, { useEffect, useState } from "react";
import ProductCard from "../Card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../Card/SearchCard";
import CartCard from "../Card/CartCard";
import ModalCard from "../Card/ModalCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  
  

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">

      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-auto">
        <SearchCard />
        {/* SearchBar */}
      </div>
      <div className="w-1/2 p-4 h-screen overflow-auto">
        <p className="text-2xl font-bold pb-3 px-1">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          {/* ProductCard */}
          {products.map((item, index) => (
                <ProductCard key={index} item={item}/>
          ))}
          {/* ProductCard */}
        </div>
        {/* Product */}
      </div>

      
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-auto">
        {/* Cart */}
        <CartCard/>
      </div>
    </div>
  

  );
};

export default Shop;

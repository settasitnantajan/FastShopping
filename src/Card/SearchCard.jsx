import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilter = useEcomStore((state) => state.actionSearchFilter);

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.category);
  const actionSearchCategory = useEcomStore(
    (state) => state.actionSearchCategory
  );
  const actionSearchPrice = useEcomStore((state) => state.actionSearchPrice);

  const [text, setText] = useState('');
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([0, 35000]);
  const [ok, setOk] = useState(false);

   
  // step 1 Search text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilter(text);
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // step 2 Search by category
  useEffect(() => {
    getCategory();
  }, []);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);
    
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState)

    if (inState.length > 0) {
      actionSearchCategory(inState);
    } else {
      getProduct();
    }
  };
  
  // step 3 Search by Price
  useEffect(() => {
    actionSearchPrice(price);
  }, [ok]);
  
  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  

  return (
    <div>
      <h1 className="text-xl font-bold p-2">ค้นหาสินค้า</h1>
      <div className="pb-4">
        {/* {search by text} */}
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้า"
          className="w-full px-3 py-2 rounded-2xl shadow-md 
          border border-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </div>

      {/* {Search by category} */}
      <div>
        <h1 className="font-bold text-sm p-2">หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((items, index) => (
            <div
              className="flex flex-wrap gap-2 text-sm text-gray-600"
              key={index}
            >
              <input
                className="m-1"
                onChange={handleCheck}
                value={items}
                type="checkbox"
              />
              <label>{items}</label>
            </div>
          ))}
        </div>
      </div>

      {/* {Search by Price} */}
      <div className="p-3 mt-4 border border-gray-300 rounded-2xl shadow-md">
        <h1 className="font-bold text-sm">ค้นหาราคา</h1>
        <div className="p-2">
          <div className="flex justify-between">
            <span>MIN : {price[0]}</span>
            <span>MAX : {price[1]}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={35000}
            defaultValue={[0, 3000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

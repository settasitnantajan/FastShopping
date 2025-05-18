import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  // const getProduct = useEcomStore((state) => state.getProduct); // getProduct is likely called in Shop.jsx
  const setFilter = useEcomStore((state) => state.setFilter);
  const clearAllFilters = useEcomStore((state) => state.clearAllFilters);
  const currentFilters = useEcomStore((state) => state.currentFilters);

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.category);

  const [text, setText] = useState(currentFilters.text || '');
  const [categorySelected, setCategorySelected] = useState(currentFilters.categories || []);
  const [price, setPrice] = useState(currentFilters.price || [0, 35000]);

  // Effect to sync local state if currentFilters in store changes (e.g., by clearAllFilters)
  useEffect(() => {
    setText(currentFilters.text);
    setCategorySelected(currentFilters.categories);
    setPrice(currentFilters.price);
  }, [currentFilters]);
  // const [ok, setOk] = useState(false); // No longer needed for price filtering

  // Effect for text search (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter('text', text);
    }, 300);
    return () => clearTimeout(delay);
  }, [text, setFilter]);

  // Effect to load categories once
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  // Handler for category checkboxes
  const handleCheck = (e) => {
    const categoryValue = e.target.value;
    const isChecked = e.target.checked;
    let newSelectedCategories;

    if (isChecked) {
      newSelectedCategories = [...categorySelected, categoryValue];
    } else {
      newSelectedCategories = categorySelected.filter(cat => cat !== categoryValue);
    }
    setCategorySelected(newSelectedCategories);
    setFilter('categories', newSelectedCategories);
  };

  // Price is handled by Slider's onChange for local state and onAfterChange for store filter
  // No specific useEffect needed for price if using onAfterChange for setFilter
  // const handlePrice = (value) => { // This can be inlined or simplified
  //   setPrice(value);
  // };

  const handleClearFilters = () => {
    clearAllFilters(); // This will reset store and trigger the useEffect above to update local state
    // Explicitly setting local state here too ensures immediate UI update if needed,
    // though the useEffect should handle it.
    // setText('');
    // setCategorySelected([]);
    // setPrice([0, 35000]);
  };

  return (
    // The parent div in Shop.jsx already provides p-4 and bg-gray-100
    <div className="flex flex-col space-y-6"> {/* Organizes sections vertically */}
      
      <h1 className="text-xl font-semibold text-gray-800">ค้นหาสินค้า</h1>

      {/* Text Search Section */}
      <div>
        {/* {search by text} */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้า..."
          className="w-full px-3 py-2 rounded-lg shadow-sm 
          border border-gray-300 focus:outline-none 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-shadow"
        />
      </div>

      {/* {Search by category} */}
      <div className="space-y-3">
        <h2 className="text-md font-semibold text-gray-700">หมวดหมู่สินค้า</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2"> {/* Scrollable category list, pr-2 for scrollbar */}
          {categories.map((item, index) => ( // Renamed 'items' to 'item'
            <label key={index} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-orange-500 border-gray-300 rounded 
                           focus:ring-orange-400 focus:ring-offset-0 transition duration-150 ease-in-out" // Tailwind Forms plugin style
                onChange={handleCheck}
                value={item}
                checked={categorySelected.includes(item)}
                id={`category-${item}-${index}`} // For label association
              />
              <span className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* {Search by Price} */}
      <div className="space-y-3 pt-4 border-t border-gray-200"> {/* Top border for separation */}
        <h2 className="text-md font-semibold text-gray-700">ค้นหาราคา</h2>
        <div className="px-1"> {/* Slight padding for slider aesthetics */}
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>MIN: {price[0]}</span>
            <span>MAX: {price[1]}</span>
          </div>
          <Slider
            onChange={(value) => setPrice(value)} // Update local state for immediate UI feedback
            onAfterChange={(value) => setFilter('price', value)} // Update store filter after user finishes
            range
            min={0}
            max={35000}
            value={price} // Controlled component
            // Default rc-slider styles will apply. Customization often requires CSS overrides or style props.
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="pt-4">
        <button
          onClick={handleClearFilters}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default SearchCard;

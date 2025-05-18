import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store"
import { Star } from "lucide-react";
import { motion } from "framer-motion"
import { toast } from "react-toastify";


const DetailsModalCardHome = ({item}) => {
    const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
  
    return (
      
      <div className="h-full w-full"> {/* Ensure this div takes full space of SwiperSlide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full" // Ensure motion div also takes full space
        >
          {/* Card container: Aim for height consistency with SkeletonCard (e.g., h-[21rem]) */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[21rem] w-full">
            {/* Image section with discount badge */}
            <div className="relative w-full h-44 sm:h-48 flex-shrink-0"> {/* Fixed height for image area */}
              {
                item.images && item.images?.length > 0 
                ? <img
                    loading="lazy"
                    // Simplified src logic, assuming images[0] is the primary image
                    src={item.images[0]} 
                    alt={item.title || "Product image"} // Use item.title for alt text
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200" // object-contain to see full image, p-2 for padding
                  />
                : <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    No image
                  </div>
              }
              {item.discountPercentage > 0 && ( // Display discount badge only if there's a discount
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  Save {item.discountPercentage}%
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow"> {/* flex-grow allows this section to fill remaining space */}
              <h3 
                className="text-sm sm:text-md font-semibold text-gray-800 truncate mb-1" 
                title={item.title} // Show full title on hover if truncated
              >
                {item.title}
              </h3>

              <div className="mb-2"> {/* Free shipping badge */}
                <span className="border border-orange-400 text-orange-500 font-medium text-xs py-0.5 px-1.5 rounded">
                  Free Shipping
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-600 mb-3"> {/* Rating */}
                <Star size={16} className="text-yellow-400 mr-1"/>
                <span>{item.rating}</span>
              </div>

              {/* Price and Add to Cart Button - pushed to bottom */}
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">${item.price}</span>
                {/* <button 
                  onClick={() => {
                    actionAddtoCart(item);
                    toast.success("Add product to cart Successfully!!", {
                      position: "top-center",
                    });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 sm:p-2.5 shadow-md transition-colors duration-150 cursor-pointer"
                >
                  <ShoppingCart size={18} sm:size={20}/>
                </button> */}
              </div>
            </div>
          </div> 
        </motion.div>
      </div>
      
    );
  };
  
  export default DetailsModalCardHome;
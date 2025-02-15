import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store"
import { Star } from "lucide-react";
import { motion } from "framer-motion"
import { toast } from "react-toastify";


const DetailsModalCardHome = ({item}) => {
    const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
  
    return (
      
      <div>
  
        <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
           <div className="rounded-md shadow-2xl  w-54 h-80 border-b-gray-600">
            <p className="text-center bg-red-500 text-white rounded-2xl">save {item.discountPercentage}%</p>
          <div className="flex justify-center items-center">
        <div>
  
          {
            item.images
            && item.images?.length > 0 
            ? <img
            loading="lazy"
            src={item.images[0]
              ? item.images[0]
              : item.images[1] || item.images[2] || item.images[3]
            } alt={item.tittle} className="w-full h-38 p-4 object-cover hover:scale-110 hover:duration-200"/>
            : <div className="w-full h-24 bg-gray-200 rounded-md shadow">
            No image
          </div>
          }
          </div>
          
  
        </div>
        <div className="px-2">
          <p className="text-l font-bold overflow-hidden truncate pb-3">{item.title}</p>
          <div className="border border-orange-300 text-orange-300 font-bold text-xs w-fit px-1">Free Shipping</div>
          <div className="flex items-center pt-2">
          <Star size={16} className="text-yellow-300"/>
          <p className="text-xs text-yellow-300 px-1">
            {item.rating}</p>
          </div>
        </div>
  
        <div className="flex justify-between items-end px-3">
          <span className="text-xl font-bold">${item.price} </span>
  
          <button onClick={() => {
            actionAddtoCart(item)
            toast.success("Add product to cart Successfully!!", {
                position: "top-center",
              });
        }}
          className="bg-orange-300 rounded-full p-2.5 hover:bg-orange-400 show-md text-white">
            <ShoppingCart/>
          </button>
        </div>
      </div> 
      </motion.div>
  
  
      </div>
      
    );
  };
  
  export default DetailsModalCardHome;
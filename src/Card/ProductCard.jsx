import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { Star } from "lucide-react";
import { motion } from "framer-motion"
import ModalCard from "./ModalCard";
import { toast } from "react-toastify";


const Card = ({item}) => {
  const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
  const actionCreateModal = useEcomStore((state)=> state.actionCreateModal)

  const [showModal, setShowModal] = useState(false)
  
    const getModalCard = () => {
      setShowModal(true)
      actionCreateModal(item)
    }

  return (
    
    <div>

      <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div 
      onClick={getModalCard} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') getModalCard(); }}
      role="button" 
      tabIndex="0" 
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-md" // Added accessibility and styling
    >

         <div className="rounded-md shadow-2xl  w-54 h-84 border-b-gray-600">
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
      <div className="py-2 px-2">
        <p className="text-l font-bold overflow-hidden truncate pb-3">{item.title}</p>
        <p className="text-xs text-gray-500 overflow-hidden truncate">{item.description}</p>
        <p className="text-xs pt-2">{item.availabilityStatus}</p>

        <div className="flex items-center pt-2">

        <Star size={16} className="text-yellow-300"/>
        <p className="text-xs text-yellow-300 px-1">
          {item.rating}</p>
        </div>
      </div>

      <div className="flex justify-between items-end px-3 py-2">
        <span className="text-xl font-bold"><p className="text-xs text-red-400 font-extralight">save {item.discountPercentage}%</p>${item.price} </span>

        <button onClick={(event) => {
          event.stopPropagation()
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
          </div>
    </motion.div>

    <ModalCard isVisible={showModal} onclose={()=>setShowModal(false)}/>


    </div>
    
  );
};

export default Card;

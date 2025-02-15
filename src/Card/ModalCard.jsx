import { Star, ShoppingCart } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { dateFormat } from "../utils/dateFormat";

const ModalCard = ({ isVisible, onclose }) => {
  const modal = useEcomStore((state) => state.modal);
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  if (!isVisible) return null;

  console.log(modal);

  return (
    <div
    className="inset-0 z-50 
    bg-none backdrop-blur-xs fixed
    items-center flex justify-center"
    onClick={onclose}
    >
      <div
        className="bg-white rounded-2xl 
        shadow-2xl w-auto p-2
        h-auto"
        onClick={(event)=>{
          event.stopPropagation()
        }}
        >
        <div className="space-y-2 p-2">
          <div className="shadow-md rounded-md flex justify-center items-center h-72 p-10">
            <div>

              <img
                className="w-68 h-68"
                src={modal?.images ? modal.images[0] : modal.images[1] || modal.images[2]}
                loading="lazy"
                alt={modal.index}
                />

            </div>
                </div>
          </div>
          <div className="py-2 px-2">
            <h1 className="text-xl font-bold pb-1">{modal.title}</h1>
            
            <p className="text-xs text-green-400 p-0.5 rounded-2xl">
              {modal.tags[1]} {modal.tags[2]}
            </p>
            
            <p className="text-xs text-gray-500">{modal.description}</p>
            <p className="text-xs pt-2 text-orange-400">
              stock : {modal.stock} : {modal.availabilityStatus} /{" "}
              {modal.returnPolicy} / {modal.warrantyInformation}
            </p>

            <div className="flex items-center pt-2">
              <Star size={16} className="text-yellow-300" />
              <p className="text-xs text-yellow-300 px-1">{modal.rating}</p>
            </div>

            <div>
              <p className="text-sm">Reviews</p>
              {modal.reviews.map((item, index) => (
                <div
                key={index}
                className="text-xs border border-gray-100 pt-1"
                >
                  <p>
                    Name: {item.reviewerName}/{dateFormat(item.date)}
                  </p>
                  <div className="flex">
                    <span className="px-1">{item.rating}</span>
                    <Star size={16} className="text-yellow-300" />
                  </div>
                  <p className="py-1">{item.comment}</p>

                  <hr className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end px-2 ">
            <span className="text-xl font-bold">
              <p className="text-xs text-red-500">
                Discount : {modal.discountPercentage} %
              </p>
              $ {modal.price}
            </span>

            <button
              onClick={(event) => {
                event.stopPropagation()
                actionAddtoCart(modal)}}
              className="bg-orange-300 rounded-full p-2.5 hover:bg-orange-500 show-md"
            >
              <ShoppingCart />
            </button>
          </div>
      </div>
    </div>
  );
};
export default ModalCard;

import { Star, ShoppingCart } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { dateFormat } from "../utils/dateFormat";
import { numberFormat } from "../utils/number";
import { toast } from "react-toastify";

const ModalCard = ({ isVisible, onclose }) => {
  const modal = useEcomStore((state) => state.modal);
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  if (!isVisible) return null;

  console.log(modal);

  return (
    <div // Backdrop
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onclose}
    >
      <div // Modal Content
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Optional: Close button */}
        {/* <button onClick={onclose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button> */}
        
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex-shrink-0 bg-gray-50 flex items-center justify-center">
            <img
              className="max-w-full max-h-96 object-contain" // Adjusted for better image display
              src={modal?.images?.[0] || 'https://via.placeholder.com/400'} // Use first image or a placeholder
              loading="lazy"
              alt={modal?.title || 'Product Image'}
            />
          </div>

          {/* Details Section - Scrollable */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col overflow-y-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{modal?.title}</h1>
            
            {modal?.tags && modal.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {modal.tags.slice(0, 3).map((tag, index) => ( // Show first 3 tags
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center mb-3">
              <Star size={18} className="text-yellow-400" />
              <p className="text-sm text-gray-700 ml-1.5">{modal?.rating} <span className="text-gray-500">({modal?.reviews?.length} reviews)</span></p>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{modal?.description}</p>

            <div className="mb-4">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Stock:</span> {modal?.stock} ({modal?.availabilityStatus})
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Warranty:</span> {modal?.warrantyInformation}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Return Policy:</span> {modal?.returnPolicy}
              </p>
            </div>

            {/* Price and Add to Cart - sticky at bottom of this column if content overflows, or just at end */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900">{numberFormat(modal?.price)}</span>
                  {modal?.discountPercentage > 0 && (
                    <span className="ml-2 text-sm text-red-600 line-through">
                      {numberFormat(modal.price / (1 - modal.discountPercentage / 100))}
                    </span>
                  )}
                </div>
                {modal?.discountPercentage > 0 && (
                   <span className="text-sm bg-red-100 text-red-700 font-semibold px-2.5 py-1 rounded-md">
                     {modal.discountPercentage}% OFF
                   </span>
                )}
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  actionAddtoCart(modal);
                  toast.success(`${modal?.title || 'Product'} added to cart!`, {
                    position: "top-center",
                  });
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-150"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section - Placed outside the two-column flex for full width if needed, or could be inside details scroll */}
        {modal?.reviews && modal.reviews.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-200 max-h-60 overflow-y-auto"> {/* Scrollable reviews */}
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Customer Reviews</h2>
            {modal.reviews.map((review, index) => (
              <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-b-0 last:mb-0">
                <div className="flex items-center mb-1">
                  <p className="text-sm font-semibold text-gray-800 mr-2">{review.reviewerName}</p>
                  <span className="text-xs text-gray-500">{dateFormat(review.date)}</span>
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalCard;

import { ListChecks } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";

const ListCart = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((s)=> s.user)
  const userStatus = useEcomStore((s)=>s.userStatus)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);   

  const navigate = useNavigate() 

  const handleSaveCart = () => {
    navigate('/checkout')
  }

    console.log(user)
  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <ListChecks size={36} />
        <p className="text-2xl font-bold">รายการสินค้า {carts.length} Pcs.</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        {/* Left */}
        <div className="col-span-2">
          {carts.map((item, index) => (
            <div
              key={index}
              className="mb-2
                    bg-white p-2 rounded-md shadow-xl"
            >
              {/* {Row1} */}
              <div className="flex justify-between ">
                {/* {Left} */}
                <div className="flex mt-2 ml-2 gap-2">
                  {/* {img} */}
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                    {item.images ? (
                      //&& item.images.length > 0
                      <div 
                      className="w-16 h-16 rounded-md shadow-md">
                        <img loading="lazy"
                        src={item.images[0]
                            ? item.images[0]
                            : item.images[1] || item.images[2]
                        } />
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 bg-gray-200
                  rounded-md flex text-center items-center"
                      >
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-1">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs mt-1">
                    {item.price} x {item.count} pcs.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-orange-300 p-3">
                    ${(item.price * item.count).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="border-b-gray-200 rounded-sm px-2 py-1 flex items-center"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="bg-white p-4 rounded-md shadow-md ">
          <p className="text-2xl font-bold px-1">Total</p>
          <div className="flex justify-between">
            <span className="pt-5 px-1">Total Price</span>
            <span className="text-2xl font-bold p-3 text-red-400">${getTotalPrice()}</span>
          </div>

          <div className="flex flex-col gap-2 p-3">

              {/* buy after login user backend */}
              {
                userStatus
                ? <Link>
                <button 
                disabled={carts.length < 1}
                onClick={handleSaveCart}
                className="bg-red-400 text-white rounded-md py-2.5 shadow-md hover:bg-red-700 w-full">
                  Confirm
                </button>
              </Link>
                : <Link to={'/login'}>
                <button className="bg-blue-500 text-white rounded-md py-2.5 shadow-md hover:bg-blue-700 w-full">
                  Login
                </button>
              </Link>
              }

            <Link to={"/shop"}>
              <button className="bg-gray-500 text-white rounded-md py-2.5 shadow-md hover:bg-gray-700 w-full">
                Edit Your Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCart;

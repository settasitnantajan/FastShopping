import { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../utils/number";

const SummaryCard = () => {
  const carts = useEcomStore((stare) => stare.carts);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState({
    address: "",
  });
  const [addressSave, setAddressSave] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    handleGetUserCart(carts);
  }, []);

  const handleGetUserCart = (carts) => {
    setProducts(carts);
    setCartTotal(
      carts.reduce((sum, { price, count }) => sum + price * count, 0)
    );
  };

  const hdlSaveAddress = () => {
    toast.success("save address complete");
    if (!address) {
      return toast.warning("Please fill address");
    }
    setAddressSave(true);
  };

  const hdlGoToPayment = () => {
    if (!addressSave) {
      return toast.warning("pay put your address");
    }
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-auto gap-4">
        {/* Left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md border-gray-200 space-y-3">
            <h1 className="text-lg font-bold">Address</h1>
            <textarea
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="please put your address..."
              className="w-full px-2 bg-white rounded-md"
            />
            <button
              onClick={hdlSaveAddress}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 hover:duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md border-gray-200 space-y-4">
            <h1 className="text-lg font-bold">Your Order</h1>

            {/* Items List */}

            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    {/* item.product.title */}
                    <p className="text-xs font-bold">{item.title}</p>
                    <p className="text-xs p-2">
                      {item.count} Pcs. x {numberFormat(item.price)}
                    </p>
                  </div>

                  <div>
                    <p className="text-red-500 font-bold">
                      {numberFormat(item.price * item.count)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <div className="flex justify-between font-bold text-sm">
                <p>Shipment</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between font-bold text-sm">
                <p>Discount</p>
                <p>0.00</p>
              </div>
            </div>

            <hr className="text-gray-300" />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">Total</p>
                <p className="text-red-400 font-bold text-lg">
                  {numberFormat(cartTotal)}
                </p>
              </div>
            </div>

            <hr className="text-gray-300 p-1" />
            <div>
              {addressSave === false ? (
                <>
                  <button
                    onClick={() => {
                      toast.warning("please, put your address");
                    }}
                    className="bg-gray-400 p-2.5 w-full shadow-md rounded-md text-white hover:bg-gray-600"
                  >
                    Check Out
                  </button>
                  <p className="text-red-500 text-xs p-2">
                    Please put your address
                  </p>
                </>
              ) : (
                <button
                  onClick={() => navigate("/user/payment")}
                  className="bg-green-400 p-2 w-full shadow-md rounded-md text-white hover:bg-green-600"
                >
                  Pay
                </button>
              )}
              {/* disabled = {!addressSave} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;

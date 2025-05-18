import useEcomStore from "../store/ecom-store";
import { numberFormat } from "../utils/number";
import { dateFormat } from "../utils/dateFormat"; // Import dateFormat

const HistoryCard = () => {
  const order = useEcomStore((s) => s.order);



  // Sort orders by orderCreateTime in descending order (newest first)
  const sortedOrders = order && order.length > 0
    ? [...order].sort((a, b) => {
        return new Date(b.orderCreateTime) - new Date(a.orderCreateTime);
      })
    : [];


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">History</h1>

      {/* table */}
      <div 
        className={`space-y-4 ${
          sortedOrders.length > 3 ? "max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar" : ""
        }`}
      >
        {/* card loop order */}
        {sortedOrders.length > 0 ? (sortedOrders.map((item, index) => {
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200">
              {/* header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
                <div className="mb-3 sm:mb-0">
                  <p className="text-sm font-semibold text-gray-500">Order ID: <span className="text-gray-800">{item.orderID}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Date: {dateFormat(item.orderCreateTime)}</p>
                </div>
                <div className="text-xs text-center text-white bg-orange-500 w-fit px-3 py-1 rounded-full font-medium">
                  Status: Pending
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Shipping Address</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.shippingAddress || "N/A"}</p>
              </div>

              {/* table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-600">
                      <th className="p-2 font-semibold">No.</th>
                      <th className="p-2 font-semibold">Image</th>
                      <th className="p-2 font-semibold">Product</th>
                      <th className="p-2 font-semibold text-right">Price</th>
                      <th className="p-2 font-semibold text-center">Pcs.</th>
                      <th className="p-2 font-semibold text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {
                    item.product?.map((product, index) => {
                      return (
                        <tr key={index} className="text-gray-700">
                          <td className="p-2 text-center">{index + 1}</td>
                          <td className="p-2">
                            <div className="w-16 h-16 mx-auto sm:mx-0"> {/* Centered on small, left on larger */}
                              <img
                                src={
                                  product.images[0]
                                    ? product.images[0]
                                    : product.images[1]
                                }
                                alt={product.title}
                                className="w-full h-full object-contain rounded"
                              />
                            </div>
                          </td>
                          <td className="p-2">{product.title}</td>
                          <td className="p-2 text-right">${product.price}</td>
                          <td className="p-2 text-center">{product.count}</td>
                          <td className="p-2 text-right font-medium">${product.price * product.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Grand Total */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-end items-center">
                  <p className="text-md font-semibold text-gray-700 mr-2">Grand Total:</p>
                  <p className="text-lg font-bold text-orange-600">{numberFormat(item.totalPrice)}</p>
                </div>
              </div>
            </div>
          );
        })) : (
          <p className="text-center text-gray-500 py-4">No order history found.</p>
        )}
      </div>
    </div>
  );
};
export default HistoryCard;

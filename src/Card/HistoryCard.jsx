import useEcomStore from "../store/ecom-store";

const HistoryCard = () => {
  const order = useEcomStore((s) => s.order);


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">History</h1>

      {/* table */}
      <div className="space-y-4">
        {/* card loop order */}
        {order?.map((item, index) => {
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-2xl shadow-md">
              {/* header */}
              <div className="flex justify-between">
                <div className="py-4">
                  <p className="text-sm font-bold py-2">Order Date</p>
                  <p className="text-xs">{item.orderCreateTime}</p>
                  <p className="text-xs text-center text-white bg-orange-300 w-fit px-1.5 mt-2 rounded-2xl">
                    Status : Pending
                  </p>
                </div>
                <div className="font-bold text-sm ">
                  OrderID : {item.orderID}
                </div>
              </div>
              {/* table */}
              <div>
                <table className="w-full rounded-2xl">
                  <thead>
                    <tr className="bg-gray-300">
                      <th>No.</th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Pcs.</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                    item.product?.map((product, index) => {
                      return (
                        <tr key={index} className="text-center">
                          <td>{index + 1}</td>
                          <td className="flex justify-center">
                            <div className="w-20 h-18 p-4">
                              <img
                                src={
                                  product.images[0]
                                    ? product.images[0]
                                    : product.images[1]
                                }
                                alt={product.title}
                              />
                            </div>
                          </td>
                          <td>{product.title}</td>
                          <td>${product.price}</td>
                          <td>{product.count}</td>
                          <td>${product.price * product.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div>
                <div className="text-right font-bold px-4 py-4 text-red-400 shadow-xl rounded-sm">
                  <p>Total Price</p>
                  <p>${item.totalPrice}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HistoryCard;

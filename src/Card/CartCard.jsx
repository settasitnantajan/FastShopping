import { Trash2, Minus, Plus } from 'lucide-react';
import useEcomStore from '../store/ecom-store';
import { Link } from 'react-router-dom'

const CartCard = () => {
    const carts = useEcomStore((state)=> state.carts)
    const actionUpdateQuantity = useEcomStore((state)=>state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state)=>state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)

    return (
    <div>
      <h1 className="text-2xl font-bold p-2">ตระกร้าสินค้า</h1>
      {/* {Border} */}
      <div className="border-b-gray-400 p-2 rounded">
        {/* {Card} */}
            {
                carts.map((item, index)=>
                
                    <div key={index} className="mb-2
                    bg-white p-2 rounded-md shadow-xl">
          {/* {Row1} */}
          <div className="flex justify-between mb-2">
            {/* {Left} */}
            <div className="flex gap-2">
              {/* {img} */}
              <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">

                {
                  item.images
                  //&& item.images.length > 0
                  ? <div className='w-16 h-16 rounded-md shadow-md'>
                    <img
                    loading='lazy'
                    src={item.images[0]
                      ? item.images[0]
                      : item.images[1] || item.images[2]
                    }/>
                  </div> 
                  : <div className='w-16 h-16 bg-gray-200
                  rounded-md flex text-center items-center'>
                    No Image
                  </div>
                }

              </div>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs">{'In Stock : '+ item.stock}</p>
              </div>
            </div>

                {/* {Row2} */}
            <div 
            onClick={()=>actionRemoveProduct(item.id)}
            className='text-red-500 p-2 hover:text-red-700'>
                <Trash2/>
            </div>
          </div>

          {/* {Row2} */}
          <div className="flex justify-between">
            <div className="border-b-gray-200 rounded-sm px-2 py-1 flex items-center">
                <button 
                onClick={()=> actionUpdateQuantity(item.id, item.count - 1)}
                className="px-2 py-1 bg-gray-200 rounded-sm shadow-sm hover:bg-red-300">
                  <Minus size={16}/>
                </button>
                <span className="px-4">{item.count}</span>
                <button 
                onClick={()=> actionUpdateQuantity(item.id, item.count + 1)}
                className="px-2 py-1 bg-gray-200 rounded-sm shadow-sm hover:bg-gray-500">
                  <Plus size={16}/>
                </button>
            </div>
            <div className="text-sm">
                ${(item.price * item.count).toFixed(2)}
            </div>


          </div>
                 </div>
                )
            }
        {/* {Total} */}
        <div className='flex justify-between px-2 py-2 bg-white rounded shadow-2xl font-bold text-orange-400'>
            <span>Total</span>
            <span>${getTotalPrice()}</span>
        </div>
        {/* {Button} */}

        {
          carts.length < 1
          ? 
          <button 
          disabled
          className='mt-4 bg-gray-500 text-white w-full 
          py-2 rounded-md shadow-md hover:bg-gray-700'
          >Check out</button>

          : <Link to='/cart'>
          <button 
          className='mt-4 bg-green-500 text-white 
          w-full py-2 rounded-md shadow-md hover:bg-green-700'
          >Check out</button>
          </Link>
        }
        
      </div>
    </div>
  );
};
export default CartCard;

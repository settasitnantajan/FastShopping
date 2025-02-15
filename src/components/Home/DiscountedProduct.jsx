import { useState,useEffect } from "react"
import { listProductByNewProduct } from "../../api/Product"
import Card from "../../Card/ProductCard"
import SwiperShow from "../../utils/SwiperShow"
import { SwiperSlide } from "swiper/react"
import DetailsModalCardHome from "./DetailsModalCardHome"

const DiscountedProduct = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = () => {
        listProductByNewProduct()
        .then((res)=>setData(res.data.products))
        .catch((err)=>console.log(err)
        )
    }

    

  return (
    <SwiperShow>

        {
            data?.map((item, index)=>(
                <SwiperSlide key={index}>
                    <DetailsModalCardHome item={item}/>
                </SwiperSlide>
            ))
        }

    </SwiperShow>
  )
}
export default DiscountedProduct
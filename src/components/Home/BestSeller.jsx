import { useState,useEffect } from "react"
import { listProductByBestSeller } from "../../api/Product"
import Card from "../../Card/ProductCard"
import { SwiperSlide } from "swiper/react"
import SwiperShow from "../../utils/SwiperShow"
import DetailsModalCardHome from "./DetailsModalCardHome"

const BestSeller = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = () => {
        listProductByBestSeller()
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
           ) )
        }
    </SwiperShow>
    

  )
}
export default BestSeller
import { Swiper, SwiperSlide } from "swiper/react";
import largeBanner1 from "../../../public/pic/largeBanner/largeBanner1.png"
import largeBanner2 from "../../../public/pic/largeBanner/largeBanner2.png"
import largeBanner3 from "../../../public/pic/largeBanner/largeBanner3.png"
import largeBanner4 from "../../../public/pic/largeBanner/largeBanner4.png"
import smallBanner1 from '../../../public/pic/smallBanner/smallBanner1.png'
import smallBanner2 from '../../../public/pic/smallBanner/smallBanner2.png'
import smallBanner3 from '../../../public/pic/smallBanner/smallBanner3.jpeg'
import smallBanner4 from '../../../public/pic/smallBanner/smallBanner4.jpeg'
import smallBanner5 from '../../../public/pic/smallBanner/smallBanner5.jpg'
import smallBanner6 from '../../../public/pic/smallBanner/smallBanner6.jpg'
import smallBanner7 from '../../../public/pic/smallBanner/smallBanner7.jpg'
import smallBanner8 from '../../../public/pic/smallBanner/smallBanner8.jpg'

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import axios from "axios";
// import { useState,useEffect } from "react";

const ContentCarouse = () => {

    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     hdlGetImage()
    // },[])

    // const hdlGetImage = async() => {
    //      axios.get('https://picsum.photos/v2/list?page=1&limit=15')
    //     .then((res)=>setData(res.data))
    //     .catch((err)=>console.log(err))
    // }

  return (
    <div>
      <Swiper 
      pagination={true} 
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="mySwiper object-cover rounded-md mb-2 md:h-108">

        {/* {
            data?.map((item, index)=>
            
                <SwiperSlide>
                    <img src={item.download_url}/>
                </SwiperSlide>
            )
        } */}

            <SwiperSlide>
              <img src={largeBanner1} className="h-full w-full"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={largeBanner2} className="h-full w-full"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={largeBanner3} className="h-full w-full"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={largeBanner4} className="h-full w-full"/>
            </SwiperSlide>

      </Swiper>

      <Swiper 
      navigation={true}
      slidesPerView={5}
      spaceBetween={10}
      pagination={true} 
      modules={[Pagination, Autoplay,Navigation]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="mySwiper object-cover rounded-md">

        {/* {
            data?.map((item, index)=>
            
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={item.download_url}/>
                </SwiperSlide>
            )
        } */}

                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner1}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner2}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner3}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner5}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner6}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner7}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img 
                    className="rounded-md p-0.1"
                    src={smallBanner8}/>
                </SwiperSlide>

      </Swiper>
    </div>
  );
};
export default ContentCarouse;

import { useState, useEffect, Fragment } from "react"
import { listProductByBestSeller } from "../../api/Product"
// import Card from "../../Card/ProductCard"; // ไม่ได้ถูกใช้งานโดยตรง
import { SwiperSlide } from "swiper/react"
import SwiperShow from "../../utils/SwiperShow"
import DetailsModalCardHome from "./DetailsModalCardHome"
import ModalCard from "../../Card/ModalCard"
import useEcomStore from "../../store/ecom-store"

// Component สำหรับแสดง Skeleton UI ขณะโหลดข้อมูล (คัดลอกจาก DiscountedProduct.jsx)
const SkeletonCard = () => (
  <div 
    className="animate-pulse rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden" 
    style={{ height: '21rem' }} // กำหนดความสูงให้ใกล้เคียงกับ ProductCard จริง
  >
    <div className="w-full h-40 sm:h-48 bg-gray-300"></div> {/* Placeholder สำหรับรูปภาพ */}
    <div className="p-3 sm:p-4">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Placeholder สำหรับชื่อสินค้า */}
      <div className="h-3 bg-gray-300 rounded w-full mb-1"></div> {/* Placeholder สำหรับรายละเอียด */}
      <div className="h-3 bg-gray-300 rounded w-5/6 mb-3"></div> {/* Placeholder สำหรับรายละเอียด */}
      <div className="flex justify-between items-center mt-2">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div> {/* Placeholder สำหรับราคา */}
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div> {/* Placeholder สำหรับปุ่ม Cart */}
      </div>
    </div>
  </div>
);

const BestSeller = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const actionCreateModal = useEcomStore((state) => state.actionCreateModal);

    useEffect(()=>{
        loadData()
    },[])

    const loadData = () => {
        setLoading(true)
        setError(null)
        listProductByBestSeller()
        .then((res)=>{
            setData(res.data.products || [])
            setLoading(false)
        })
        .catch((err)=>{
            console.error("Error loading best seller products:", err)
            setError("ไม่สามารถโหลดข้อมูลสินค้าขายดีได้ กรุณาลองใหม่อีกครั้ง")
            setLoading(false)
        })
    }

    const handleProductClick = (item) => {
        actionCreateModal(item);
        setShowModal(true);
    };

    if (loading) {
        const skeletonCount = 4; // สามารถปรับจำนวนตามความเหมาะสม
        return (
            <SwiperShow>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                        <SkeletonCard />
                    </SwiperSlide>
                ))}
            </SwiperShow>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-center py-10 text-gray-500">ยังไม่มีสินค้าขายดีในขณะนี้</div>;
    }

  return (
    <Fragment>
        <SwiperShow>
            {
                data?.map((item, index)=>(
                   <SwiperSlide key={item.id || index}>
                       <div 
                            onClick={() => handleProductClick(item)} 
                            role="button" 
                            tabIndex="0" 
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProductClick(item); }}
                            className="cursor-pointer h-full"
                        >
                           <DetailsModalCardHome item={item}/>
                        </div>
                     </SwiperSlide>
               ) )
            }
        </SwiperShow>
        <ModalCard isVisible={showModal} onclose={() => setShowModal(false)} />
    </Fragment>
  )
}
export default BestSeller
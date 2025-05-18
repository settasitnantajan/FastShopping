import React from "react";
import ContentCarouse from "../components/Home/ContentCarouse";
import BestSeller from "../components/Home/BestSeller";
import DiscountedProduct from "../components/Home/DiscountedProduct";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen"> {/* พื้นหลังสีเทาอ่อนๆ */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"> {/* Container หลัก */}
        
        {/* Carousel Section */}
        <section className="mb-12 md:mb-16">
          <ContentCarouse />
        </section>

        {/* Best Seller Section */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              BEST SELLER PRODUCTS
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              สินค้าขายดีที่เราคัดสรรมาเพื่อคุณ
            </p>
          </div>
          <BestSeller />
        </section>

        {/* Discounted Products Section */}
        <section className="mb-8"> {/* ลด margin ด้านล่างสำหรับ section สุดท้าย */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              BEST DISCOUNTED PRODUCTS
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              สินค้าราคาพิเศษ ห้ามพลาด!
            </p>
          </div>
          <DiscountedProduct />
        </section>

      </div>
    </div>
  );
};

export default Home;

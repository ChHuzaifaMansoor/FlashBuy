import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const images = [
  "https://img.freepik.com/premium-vector/sale-banner-template-design-with-geometric-background-big-sale-special-offer-up-80-off-super-sale-end-season-special-offer-banner-vector-illustration_2307-605.jpg",
  "https://img.freepik.com/premium-vector/sale-banner-template-design-with-geometric-background-big-sale-special-offer-up-80-off-super-sale-end-season-special-offer-banner-vector-illustration_2307-653.jpg",
  "https://img.freepik.com/premium-vector/flash-sale-banner-template-design-social-media-website-special-offer-flash-sale-campaign_902944-915.jpg"
];

const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background 3D Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-500 via-transparent to-gray-800 opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 text-center md:text-left"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-yellow-400 drop-shadow-lg"
          >
            Elevate Your Shopping Experience
          </motion.h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Explore a seamless blend of <strong>physical and digital shopping</strong> with Flash Buy. Experience next-level convenience!
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-gray-900 font-semibold rounded-full py-3 px-8 shadow-md hover:shadow-lg hover:bg-yellow-400 transition-all duration-300"
            >
              Explore Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-800 text-yellow-200 font-semibold rounded-full py-3 px-8 shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Swiper Content */}
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full rounded-lg overflow-hidden"
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-lg shadow-xl"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  src={image}
                  alt={`Flash Buy Slide ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id: id },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScroll = (direction) => {
    containerRef.current.scrollLeft += direction * 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;
    return url;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-yellow-400">{name}</h3>
          <Link to={redirectURL} className="text-yellow-300 hover:text-yellow-500 transition duration-300">
            See All
          </Link>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-scroll scrollbar-none scroll-smooth"
          >
            {loading && loadingCardNumber.map((_, index) => <CardLoading key={index} />)}
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + index} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="hidden lg:flex justify-between absolute top-1/2 left-0 right-0 container mx-auto px-4 -translate-y-1/2">
            <button
              onClick={() => handleScroll(-1)}
              className="bg-gray-800 hover:bg-gray-700 shadow-lg p-3 rounded-full text-yellow-400"
            >
              <FaAngleLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll(1)}
              className="bg-gray-800 hover:bg-gray-700 shadow-lg p-3 rounded-full text-yellow-400"
            >
              <FaAngleRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;

import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import HeroSection from "../components/HeroSection";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Categories from "../components/Categories";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );

    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
        subcategory.name
      )}-${subcategory._id}`;
      navigate(url);
    }
  };

  return (
    <section className="bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Grid */}
      <Categories
        loadingCategory={loadingCategory}
        categoryData={categoryData}
        handleRedirectProductListpage={handleRedirectProductListpage}
      />

      {/* Display Category-wise Products */}
      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={c._id} id={c._id} name={c.name} />
      ))}
    </section>
  );
};

export default Home;

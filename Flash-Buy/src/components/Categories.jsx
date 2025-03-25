import React from "react";

const Categories = ({ loadingCategory, categoryData, handleRedirectProductListpage }) => {
  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-10 uppercase tracking-wide">
        Explore Categories
      </h2>
      
      {/* Scrollable wrapper for mobile */}
      <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 overflow-x-auto md:overflow-visible scrollbar-hide px-2 py-2">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-5 min-h-40 w-28 sm:w-32 flex-shrink-0 flex flex-col items-center justify-center shadow-lg animate-pulse"
              >
                <div className="bg-gray-700 w-20 h-20 rounded-full mb-3"></div>
                <div className="bg-gray-700 h-6 w-24 rounded"></div>
              </div>
            ))
          : categoryData.map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                className="bg-gray-900 rounded-xl p-5 w-28 sm:w-32 flex-shrink-0 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-110 hover:bg-gray-800"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-cover rounded-full border-4 border-yellow-500 mb-3 transition-all duration-300 hover:scale-105"
                />
                <h3 className="text-yellow-400 font-bold text-sm sm:text-lg text-center">
                  {cat.name}
                </h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categories;
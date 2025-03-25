import React from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';
import { motion } from 'framer-motion';
import { IoPricetagOutline } from 'react-icons/io5';

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
    return (
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link to={url} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center overflow-hidden border border-yellow-500">
                <div className="w-full h-48 bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <img src={data.image[0]} alt={data.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-yellow-400 truncate">{data.name}</h3>
                    <div className="flex justify-center items-center text-yellow-500 mt-2">
                        <IoPricetagOutline className="mr-2" size={18} />
                        <span className="text-sm">{data.unit}</span>
                    </div>
                    {data.discount > 0 && (
                        <span className="text-xs text-green-500 bg-green-900 px-2 py-1 rounded-full block mx-auto mt-2">
                            {data.discount}% Off
                        </span>
                    )}
                    <p className="text-yellow-300 text-lg font-bold mt-2">
                        {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                    </p>
                    <div className="flex justify-center mt-4">
                        {data.stock === 0 ? <p className="text-red-500 text-sm">Out of Stock</p> : <AddToCartButton data={data} />}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CardProduct;

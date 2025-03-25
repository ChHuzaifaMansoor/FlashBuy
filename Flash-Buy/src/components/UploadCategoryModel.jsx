import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { motion } from 'framer-motion';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({ ...SummaryApi.addCategory, data });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setData((prev) => ({ ...prev, image: ImageResponse.data.url }));
    };

    return (
        <section className='fixed inset-0 p-4 bg-black bg-opacity-60 flex items-center justify-center'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-gray-900 max-w-4xl w-full p-6 rounded-lg shadow-lg text-white'
            >
                <div className='flex items-center justify-between border-b border-gray-700 pb-3'>
                    <h1 className='text-lg font-bold text-yellow-400'>Add Category</h1>
                    <button onClick={close} className='text-gray-400 hover:text-white'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='categoryName' className='text-gray-300'>Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-gray-800 p-2 border border-gray-700 focus:border-yellow-400 outline-none rounded text-white'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <p className='text-gray-300'>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className='border bg-gray-800 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {data.image ? (
                                    <img alt='category' src={data.image} className='w-full h-full object-contain rounded' />
                                ) : (
                                    <p className='text-sm text-gray-500'>No Image</p>
                                )}
                            </div>
                            <label htmlFor='uploadCategoryImage'>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded cursor-pointer border font-medium ${!data.name ? "bg-gray-600 cursor-not-allowed" : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900"}`}
                                >
                                    Upload Image
                                </motion.div>
                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!data.name || !data.image}
                        className={`py-2 font-semibold rounded ${data.name && data.image ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                    >
                        {loading ? "Adding..." : "Add Category"}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default UploadCategoryModel;

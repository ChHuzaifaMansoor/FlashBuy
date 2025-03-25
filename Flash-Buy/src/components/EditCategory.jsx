import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { motion } from 'framer-motion';

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
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
            const response = await Axios({ ...SummaryApi.updateCategory, data });
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
        setLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setLoading(false);
        setData((prev) => ({ ...prev, image: ImageResponse.data.url }));
    };

    return (
        <motion.section 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50'
        >
            <div className='bg-neutral-900 text-white max-w-lg w-full p-6 rounded-xl shadow-lg relative'>
                <button onClick={close} className='absolute top-4 right-4 text-gray-400 hover:text-white'>
                    <IoClose size={24} />
                </button>
                <h1 className='text-xl font-semibold mb-4'>Update Category</h1>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm text-gray-300'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='w-full p-2 bg-neutral-800 border border-gray-700 focus:border-yellow-400 outline-none rounded-md'
                        />
                    </div>
                    <div>
                        <label className='block text-sm text-gray-300'>Image</label>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-32 h-32 bg-neutral-800 border border-gray-700 flex items-center justify-center rounded-lg overflow-hidden'>
                                {data.image ? <img src={data.image} alt='category' className='w-full h-full object-cover' /> : <p className='text-gray-500'>No Image</p>}
                            </div>
                            <label htmlFor='uploadCategoryImage' className='cursor-pointer bg-yellow-500 text-black font-medium px-4 py-2 rounded-md hover:bg-yellow-400 transition'>
                                {loading ? "Uploading..." : "Upload Image"}
                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <button 
                        className={`w-full py-2 rounded-md font-semibold transition ${data.name && data.image ? "bg-yellow-500 hover:bg-yellow-400 text-black" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                        disabled={!data.name || !data.image}
                    >
                        Update Category
                    </button>
                </form>
            </div>
        </motion.section>
    );
};

export default EditCategory;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', mobile: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserData({ name: user.name, email: user.email, mobile: user.mobile });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await Axios({ ...SummaryApi.updateUserDetails, data: userData });
            if (data.success) {
                toast.success(data.message);
                const updatedUser = await fetchUserDetails();
                dispatch(setUserDetails(updatedUser.data));
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-gray-900 min-h-screen flex flex-col items-center text-white'>
            {/* Profile Avatar */}
            <div className='relative w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg flex items-center justify-center bg-gray-700'>
                {user.avatar ? <img alt={user.name} src={user.avatar} className='w-full h-full' /> : <FaRegUserCircle size={65} />}
            </div>
            <button onClick={() => setOpenAvatarEdit(true)} className='mt-3 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition'>Edit Avatar</button>
            {openAvatarEdit && <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />}

            {/* User Details Form */}
            <form className='w-full max-w-md mt-6 p-4 bg-neutral-800 rounded-lg shadow-md' onSubmit={handleSubmit}>
                {['name', 'email', 'mobile'].map((field, index) => (
                    <div key={index} className='mb-4'>
                        <label className='block text-yellow-400 mb-1 capitalize'>{field}</label>
                        <input type={field === 'email' ? 'email' : 'text'} name={field} value={userData[field]} onChange={handleChange} required
                            className='w-full p-2 bg-neutral-700 border border-yellow-500 text-white rounded focus:ring-2 focus:ring-yellow-400' />
                    </div>
                ))}
                <button type='submit' className='w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition'>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default Profile;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) close();
  };

  return (
    <div className="bg-[#111] text-yellow-400 rounded-lg shadow-lg p-4 w-64 border border-gray-700">
      <div className="font-semibold text-lg">My Account</div>
      <div className="text-sm flex items-center gap-2 mt-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{' '}
          <span className="text-red-500 text-medium">
            {user.role === 'ADMIN' ? '(Admin)' : ''}
          </span>
        </span>
        <Link onClick={handleClose} to={'/dashboard/profile'} className="hover:text-yellow-300">
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider className="border-gray-600 my-2" />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/category'}
            className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/subcategory'}
            className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/upload-product'}
            className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/product'}
            className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={'/dashboard/myorders'}
          className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to={'/dashboard/address'}
          className="px-2 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

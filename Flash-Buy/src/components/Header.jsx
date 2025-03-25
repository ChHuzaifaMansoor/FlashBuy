import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Search from "./Search";
import UserMenu from "./UserMenu";
import DisplayCartItem from "./DisplayCartItem";
import FlashBuyLogo from "../assets/logo.png";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItem = useSelector((state) => state.cartItem.cart);

  const handleUserClick = () => {
    if (!user?._id) {
      navigate("/login");
    }
    setIsUserMenuOpen((prev) => !prev);
  };

  // Extract first letter of the user's name (fallback: "?")
  const getUserInitial = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <header className="bg-gray-900 text-yellow-500 shadow-lg sticky top-0 z-50 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={FlashBuyLogo}
            alt="Flash Buy"
            className="h-12 md:h-16 cursor-pointer"
          />
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:block w-1/3">
          <Search />
        </div>

        {/* User & Cart Section */}
        <div className="flex items-center space-x-6">
          {/* User Profile */}
          {user?._id ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-yellow-400"
                onClick={handleUserClick}
              >
                {/* Show user image if uploaded, otherwise show initials */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black rounded-full text-lg font-semibold">
                    {getUserInitial(user?.name)}
                  </div>
                )}
                {isUserMenuOpen ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12  text-black rounded-md shadow-lg p-4 min-w-[150px]">
                  <UserMenu close={() => setIsUserMenuOpen(false)} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-lg hover:text-yellow-400"
            >
              Login
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition"
          >
            <BsCart4 size={22} />
            <span>{cartItem.length ? `${cartItem.length} Items` : ""}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {location.pathname !== "/search" && (
        <div className="container mx-auto px-4 mt-2 md:hidden">
          <Search />
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && <DisplayCartItem close={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;

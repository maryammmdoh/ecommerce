"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { WishContext } from "@/context/WishContext";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { numberOfCartItems } = useContext(CartContext);
  const { numberOfWishItems } = useContext(WishContext);
  const { data: session } = useSession();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/category", label: "Category" },
    { href: "/brands", label: "Brands" },
    // { href: "/allorders", label: "All Orders" },
    // { href: "/test", label: "Test" },
  ];

  return (
    <nav className="bg-purple-300 dark:bg-slate-800 shadow-md z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link
              href="/"
              className="font-bold text-xl sm:text-2xl text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition"
            >
              <span>Freshcard</span>{" "}
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden lg:flex space-x-4 items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Icons + Auth / Dropdown */}
          <div className="hidden lg:flex items-center space-x-4">
            {session && (
              <>
                <Link
                  href="/cart"
                  className="relative text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 text-sm font-medium"
                >
                  Cart
                  {numberOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-3 h-5 w-5  bg-white text-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {numberOfCartItems}
                    </span>
                  )}
                </Link>
                <Link
                  href="/wishlist"
                  className="relative text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 text-sm font-medium"
                >
                  Wishlist
                  <i className="fas fa-heart text-red-500 ml-1"></i>
                  {numberOfWishItems > 0 && (
                    <span className="absolute -top-2 -right-3 h-5 w-5 bg-white text-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {numberOfWishItems}
                    </span>
                  )}
                </Link>
                
              </>
            )}

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 dark:text-white dark:hover:text-gray-300 text-gray-800 hover:text-purple-600 text-sm font-medium focus:outline-none"
              >
                <i className="fas fa-user-circle text-xl"></i>
              </button>
              {isDropdownOpen && (

                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  
                  {session ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/allorders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                      >
                        All Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-purple-100"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                      >
                        Register
                      </Link>
                      
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 absolute top-3 right-12 rounded-md text-gray-800 hover:text-white hover:bg-purple-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-600 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <>
                <i className="fa-solid fa-bars text-xl"></i>
                </>
              ) : (
                <i className="fa-solid fa-xmark text-xl"></i>
              )}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isMenuOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 bg-purple-200 space-y-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="block text-gray-800 hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium transition"
            >
              {label}
            </Link>
          ))}

          {session && (
            <>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="block relative text-gray-800 hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium transition"
              >
                Cart
                {numberOfCartItems > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 w-5 bg-white text-purple-500 rounded-full text-xs font-bold">
                    {numberOfCartItems}
                  </span>
                )}
              </Link>
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="block relative text-gray-800 hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium transition"
              >
                Wishlist
                <i className="fas fa-heart text-red-500 ml-1"></i>
                {numberOfWishItems > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 w-5 bg-white text-purple-500 rounded-full text-xs font-bold">
                    {numberOfWishItems}
                  </span>
                )}
              </Link>
            </>
          )}

          <div className="border-t border-purple-300 pt-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => { closeMenu(); setIsDropdownOpen(false); }}
                  className="block text-gray-800 hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium transition"
                >
                  Profile
                </Link>
                <Link
                  href="/allorders"
                  onClick={() => { closeMenu(); setIsDropdownOpen(false); }}
                  className="block text-gray-800 hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium transition"
                >
                  All Orders
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="w-full bg-purple-500 text-white hover:bg-purple-600 px-3 py-2 rounded-md text-base text-center transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block bg-white text-purple-400 hover:bg-gray-100 px-3 py-2 rounded-md text-base text-center transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="block bg-purple-500 text-white hover:bg-purple-600 px-3 py-2 rounded-md text-base text-center transition"
                >
                  Register
                </Link>
               
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-3.5 right-3">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

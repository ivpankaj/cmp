"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { usePathname } from "next/navigation";

import { dropdownItems, menuItems } from "@/data/navbar";

type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const UserProfile: React.FC<{ session: Session }> = ({ session }) => (
  <div className="flex items-center space-x-2 px-4">
    <img
      src={session.user?.image || "/default-avatar.png"}
      alt={`${session.user?.name || "User"} Profile`}
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="hidden lg:block">
      <p className="text-white text-sm font-medium">{session.user?.name}</p>
      <p className="text-gray-400 text-xs truncate max-w-[150px]">
        {session.user?.email}
      </p>
    </div>
  </div>
);

const NavLink: React.FC<{ item: MenuItem; mobile?: boolean; onClick?: () => void }> = ({ 
  item, 
  mobile = false,
  onClick 
}) => {
  const Icon = item.icon;
  
  if (mobile) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-3 text-base font-medium transform transition-all duration-300 hover:translate-x-2 group"
      >
        <Icon className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <Link href={item.href} className="relative group">
      <div className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transform transition-all duration-300 hover:translate-y-[-4px]">
        <Icon className="h-4 w-4 transform transition-all duration-300" />
        <span>{item.label}</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
    </Link>
  );
};

const AuthButton: React.FC<{ onClick: () => void; session: Session | null }> = ({ onClick, session }) => (
  <button
    onClick={onClick}
    className="relative group overflow-hidden bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
  >
    <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r from-white/20 to-transparent" />
    <div className="relative flex items-center space-x-2">
      <User className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12" />
      <span>{session ? "Sign Out" : "Sign in with Google"}</span>
    </div>
  </button>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      signIn("google");
    }
  };

  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full transition-all duration-500 ease-in-out z-50 ${
          scrolled ? "bg-black/90 backdrop-blur-lg shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 group cursor-pointer ml-0 md:-ml-10">
  <h1 className="text-white text-2xl lg:text-3xl font-bold tracking-wide transition-transform duration-300 group-hover:scale-110 group-hover:text-gray-300">
    CookMyPapers
  </h1>
</div>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}

              {/* Desktop Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-300 hover:text-white px-4 py-2 text-sm font-medium group"
                >
                  <span className="relative z-10">More</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform transition-all duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg transform transition-all duration-300 origin-top">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl group"
                      >
                        {React.createElement(item.icon, {
                          className: "h-4 w-4 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125"
                        })}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Auth Button */}
              <div className="flex items-center space-x-2">
                {session && <UserProfile session={session} />}
                <AuthButton onClick={handleAuth} session={session} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-300 hover:rotate-180" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-black/95 backdrop-blur-lg rounded-b-xl shadow-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {session && <UserProfile session={session} />}
                {menuItems.map((item) => (
                  <NavLink key={item.id} item={item} mobile onClick={handleMobileMenuClose} />
                ))}
                {dropdownItems.map((item) => (
                  <NavLink key={item.id} item={item} mobile onClick={handleMobileMenuClose} />
                ))}
                <div className="px-4 py-2">
                  <AuthButton onClick={handleAuth} session={session} />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden under fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default React.memo(Navbar);
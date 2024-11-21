"use client"
import React, { useState, useRef } from "react";
import Profile from "../assets/Profile.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useClickAway } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

 
  useClickAway(ref, () => setOpen(false));

  
  const routes = [
    { title: "Dashboard", href: "/UserDashboard" },
    { title: "Stories", href: "/UserDashboard/StoryDisplay" },
    { title: "Preference", href: "/UserDashboard/UserPreference" },
  ];
 
  return (
    <div className=" py-2 lg:py-2 sticky top-0 z-50 bg-yellow-200 shadow-md">
      <div className="container flex justify-between items-center">
        {/* logo section */}
        <div>
        <Link href="/">
          <p className="text-3xl lg:text-4xl font-semibold font-pacifico text-slate-800">
            Story<span className="text-primary">App</span>
          </p>
        </Link>
        </div>
        {/* Menu section */}
        <div className="flex justify-center items-center gap-10 font-caveat">
          <ul className="gap-8 hidden sm:flex">
            <li className="hover:border-b-2 border-primary uppercase">
            <Link href="/UserDashboard">Dashboard</Link>
            </li>
            <li className="hover:border-b-2 border-primary uppercase">
            <Link href="/UserDashboard/StoryDisplay">Stories</Link>
            </li>
            <li className="hover:border-b-2 border-primary uppercase">
            <Link href="/UserDashboard/UserPreference">Preference</Link>
            </li>
          </ul>
          {/* login section */}
          <div className="flex gap-4 items-center">
          {isAuthenticated ? (
              <>
                <Image
                  src={Profile}
                  alt="Profile"
                  className="w-10 rounded-full"
                  width={40}
                  height={40}
                />
                <button
                  onClick={logout}
                  className="text-md text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/Login">
                <button className="text-md text-orange-500 hover:underline">
                  Login
                </button>
              </Link>
            )}
          
        {/* Mobile Menu */}
        <div ref={ref} className="sm:hidden ">
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 top-[3.5rem]  w-full p-5 bg-gradient-to-tr from-[#73d7e0] to-[#fcd34d] shadow-lg"
              >
                <ul className="grid gap-4">
                  {routes.map((route, idx) => (
                    <motion.li
                      key={route.title}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: idx * 0.1,
                      }}
                      className="p-4 bg-gradient-to-tr from-[#22c55e] to-[#fdc305] rounded-lg"
                    >
                      <Link
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className="text-white text-lg block text-center transition-all duration-200 hover:text-[#f97316] hover:scale-105 hover:shadow-md hover:shadow-[#fcd34d]"
                      >
                        {route.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
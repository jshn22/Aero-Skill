import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logoSmall.jpeg";

const Footer = () => {
  return (
    <footer
      className="
        w-full py-16 px-6
        bg-black text-white
        font-sans
      "
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* === COLUMN 1: Brand & Socials === */}
        <div className="flex flex-col gap-6">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="AeroSkill logo" className="h-10 md:h-12 lg:h-14 w-auto object-contain" />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Empowering learners with hands‑on projects, real mentorship, and
            career‑ready skills.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* === COLUMN 2: Quick Links === */}
        <div className="flex flex-col gap-6 md:pl-10">
          <h3 className="text-lg font-medium text-white">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-[#6DACE7] transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/utilities" className="hover:text-[#6DACE7] transition-colors">Utilities</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#6DACE7] transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="/path" className="hover:text-[#6DACE7] transition-colors">Learning Path</Link>
            </li>
          </ul>
        </div>

        {/* === COLUMN 3: Get Started === */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-medium text-white">
            Get Started
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ready to build your skills? Join our community of learners and start your journey today.
          </p>

          {/* Action Button */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6DACE7] text-white font-medium text-sm hover:bg-[#5b9bd4] transition-colors w-fit"
          >
            Contact Us
          </Link>
        </div>

      </div>

      {/* Copyright & attribution */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-xs text-gray-500">
        <p className="text-center md:text-left order-2 md:order-1">
          &copy; {new Date().getFullYear()} AeroSkill. All rights reserved.
        </p>
        <p className="text-center order-1 md:order-2">
          <a
            href="https://www.aerodip.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#6DACE7] transition-colors"
          >
            AeroSkills by AeroDip (www.aerodip.com)
          </a>
        </p>
        <div className="flex justify-center md:justify-end gap-6 order-3">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

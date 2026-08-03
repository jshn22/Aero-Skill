import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logoSmallLight.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "#", comingSoon: true },
  { name: "Partner", path: "#", comingSoon: true },
  { name: "Contact Us", path: "/contact" },
  { name: "Utilities", path: "#", comingSoon: true },
  { name: "Profile", path: "#", comingSoon: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 sm:px-6 py-4">
      <nav
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-[#0A0A0A]/85 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgba(2,8,23,0.08)]"
            : "bg-white/60 dark:bg-[#0A0A0A]/60 backdrop-blur-md border-slate-200/70 dark:border-white/5"
        }`}
      >
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between text-[#171710] dark:text-white">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="AeroSkill Logo" className="h-9 w-auto rounded-lg" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.comingSoon ? (
                  <span className="flex items-center px-4 py-2 rounded-xl text-sm font-bold tracking-wide text-slate-400 dark:text-slate-500 cursor-not-allowed">
                    {link.name}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black dark:bg-white text-white dark:text-black text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg">
                      Coming Soon
                    </span>
                  </span>
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all ${
                        isActive
                          ? "text-[#171710] dark:text-white bg-slate-100 dark:bg-white/10"
                          : "text-slate-600 dark:text-slate-300 hover:text-[#171710] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-auto max-w-7xl"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl p-5 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  link.comingSoon ? (
                    <div key={link.name} className="px-4 py-3 rounded-xl flex items-center justify-between text-slate-400 dark:text-slate-500 cursor-not-allowed">
                      <span className="text-sm font-bold tracking-wide">{link.name}</span>
                      <span className="text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded bg-slate-100 dark:bg-white/5">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      end={link.path === "/"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                          isActive
                            ? "bg-slate-100 dark:bg-white/10 text-[#171710] dark:text-white"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/5"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

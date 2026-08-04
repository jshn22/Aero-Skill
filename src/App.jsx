import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/Partner";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/partner" element={<Partner />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;

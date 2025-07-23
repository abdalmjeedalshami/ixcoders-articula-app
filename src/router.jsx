import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import HomePage from "./pages/home/Home";
import Register from "./pages/register/Register";
import NotFound from "./pages/not_found/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

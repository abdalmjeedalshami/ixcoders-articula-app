import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./theme/colors";
import "./styles/_variables.css";
import MyNavbar from "./components/layout/my_navbar/MyNavbar";
import Login from "./pages/login/Login";
import Articles from "./pages/articles/Articles";
import Account from "./pages/account/Account";
import MyArticles from "./pages/my_articles/MyArticles";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import HomePage from "./pages/home/Home";
import Register from "./pages/register/Register";
import NotFound from "./pages/not_found/NotFound";
import MyAppBar from "./components/layout/my_appBar/MyAppBar";
import logoIcon from "./assets/icons/GraduationCap.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import Jobs from "./pages/jobs/Jobs";
import Faqs from "./pages/faqs/faqs";
import { Helmet } from "react-helmet";
import BlogCreatePage from "./pages/create_blog/BlogCreatePage";

function App() {
  useEffect(() => {
    AOS.init({
      once: false,
    });
    AOS.refresh();
  }, []);

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("tokenUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("tokenUpdated", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Articula</title>
        <meta name="description" content="All articles you search for" />
        <meta name="keywords" content="Articula, Articles, Authors" />
        <link rel="icon" href={logoIcon} />
      </Helmet>

      <BrowserRouter>
        <MyNavbar />
        <MyAppBar logo={logoIcon} />
        <Routes>
          <Route path="/account" element={token ? <Account /> : <HomePage />} />

          <Route
            path="/my_articles"
            element={token ? <MyArticles /> : <HomePage />}
          />

          <Route path="/login" element={token ? <HomePage /> : <Login />} />

          <Route
            path="/register"
            element={token ? <HomePage /> : <Register />}
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/create_blog" element={<BlogCreatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

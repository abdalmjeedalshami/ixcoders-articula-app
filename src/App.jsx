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
import DashboardPage from "./pages/dashboard/DashboardPage";
// import BlogDetails from "./pages/blog_details/BlogDetails";
import BlogPage from "./pages/BlogPage";
import TagPage from "./components/TagPage";
import CategoryArticles from "./pages/category_articles/CategoryArticles";

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
            element={token ? <MyArticles /> : <Login />}
          />

          <Route
            path="/articles"
            element={token ? <Articles /> : <Login />}
          />

          <Route
            path="/dashboard"
            element={token ? <DashboardPage /> : <Login />}
          />

          <Route path="/login" element={token ? <HomePage /> : <Login />} />

          <Route
            path="/register"
            element={token ? <HomePage /> : <Register />}
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/tag/:name" element={<TagPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/create_blog" element={<BlogCreatePage />} />
          <Route path="/category/:id" element={<CategoryArticles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

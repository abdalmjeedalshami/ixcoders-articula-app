import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import WelcomeSection from "../../components/sections/welcom_section/WelcomeSection";
import AuthorSection from "../../components/sections/author_section/AuthorSection";
import welcomeImage from "../../assets/images/welcome.jpg";
import cpuIcon from "../../assets/icons/cpu.svg";
import cameraIcon from "../../assets/icons/camera.svg";
import chartBarIcon from "../../assets/icons/chart_bar_horizontal.svg";
import handIcon from "../../assets/icons/handshake.svg";
import megaphoneIcon from "../../assets/icons/megaphone_simple.svg";
import receiptIcon from "../../assets/icons/receipt.svg";
import LatestArticlesSection from "../../components/sections/latest_articles_section/LatestArticlesSection";
import authorImage from "../../assets/images/author.png";
import TrustedSection from "../../components/sections/trusted_section/TrustedSection";
import MyFooter from "../../components/layout/my_footer/MyFooter";
import MySection from "../../components/sections/my_section/MySection";
import CategoryCard from "../../components/cards/category_card/CategoryCard";
import JobCard from "../../components/cards/job_card/JobCard";
import MySwiper from "@components/sliders/my_swiper/MySwiper";
import { Helmet } from "react-helmet";
import MySpinner from "../../components/common/mySpinner/MySpinner";
import articleImage from "../../assets/images/article_image.png";
import articleImage2 from "../../../public/images/articles_images/books.png";
import articleImage3 from "../../../public/images/articles_images/children.png";
import articleImage4 from "../../../public/images/articles_images/person_glasses.png";
import articleImage5 from "../../../public/images/articles_images/searching.png";
import articleImage6 from "../../../public/images/articles_images/sharing.png";
import articleImage7 from "../../../public/images/articles_images/sharing_2.png";
import articleImage8 from "../../../public/images/articles_images/sharing_3.png";
import articleImage9 from "../../../public/images/articles_images/teaching.png";
import articleImage10 from "../../../public/images/articles_images/writing.png";
import writer1 from "../../../public/images/persons/person.jpg";
import writer2 from "../../../public/images/persons/person_2.jpg";
import writer3 from "../../../public/images/persons/person_3.jpg";
import writer4 from "../../../public/images/persons/person_4.jpg";
import writer5 from "../../../public/images/persons/person_5.jpg";
import companyLogo from "../../assets/icons/AMG.CO.svg";
import companyLogo1 from "../../../public/icons/companies/CompanyLogo(1).svg";
import companyLogo2 from "../../../public/icons/companies/CompanyLogo(2).svg";
import companyLogo3 from "../../../public/icons/companies/CompanyLogo(3).svg";
import companyLogo4 from "../../../public/icons/companies/CompanyLogo(4).svg";
import companyLogo5 from "../../../public/icons/companies/CompanyLogo(5).svg";
import companyLogo6 from "../../../public/icons/companies/CompanyLogo(6).svg";
import companyLogo7 from "../../../public/icons/companies/CompanyLogo(7).svg";
import { useTranslation } from "react-i18next";

const categoryImages = [
  {
    id: 1,
    name: "Technology",
    articleCount: 63476,
    image: cpuIcon,
    color: "#EBEBFF",
  },
  {
    id: 2,
    name: "Technology",
    articleCount: 63476,
    image: handIcon,
    color: "#E1F7E3",
  },
  {
    id: 3,
    name: "Technology",
    articleCount: 63476,
    image: receiptIcon,
    color: "#FFF2E5",
  },
  {
    id: 4,
    name: "Technology",
    articleCount: 63476,
    image: chartBarIcon,
    color: "#FFF0F0",
  },
  {
    id: 5,
    name: "Technology",
    articleCount: 63476,
    image: cameraIcon,
    color: "#F5F7FA",
  },
  {
    id: 6,
    name: "Technology",
    articleCount: 63476,
    image: cpuIcon,
    color: "#F5F7FA",
  },
  {
    id: 7,
    name: "Technology",
    articleCount: 63476,
    image: megaphoneIcon,
    color: "#EBEBFF",
  },
  {
    id: 8,
    name: "Technology",
    articleCount: 63476,
    image: cameraIcon,
    color: "#F5F7FA",
  },
];

const writers = [
  {
    id: 1,
    image: writer1,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 2,
    image: writer2,
    name: "Darrell Steward",
    position: "UI/UX Designer",
    rating: 4.9,
    articlesNum: 17,
  },
  {
    id: 3,
    image: writer3,
    name: "Jane Cooper",
    position: "Managment",
    rating: 4.8,
    articlesNum: 5,
  },
  {
    id: 4,
    image: writer4,
    name: "Albert Flores",
    position: "Lead Developer",
    rating: 4.7,
    articlesNum: 13,
  },
  {
    id: 5,
    image: writer5,
    name: "Kathryn Murphy",
    position: "Digital Product",
    rating: 4.2,
    articlesNum: 41,
  },
  {
    id: 6,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 7,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 8,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
];

const companies = [
  {
    id: 1,
    image: companyLogo,
  },
  {
    id: 2,
    image: companyLogo1,
  },
  {
    id: 3,
    image: companyLogo2,
  },
  {
    id: 4,
    image: companyLogo3,
  },
  {
    id: 5,
    image: companyLogo4,
  },
  {
    id: 6,
    image: companyLogo5,
  },
  {
    id: 7,
    image: companyLogo6,
  },
  {
    id: 8,
    image: companyLogo7,
  },
];

const HomePage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch both APIs in parallel
        const [catRes, faqCatRes] = await Promise.all([
          fetch("https://tamkeen-dev.com/api/terms/category"),
          fetch("https://tamkeen-dev.com/api/terms/faq-category"),
        ]);

        if (!catRes.ok || !faqCatRes.ok) {
          throw new Error("Failed to fetch categories");
        }

        const [catData, faqCatData] = await Promise.all([
          catRes.json(),
          faqCatRes.json(),
        ]);

        // Merge both arrays
        const merged = [...catData, ...faqCatData].map((cat, index) => ({
          ...cat,
          articleCount: categoryImages[index].articleCount,
          color: categoryImages[index].color,
          image:
            categoryImages[index].image || "/images/categories/default.png",
        }));

        setCategories(merged);
      } catch (err) {
        setError(err.message || "Error loading categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const articles = [
    {
      id: 1,
      image: articleImage,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#993D20",
        background: "#FFEEE8",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 2,
      image: articleImage2,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#342F98",
        background: "#EBEBFF",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 3,
      image: articleImage3,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#15711F",
        background: "#E1F7E3",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 4,
      image: articleImage4,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#342F98",
        background: "#EBEBFF",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 5,
      image: articleImage5,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 6,
      image: articleImage6,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 7,
      image: articleImage7,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 8,
      image: articleImage8,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 9,
      image: articleImage9,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
    {
      id: 10,
      image: articleImage10,
      tag: {
        text: isArabic ? "تصميم" : "Design",
        color: "#882929",
        background: "#FFF0F0",
      },
      description: isArabic
        ? "دورة بايثون الكاملة لعام 2021 من الصفر إلى الاحتراف"
        : "2021 Complete Python Bootcamp From Zero to Hero",
      auth: "Mohammad Issa",
    },
  ];
  const jobs = [
    {
      id: 1,
      image: articleImage,
      tag: {
        text: isArabic ? "مميز" : "Featured",
        color: "#15711F",
        background: "#E1F7E3",
      },
      salary: "$300",
      title: isArabic ? "تحليل الأنظمة" : "System Analysis",
      description: isArabic ? "خبرة سنتين" : "2 Years of experience",
    },
    {
      id: 2,
      image: articleImage2,
      tag: {
        text: isArabic ? "مميز" : "Featured",
        color: "#993D20",
        background: "#FFEEE8",
      },
      salary: "$300-400",
      title: isArabic
        ? "مطوّر الواجهة الأمامية (React / Nextjs)"
        : "Frontend Developer (React / Nextjs)",
      description: isArabic ? "خبرة أكثر من 5 سنوات" : "+5 Years of experience",
    },
    {
      id: 3,
      image: articleImage3,
      tag: {
        text: isArabic ? "عاجل" : "Urgent",
        color: "#15711F",
        background: "#E1F7E3",
      },
      salary: "$300-500",
      title: isArabic
        ? "مصمم واجهات المستخدم وتجربة المستخدم"
        : "UI/UX Designer",
      description: isArabic ? "خبرة سنتين" : "2 Years of experience",
    },
    {
      id: 4,
      image: articleImage4,
      tag: {
        text: isArabic ? "مميز" : "Featured",
        color: "#15711F",
        background: "#E1F7E3",
      },
      salary: "$450",
      title: isArabic ? "مطوّر ASP للواجهة الخلفية" : "ASP Backend Developer",
      description: isArabic ? "خبرة أكثر من 3 سنوات" : "+3 Years of experience",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Home | Articula</title>
        <meta name="description" content="This is the home page of Articula" />
        <meta name="keywords" content="Learn, Articles" />
      </Helmet>

      <h1 className="d-none">
        {isArabic ? "تعلم مع الخبراء" : "Learn with expert"}
      </h1>
      <WelcomeSection
        title={
          isArabic
            ? "تعلم مع الخبراء في أي وقت ومن أي مكان"
            : "Learn with expert anytime anywhere"
        }
        subtitle={
          isArabic
            ? "مهمتنا هي مساعدة الناس في العثور على أفضل المصادر عبر الإنترنت والتعلم مع الخبراء في أي وقت ومن أي مكان."
            : "Our mission is to help people to find the best source online and learn with expert anytime, anywhere."
        }
        image={welcomeImage}
      />

      {loading && (
        <div className="mb-5">
          <MySpinner />
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <MySection
          header={{
            title: isArabic ? "تصفح أفضل التصنيفات" : "Browse Top Categories",
          }}
          body={
            <Row>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  categoryImages={categoryImages}
                />
              ))}
            </Row>
          }
          footer={{
            text: isArabic
              ? "لدينا المزيد من التصنيفات والفئات الفرعية."
              : "We have more category & subcategory.",
            tail: {
              text: isArabic ? "تصفح الكل" : "Browse All",
              route: "/jobs",
            },
          }}
        />
      )}

      <LatestArticlesSection articles={articles} />

      <MySection
        isCard="true"
        header={{
          title: isArabic ? "فرص العمل لدينا" : "Our Job Opportunities",
          subtitle: isArabic
            ? "فستيبولوم سيد دولور سيد ديام موليس ماكسيموس فيل نيك دولور. دونك فارياس بوروس إت إليفيند بورتا."
            : "Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec varius purus et eleifend porta.",
        }}
        body={
          <Row>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </Row>
        }
        footer={{
          text: isArabic
            ? "لدينا المزيد من فرص العمل."
            : "We have more job Opportunities.",
          tail: {
            text: isArabic ? "تصفح الكل" : "Browse All",
            route: "/jobs",
          },
        }}
      />

      <AuthorSection image={authorImage} />

      <MySection
        isCard="true"
        header={{
          title: isArabic ? "أفضل الكُتاب" : "Top Writers",
        }}
        body={<MySwiper list={writers} />}
        footer={{
          text: isArabic
            ? "آلاف المستخدمين ينتظرون المقالات. ابدأ بالكتابة والكسب الآن!"
            : "Thousands of users waiting for a Articles. Start writing & earning now!.",
          tail:  {
            text: isArabic ? "كن مؤلفاً" : "Become an Author"},
        }}
      />

      <TrustedSection
        title={isArabic ? "6.3k شركة موثوقة" : "6.3k trusted companies"}
        subtitle={
          isArabic
            ? "نولام إيجاستاس تيلوس آت إنيم أورناري تريستيك. كلاس أبتنت تاكيت سوسيوسكو آد ليتورا توركوينت بير كونوبيا نوسترا."
            : "Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
        }
        companies={companies}
      />

      <MyFooter />
    </>
  );
};

export default HomePage;

import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // ✅ import it

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = i18n.language;
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Button
    className="rounded-0"
      onClick={toggleLanguage}
      style={{
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "var(--primary-color)";
        e.target.style.borderColor = "transparent";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "white";
        e.target.style.borderColor = "transparent";
      }}
    >
      {i18n.language === "ar" ? "En" : "العربية"}
    </Button>
  );
}

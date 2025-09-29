import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TagProvider } from "./utils/TagContext";
import "./i18n.js";
import { UserProvider } from "./utils/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <UserProvider>
        <TagProvider>
          <App />
        </TagProvider>
      </UserProvider>
    </>
  </StrictMode>
);

import { createContext, useContext, useEffect, useState } from "react";

const TagContext = createContext();

export const useTags = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tamkeen-dev.com/api/terms/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data); // depends on API structure (array of tags)
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <TagContext.Provider value={{ tags, loading }}>
      {children}
    </TagContext.Provider>
  );
};

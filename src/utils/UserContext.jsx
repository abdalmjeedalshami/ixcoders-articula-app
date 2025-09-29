import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "./user";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser({ setUser, setLoading });

    // fetch("https://tamkeen-dev.com/api/terms/tags")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data); // depends on API structure (user)
    //     setLoading(false);
    //   })
    //   .catch(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

import { createContext, useState, useContext, useEffect } from "react";
import { fetchCurrentUser } from "../api"; // ✅ use shared API helper

const CatContext = createContext();

export const useCatContext = () => useContext(CatContext);

export const CatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cats, setCats] = useState([]);
  const [sessions, setSessions] = useState([]);

  // Restore user from token on initial load
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const data = await fetchCurrentUser();
        const restoredUser = {
          id: data.data.id,
          ...data.data.attributes,
        };
        setUser(restoredUser);
        console.log("🔁 Restored user from token:", restoredUser);
      } catch (err) {
        console.error("❌ Failed to restore user:", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) restoreUser();
  }, []);

  return (
    <CatContext.Provider value={{ user, setUser, cats, setCats, sessions, setSessions }}>
      {children}
    </CatContext.Provider>
  );
};

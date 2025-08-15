import { createContext, useState, useContext, useEffect } from "react";

const CatContext = createContext();

export const useCatContext = () => useContext(CatContext);

export const CatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cats, setCats] = useState([]);
  const [sessions, setSessions] = useState([]);

  // Restore user from token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not authorized");
          return res.json();
        })
        .then((data) => {
          const restoredUser = {
            id: data.data.id,
            ...data.data.attributes,
          };
          setUser(restoredUser);
          console.log("🔁 Restored user from token:", restoredUser);
        })
        .catch((err) => {
          console.error("❌ Failed to restore user:", err);
        });
    }
  }, []);

  return (
    <CatContext.Provider value={{ user, setUser, cats, setCats, sessions, setSessions }}>
      {children}
    </CatContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../api"; // ✅ using helper
import "../styles/home.css";

const Home = () => {
  const [user, setUser] = useState({});
  const [favoriteCat, setFavoriteCat] = useState(null);
  const [wisdom, setWisdom] = useState("");
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BACKEND_URL; // ✅ for image URL

  useEffect(() => {
    const fetchUserAndFavoriteCat = async () => {
      try {
        const userData = await get("/api/v1/users/me");
        const user = {
          id: userData.data.id,
          ...userData.data.attributes,
        };
        setUser(user);
        console.log("👤 Logged in user:", user);
  
        const catData = await get(`/api/v1/users/${user.id}/most_used_cat`);
        console.log("📦 Favorite cat response:", catData);
  
        const attr = catData.data?.attributes;
        if (attr) {
          setFavoriteCat({
            cat_name: attr.cat.name,
            img_url: attr.cat.img_url,
            times_used: attr.times_used,
          });
        } else {
          console.log("❌ No attributes found in favorite cat response");
        }
      } catch (err) {
        console.error("❌ Failed to load user info or favorite cat:", err);
      }
    };
  
    fetchUserAndFavoriteCat();
  }, []);
  
  return (
    <div className="home-container">
      <div className="welcome-box">
        <h2>Welcome back, {user?.name || "friend"}!</h2>
      </div>

      <div className="stats-grid">
        {favoriteCat ? (
          <>
            <p>
              🐾 Favorite Cat: <strong>{favoriteCat.cat_name}</strong> ({favoriteCat.times_used} sessions)
            </p>
            <img
              src={`${baseURL}${favoriteCat.img_url}`} // ✅ dynamic cat image
              alt="Favorite Cat"
              className="favorite-cat-img"
            />
          </>
        ) : (
          <p>🐾 You haven't chosen a favorite cat yet!</p>
        )}
      </div>

      <div className="home-footer">
        <button className="home-btn" onClick={() => navigate("/")}>
          Logout
        </button>
        <div className="quote-box">
          <p>"{wisdom || "Take a deep breath and let it go."}"</p>
        </div>
        <button className="home-btn" onClick={() => navigate("/dashboard")}>
          Choose a companion
        </button>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [wisdom, setWisdom] = useState("");
  const [favoriteCat, setFavoriteCat] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/v1/users/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        const user = {
          id: data.data.id,
          ...data.data.attributes,
        };
        setUser(user);
        console.log("👤 Logged in user:", user);
  
        return fetch(`http://localhost:3000/api/v1/users/${user.id}/most_used_cat`);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Favorite cat response:", data);
        const attr = data.data?.attributes;
        if (attr) {
          setFavoriteCat({
            cat_name: attr.cat.name,
            img_url: attr.cat.img_url,
            times_used: attr.times_used,
          });
        } else {
          console.log("❌ No attributes found in favorite cat response");
        }
      })
      .catch((err) => console.error("❌ Failed to load user info or favorite cat:", err));
  }, []);
  
  

  return (
    <div className="home-container">
      <div className="welcome-box">
      <h2>Welcome back, {user?.name || "friend"}!</h2>

      </div>

      <div className="stats-grid">
      {favoriteCat ? (
  <>
    <p>🐾 Favorite Cat: <strong>{favoriteCat.cat_name}</strong> ({favoriteCat.times_used} sessions)</p>
    <img
      src={`http://localhost:3000${favoriteCat.img_url}`}
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
          <p>"{wisdom|| "Take a deep breath and let it go."}"</p>
        </div>
        <button className="home-btn" onClick={() => navigate("/dashboard")}>
          Choose a companion
        </button>
      </div>
    </div>
  );
};

export default Home;

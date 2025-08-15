import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCats } from "../api"; // ✅ import helper
import "../styles/dashboard.css";

const Dashboard = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCats = async () => {
      try {
        const data = await fetchCats(); // this already returns parsed JSON
  
        setCats(
          data.data.map((cat) => ({
            id: cat.id,
            ...cat.attributes,
          }))
        );
      } catch (err) {
        console.error("Error loading cats:", err);
      }
    };
  
    loadCats();
  }, []);

  const handleSelect = (cat) => {
    setSelectedCat(cat);
  };

  const handleStartSession = () => {
    if (!selectedCat) return;
    navigate("/session", { state: { cat: selectedCat } });
  };

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Choose your meditation companion</h2>

      <div className="cat-grid">
        {cats.map((cat) => (
          <div
            key={cat.name}
            className={`cat-card ${selectedCat?.id === cat.id ? "selected" : ""}`}
            onClick={() => handleSelect(cat)}
          >
            <img
              src={`${baseURL}${cat.img_url}`} // ✅ dynamic baseURL
              alt={cat.name}
              className="cat-img"
            />
            <h3>{cat.name}</h3>
            <p>{cat.mood}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-footer">
        <button className="bio-btn" onClick={() => navigate("/meet-the-cats")}>
          The cats behind the names
        </button>
        <div className="nav-actions">
          <button className="nav-btn">Home</button>
          <button
            className="start-btn"
            onClick={handleStartSession}
            disabled={!selectedCat}
          >
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

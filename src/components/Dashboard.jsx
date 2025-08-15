import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
 
const Dashboard = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/cats", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cats");

        const data = await res.json();
        setCats(data.data.map(cat => ({
          id: cat.id,
          ...cat.attributes
        })));
      } catch (err) {
        console.error("Error loading cats:", err);
      }
    };

    fetchCats();
  }, []);

  const handleSelect = (cat) => {
    setSelectedCat(cat); // whole object, not just name
  };
  

  const handleStartSession = () => {
    if (!selectedCat) return;
    navigate("/session", { state: { cat: selectedCat } });
  };


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
              src={`http://localhost:3000${cat.img_url}`}
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

import { useNavigate } from "react-router-dom";
import "../styles/meetthecats.css";

import DuchessMarie from "../assets/DuchessMarie.png";
import Emmaline from "../assets/Emmaline.png";
import Kylo from "../assets/Kylo.png";
import MrKato from "../assets/MrKato.png";
import Stormy from "../assets/Stormy.png";
import Toulouse from "../assets/Toulouse.png";



const MeetTheCats = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="meet-cats-container">
      <h1>🐾 Meet the Cats Behind the Companions 🐾</h1>

      <div className="cat-bio">
        <img src={DuchessMarie} alt="Duchess Marie" className="cat-photo" />
        <h2>Duchess Marie</h2>
        <p>The royal chitchatter. Elegant, opinionated, and never afraid to tell you exactly what she thinks—with dramatic flair and many meows.</p>
      </div>

      <div className="cat-bio">
        <img src={Emmaline} alt="Emmaline" className="cat-photo" />
        <h2>Emmaline</h2>
        <p>The drama queen with the fluff of a cloud and the voice of a diva. Will serenade you at dinner time. Approves of exactly one human (you know who you are).</p>
      </div>

      <div className="cat-bio">
        <img src={Kylo} alt="Kylo" className="cat-photo" />
        <h2>Kylo</h2>
        <p>The chaotic little shadow. He’s stealthy, sneaky, and full of suspicious cuddles.</p>
      </div>

      <div className="cat-bio">
        <img src={MrKato} alt="Mr. Kato" className="cat-photo" />
        <h2>Mr. Kato</h2>
        <p>The distinguished gentleman. Carries himself with grace—and occasionally with zoomies.</p>
      </div>

      <div className="cat-bio">
        <img src={Stormy} alt="Stormy" className="cat-photo" />
        <h2>Stormy</h2>
        <p>The unexpected social butterfly— thrives on attention and is always ready to greet a guest (especially if they have pets to offer). Charming, chatty, and just a little bit nosy.</p>
      </div>

      <div className="cat-bio">
        <img src={Toulouse} alt="Toulouse" className="cat-photo" />
        <h2>Toulouse</h2>
        <p>The artist of the bunch—gentle, curious, and always watching. Likely to nap in a sunbeam or your laundry.</p>
      </div>

      <button className="back-btn" onClick={handleBack}>⬅ Back to Dashboard</button>
    </div>
  );
};

export default MeetTheCats;

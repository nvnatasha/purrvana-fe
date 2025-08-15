import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCatContext } from "../context/CatContext";
import { post } from "../api"; // ✅ use helper
import "../styles/session.css";

const Session = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCat = location.state?.cat;
  const { user } = useCatContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [seconds, setSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  const audioRef = useRef(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL; // ✅ dynamic base url

  useEffect(() => {
    let interval;
    if (timerActive && seconds > 0) {
      interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    }

    if (seconds === 0 && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTimerActive(false);
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  const startSession = () => {
    setIsPlaying(true);
    setTimerActive(true);
    if (soundOn && audioRef.current?.src) {
      audioRef.current.play().catch((err) => {
        console.error("❌ Audio play failed:", err);
      });
    }
  };

  const pauseSession = () => {
    setTimerActive(false);
    audioRef.current.pause();
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    soundOn ? audioRef.current.pause() : audioRef.current.play();
    setSoundOn(!soundOn);
  };

  const completeSession = async () => {
    if (!user || !selectedCat) {
      console.error("❌ Missing user or selectedCat!", { user, selectedCat });
      return;
    }

    setTimerActive(false);
    audioRef.current.pause();

    try {
      const res = await post("/api/v1/sessions", {
        
          user_id: user.id,
          cat_id: selectedCat.id,
          duration_seconds: 300 - seconds,
          started_at: new Date().toISOString(),
        },
      );

      if (!res.ok) throw new Error("Failed to log session");

      const data = await res.json();
      console.log("🎉 Session saved!", data);
    } catch (err) {
      console.error("❌ Could not save session:", err);
    }

    navigate("/home");
  };

  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!selectedCat) return <p>Loading your cat...</p>;

  return (
    <div className="session-container">
      <h2>Winding down with {selectedCat.name} 🐾</h2>

      <div className="cat-display">
        <div className="cat-frame">
          <img
            src={`${baseURL}${selectedCat.img_url}`} // ✅ dynamic img
            alt={selectedCat.name}
            className="session-cat-img"
          />
        </div>
        <p>{selectedCat.mood} • {selectedCat.purr_style}</p>
      </div>

      <div className="timer-box">
        <h3>{formatTime()}</h3>
        {!isPlaying && (
          <button onClick={startSession} className="session-btn">
            Start Session
          </button>
        )}
        {isPlaying && !timerActive && (
          <button onClick={startSession} className="session-btn">
            Resume
          </button>
        )}
      </div>

      <div className="session-controls">
        <button onClick={toggleSound} className="session-btn">
          {soundOn ? "Mute" : "Unmute"}
        </button>
        <button onClick={pauseSession} className="session-btn">Pause</button>
        <button onClick={completeSession} className="session-btn">Complete</button>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={`${baseURL}${selectedCat.purr_sound_url}`} // ✅ dynamic audio
        onError={(e) => console.error("❌ Audio failed to load:", e.target.src)}
      />
    </div>
  );
};

export default Session;


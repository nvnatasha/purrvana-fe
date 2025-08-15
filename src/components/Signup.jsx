import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCatContext } from "../context/CatContext";
import { post } from "../api"; // ← import helper
import "../styles/login.css";

const Signup = () => {
  const { setUser } = useCatContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await post("/api/v1/users", {
        user: {
          name,
          email,
          password,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create user");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(data.data.attributes);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <main className="landing-container">
      <header className="landing-header">
        <div className="title-section">
          <h1>Sign Up for Purrvana</h1>
          <p className="tagline">Find your inner purr</p>
        </div>
      </header>

      <section className="auth-buttons">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
};

export default Signup;

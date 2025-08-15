import { useState } from "react";
import { useCatContext } from "../context/CatContext";
import "../styles/login.css";
import catLogo from "../assets/PurrvanaLogo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useCatContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      
      
      localStorage.setItem("token", data.token); // ✅ This is fine
    

      setUser(data.user); // ❌ This was previously `data.data.attributes` — wrong shape
      navigate("/home"); // ✅ Or wherever you go post-login
      
      // TODO: redirect to dashboard or main view
    } catch (err) {
      setErrorMsg("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-panel">
      <main className="landing-container">
        <header className="landing-header">
          <div className="logo-box">
            <img src={catLogo} alt="Purrvana Logo" className="logo-img" />
          </div>
          <div className="title-section">
            <h1>Purrvana</h1>
            <p className="tagline">Find your inner purr</p>
          </div>
        </header>

        <section className="auth-buttons">
          <form className="login-form" onSubmit={handleSubmit}>
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
              Log In
            </button>
          </form>

          <div className="switch-auth">
            <p>
              Don’t have an account?{" "}
              <button className="link-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </p>
          </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;

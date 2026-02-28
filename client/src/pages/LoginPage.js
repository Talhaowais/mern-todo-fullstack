import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import {styles} from "./SignupPage";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("⚠ Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/auth/login", { email, password });
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError("")}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError("")}
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}


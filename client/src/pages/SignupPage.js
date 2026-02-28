import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("⚠ All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/auth/signup", { name, email, password });
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
        <h2 style={styles.title}>Signup</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setError("")}
            style={styles.input}
          />
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
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.linkText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export const styles = {
  page: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", fontFamily: "Segoe UI, sans-serif" },
  container: { width: "400px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(15px)", padding: "40px", borderRadius: "20px", boxShadow: "0 15px 40px rgba(0,0,0,0.4)", color: "#fff" },
  title: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "10px", border: "none", outline: "none" },
  submitBtn: { padding: "12px", borderRadius: "10px", border: "none", background: "#00c6ff", color: "#fff", cursor: "pointer" },
  error: { color: "#ff6b6b", fontSize: "13px", marginTop: "10px" },
  linkText: { marginTop: "15px", fontSize: "14px", textAlign: "center", opacity: 0.8 },
  link: { color: "#00c6ff", cursor: "pointer" },
};
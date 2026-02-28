import { Routes, Route, Navigate } from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>

  );
}

export default App;
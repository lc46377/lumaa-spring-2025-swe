import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./views/login";
import Register from "./views/register";
import TaskDashboard from "./views/taskdashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

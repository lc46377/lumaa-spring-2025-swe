import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import Register from "./views/register";
import Login from "./views/login";
import TaskDashboard from "./views/taskdashboard";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/tasks" element={<TaskDashboard />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostStartup from "./pages/PostStartup";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
      {/* Navbar */}
      <Nav />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Login route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* Post Startup */}
        <Route exact path="/post" element={<PostStartup />} />

        {/* Irrelevant Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

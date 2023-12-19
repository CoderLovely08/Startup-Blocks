import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StartupProvider } from "./context/StartupContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StartupProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StartupProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./App"; // Import the router configuration
import "./index.css"; // Assuming you have global CSS
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
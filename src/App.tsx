import React, { useState, useEffect } from "react";
import { NotFound } from "./pages/NotFound";
import "./App.css";
import "react-quill-new/dist/quill.snow.css";
import LoadingScreen from "@/components/LoadingScreen";

import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with real logic if needed)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <PublicRoutes />
      <AdminRoutes />
      {/* <Route path="*" element={<NotFound />} /  > */}

    </Router>
  );
}

export default App;

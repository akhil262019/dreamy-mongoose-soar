import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
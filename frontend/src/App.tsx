// src/App.tsx
import { useState } from "react";
import { LandingPage } from "./landingpage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import Info from "./info";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-figGray to-figBlue ">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

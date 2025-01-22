import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Hearder from "./components/Hearder";
import Market from "./components/Market";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Hearder />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

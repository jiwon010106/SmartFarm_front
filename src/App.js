import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/main/Home";
import Hearder from "./components/common/Header";
import Footer from "./components/common/Footer";
import Market from "./components/details/Market";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Hearder />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Downloads from "./pages/Downloads";
import Flashing from "./pages/Flashing";
import Tutorials from "./pages/Tutorials";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/flashing" element={<Flashing />} />
            <Route path="/tutorials" element={<Tutorials />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

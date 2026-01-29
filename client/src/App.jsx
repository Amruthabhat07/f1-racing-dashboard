import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/drivers/:driverNumber" element={<DriverProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



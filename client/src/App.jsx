import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";
import CompareDrivers from "./pages/CompareDrivers";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/drivers/:driverNumber" element={<DriverProfile />} />
        <Route path="/compare" element={<CompareDrivers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



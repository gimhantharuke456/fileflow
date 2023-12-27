import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashScreen from "./Components/SplashScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

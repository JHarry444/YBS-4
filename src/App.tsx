import Counter from "./components/Counter";
import ExternalData from "./components/ExternalData";
import NavBar from "./components/NavBar";
import Trainer from "./components/Trainer";
import { Route, BrowserRouter as Router, Routes } from "react-router";


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Hello, World!</h1>} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/trainer" element={<Trainer name={"JH"} age={32} specialism={"Java"} />} />
        <Route path="/external" element={<ExternalData />} />
      </Routes>
    </Router>
  );
}

export default App

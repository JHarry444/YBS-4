import Counter from "./components/Counter";
import ExternalData from "./components/ExternalData";
import FilteredTrainer from "./components/FilteredTrainer";
import RootLayout from "./components/RootLayout";
import SpecificTrainer from "./components/SpecificTrainer";
import Trainer from "./components/Trainer";
import type { LoaderFunctionArgs } from "react-router";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router";


function App() {


  async function loadTrainerData({ params }: LoaderFunctionArgs) {
    const response = await fetch(`http://localhost:8080/trainers/${params.id}`);
    const data = await response.json();
    return data;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1>Hello, World!</h1>} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/trainer" element={<Trainer id="abcd" name={"JH"} age={32} specialism={"Java"} />} />
        <Route path="/external" element={<ExternalData />} />
        <Route path="/specific-trainer/:id" element={<SpecificTrainer />} loader={loadTrainerData} />
        <Route path="/filtered-trainer" element={<FilteredTrainer />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>

    )
  );

  return (

    <RouterProvider router={router} />
  );
}

export default App

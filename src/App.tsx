import Counter from "./components/pages/Counter";
import ExternalData from "./components/pages/ExternalData";
import FilteredTrainer from "./components/pages/FilteredTrainer";
import Register from "./components/pages/Register";
import RootLayout from "./components/pages/RootLayout";
import SpecificTrainer from "./components/pages/SpecificTrainer";
import Admin from "./components/pages/Admin";
import Trainer from "./components/Trainer";
import type { LoaderFunctionArgs } from "react-router";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {


  async function loadTrainerData({ params }: LoaderFunctionArgs) {
    await new Promise(resolve => setTimeout(resolve, 5_000)); // Simulate a delay for demonstration purposes
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
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>

    )
  );

  return (

    <RouterProvider router={router} />
  );
}

export default App

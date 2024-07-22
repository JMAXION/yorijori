import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import NewTrip from "./pages/NewTrip";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/newtrip", element: <NewTrip /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

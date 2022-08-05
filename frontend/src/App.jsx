import "./App.css";
import NavbarComponent from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quotations from "./pages/Quotations";
import Companies from "./pages/Companies";
import QuotationAddProduct from "./pages/QuotationAddProduct";
import AddQuotationBids from "./pages/AddQuotationBids";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/quotations", element: <Quotations /> },
    { path: "/companies", element: <Companies /> },
    { path: "/quotation/add/product/:id", element: <QuotationAddProduct /> },
    {
      path: "/quotation/add/company/bid/:id",
      element: <AddQuotationBids />,
    },
  ];

  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

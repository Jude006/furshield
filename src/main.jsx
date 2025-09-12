import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ToTopButton from "./components/ui/ToTopButton.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <App />
        <ToTopButton />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react"; import { createRoot } from "react-dom/client"; import { BrowserRouter } from "react-router-dom";
import "@ecoportal/design/globals.css"; import "@ecoportal/design/animations.css"; import "./portal.css";
import { App } from "./App"; import { AuthProvider } from "./lib/auth";
createRoot(document.getElementById("root")!).render(<StrictMode><BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter></StrictMode>);

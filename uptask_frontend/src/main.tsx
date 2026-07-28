import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Router from "./router";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>,
);

/**
 * FIjate que la APP COMIENZA en ROUTER.. aca arranca todo y el distribuye como zidane todo el juego
 * Aca instalamos/instanciamos react-query== la herramienta para optimizar consultas a la DB?? tiene un provider para rodear a toda la app y que el codigo se propage a toda la app y un client que le pasamos como propr al provider-
 *
 *
 *
 */

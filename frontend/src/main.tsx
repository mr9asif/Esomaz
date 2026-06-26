import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { queryClient } from "./lib/react_query";
import { AuthProvider } from "./provider/AuthProvider";
import { SocketProvider } from "./socket/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
       <AuthProvider>
           <SocketProvider>
         <App />
             <Toaster position="top-right" />
             </SocketProvider>
       </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
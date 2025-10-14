import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
       <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-xl p-2 md:p-0 mx-auto">
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

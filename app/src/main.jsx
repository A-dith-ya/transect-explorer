import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import MapContextProvider from "./contexts/MapContext.jsx";
import { createMultipleTransects } from "./services/TransectService.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("Service Worker registration failed: ", err);
      }
    );
  });
}

window.addEventListener("online", () => {
  console.log("You are now online.");
  createMultipleTransects();
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MapContextProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MapContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

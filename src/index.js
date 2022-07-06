import React from "react";
import "./index.css";
import Index from "./routes/Index";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Index />
  </Provider>
);
reportWebVitals();

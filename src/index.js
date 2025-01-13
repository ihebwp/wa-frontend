import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {DarModeProvider} from "./contexte/index.jsx"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarModeProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </DarModeProvider>
  </React.StrictMode>
);
reportWebVitals();

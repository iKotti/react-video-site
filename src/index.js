import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { VideoProvider } from "./context";
import 'alertifyjs/build/css/alertify.min.css'

ReactDOM.render(
  <VideoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </VideoProvider>,

  document.getElementById("root")
);
reportWebVitals();

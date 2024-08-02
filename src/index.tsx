import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./normalize.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { appStore } from "./stores/app";
import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/error/error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
          <App />
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
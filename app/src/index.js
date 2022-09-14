import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Route from "./pages/Route";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./styles/global.css";
import LoadingContextProvider from "contexts/loadingContext";
import AxiosInterceptor from "lib/AxiosInterceptor";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <AxiosInterceptor />
        <Route />
      </LoadingContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

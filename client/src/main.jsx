import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../context/redux/store/configureStore.jsx";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

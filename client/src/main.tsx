import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./features/app/store";

import App from "./features/app/components/App";
import NotFound from "./features/app/components/NotFound";
import Auth from "./features/auth/pages/Auth";

import "./styles/index.css";
import "./styles/variables.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path="/sign-up" element={<Auth />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/quick-join" element={<Auth />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </Provider>
    </BrowserRouter>
);

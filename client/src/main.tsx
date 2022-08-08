import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./features/app/components/App";
import NotFound from "./features/app/components/NotFound";
import SignUp from "./features/auth/components/SignUp";
import { store } from "./features/app/store";

import "./styles/index.css";
import "./styles/normalize.css";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </Provider>
    </BrowserRouter>
);

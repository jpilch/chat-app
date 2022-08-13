import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./features/app/components/App";
import NotFound from "./features/app/components/NotFound";
import QuickChat from "./features/quick-chat/components/QuickChat";
import { store } from "./features/app/store";

import "./styles/index.css";
import "./styles/variables.css";
import Auth from "./features/auth/pages/Auth";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path="/sign-up" element={<Auth />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/quick-chat" element={<QuickChat />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </Provider>
    </BrowserRouter>
);

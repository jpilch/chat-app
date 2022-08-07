import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./pages/app/App";
import Chat from "./pages/chat/Chat";
import NotFound from "./pages/not-found/NotFound";
import SignInForm from "./features/auth/components/SignInForm";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route
                    index
                    element={<SignInForm />}
                />
                <Route path='/chat' element={<Chat />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

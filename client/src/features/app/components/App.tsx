import "./App.scss";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QUICKCHAT_URL } from "../../quick-chat/constants";
import { LOGIN_URL, QUICKJOIN_URL, SIGNUP_URL } from "../../auth/constants";

function App() {

    const navigate = useNavigate();

    useEffect(() => {
        if (![QUICKJOIN_URL, LOGIN_URL, SIGNUP_URL].includes(location.pathname)) {
            navigate(LOGIN_URL);
        }
    }, []);

    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

export default App;
import "./App.scss";

import { Outlet, } from "react-router-dom";
import Notification from "../../notification/components/Notification";

function App() {
    return (
        <div className="app">
            <Notification />
            <Outlet />
        </div>
    );
}

export default App;
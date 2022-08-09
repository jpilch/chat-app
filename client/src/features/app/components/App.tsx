import './App.scss'

import { Outlet } from "react-router-dom";
import { useLoginRequired } from "../../auth/hooks";

function App() {
    useLoginRequired();

    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

export default App;
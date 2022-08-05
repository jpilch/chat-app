import styles from "./App.module.css"
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <p>app</p>
            <Outlet />
        </div>
    )
}

export default App;
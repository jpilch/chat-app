import styles from "./App.module.css"

import { useSocket } from "../../hooks"

function App() {
    const socket = useSocket();

    return (
        <div className="app">
            <p>test</p>
        </div>
    )
}

export default App

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './pages/app/App';
import Chat from './pages/chat/Chat';
import NotFound from './common/pages/not-found/NotFound';
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/chat' element={<Chat />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)

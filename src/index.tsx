import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

root.render(
    <BrowserRouter basename="/">
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)

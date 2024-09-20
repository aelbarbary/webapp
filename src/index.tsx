import 'simplebar/src/simplebar.css'
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

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

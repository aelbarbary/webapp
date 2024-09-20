import Router from './routes'
import ThemeProvider from './theme/index'

export default function App() {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    )
}

import { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import palette from './palette'
import componentsOverride from './overrides'
import shadows, { customShadows } from './shadows'

interface ThemeProps {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProps) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography: {
                fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                h2: {
                    fontFamily: '"Lora", sans-sxerif',
                    fontStyle: 'italic',
                },
            },
            // shadows,
            customShadows,
        }),
        []
    )

    const theme = createTheme(themeOptions)
    theme.components = componentsOverride(theme)

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}

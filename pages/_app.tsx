import { CookieManager } from '@/components/CookieManager';
import '@/styles/global.css'
import 'leaflet/dist/leaflet.css';
import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9C426A'
    }
  }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CookieManager />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

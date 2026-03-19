import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { router } from './router'
import { Scripts } from './components/Scripts'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { ScrollToTop } from './components/ScrollToTop'
import { CookieConsent } from './components/CookieConsent'
import { LocaleProvider } from './contexts/LocaleContext'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'

function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Scripts />
        <GoogleAnalytics />
        <Routes>
          {router.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
      </LocaleProvider>
    </HelmetProvider>
  )
}

export default App

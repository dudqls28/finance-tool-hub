import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { router } from './router'
import { Scripts } from './components/Scripts'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { ScrollToTop } from './components/ScrollToTop'
import { CookieConsent } from './components/CookieConsent'
import { Privacy } from './pages/Privacy'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Scripts />
        <GoogleAnalytics />
        <Routes>
          {router.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App

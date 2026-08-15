import { Analytics } from "@vercel/analytics/react"
import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"

const Portfolio = lazy(() => import("./pages/Portfolio"))
const SegmentPage = lazy(() => import("./pages/SegmentPage"))
const CaseStudy = lazy(() => import("./pages/CaseStudy"))
const Diagnostico = lazy(() => import("./pages/Diagnostico"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Footer = lazy(() => import("./components/Footer"))
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat"))

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 z-0 bg-ink" aria-hidden="true" />
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="relative z-10" tabIndex={-1}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:caseSlug" element={<CaseStudy />} />
            <Route path="/diagnostico-visual" element={<Diagnostico />} />
            <Route path="/segmentos/:slug" element={<SegmentPage />} />
            <Route path="/:slug" element={<SegmentPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <div className="relative z-10">
          <Footer />
        </div>
        <WhatsAppFloat />
      </Suspense>
      <Analytics />
    </BrowserRouter>
  )
}

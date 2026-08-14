import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WhatsAppFloat from "./components/WhatsAppFloat"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import SegmentPage from "./pages/SegmentPage"
import CaseStudy from "./pages/CaseStudy"
import Diagnostico from "./pages/Diagnostico"
import NotFound from "./pages/NotFound"
import { SEGMENTS } from "./data/site"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:caseSlug" element={<CaseStudy />} />
          <Route path="/diagnostico-visual" element={<Diagnostico />} />
          {SEGMENTS.map((s) => (
            <Route
              key={s.slug}
              path={`/${s.slug}`}
              element={<SegmentPage segment={s} />}
            />
          ))}
          <Route path="/segmentos/:slug" element={<SegmentPage />} />
          <Route path="/:slug" element={<SegmentPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  )
}

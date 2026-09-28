import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Pricing } from '@/pages/pricing/Pricing';
import { Documentation } from '@/pages/documentation/Documentation';
import { ModuleDocumentation } from '@/pages/documentation/ModuleDocumentation';
import { HeroPreview } from '@/pages/HeroPreview';
import { PolicyPage } from '@/components/policy/PolicyPage';
import { policyRoutes } from '@/data/policyData';
import { About } from './pages/About';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/documentation/:slug" element={<ModuleDocumentation />} />
        <Route path="/hero-preview" element={<HeroPreview />} />
        {policyRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PolicyPage data={route.data} />}
          />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

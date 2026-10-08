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
import ProtectedRoute from './components/protected/ProtectedRoute';
import BlogForm from './pages/admin/BlogForm';
import BlogListAdmin from './pages/admin/BlogListAdmin';
import Login from './pages/admin/Login';
import BlogList from './pages/Blogs/BlogListing';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogDetails from './pages/Blogs/BlogDetails';

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

         {/* Blogs Section Routes */}
          {/* <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} /> */}

          {/* Blogs Section Routes */}
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />

          {/* Admin Routes */}
          <Route path="/wp-admin" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-blog"
            element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <BlogListAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-blog/:id"
            element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            }
          />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


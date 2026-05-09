/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { OrderFlow } from './pages/OrderFlow';
import { TrackOrder } from './pages/TrackOrder';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order/:productId" element={<OrderFlow />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="bg-stone-900 text-stone-400 py-12 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-gold font-serif text-2xl mb-4 italic">Lakshmi Fashion World</h2>
            <p className="text-sm mb-6">Exquisite Ethnic Wear for Every Celebration</p>
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors">Facebook</a>
              <a href="#" className="hover:text-gold transition-colors">WhatsApp</a>
            </div>
            <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Lakshmi Fashion World. All rights reserved.</p>
          </div>
        </footer>
        {/* Sticky Notification Bar */}
        <div className="sticky bottom-0 h-8 bg-gold flex items-center justify-center gap-4 px-10 text-[10px] uppercase font-sans font-bold text-maroon tracking-[0.1em] shrink-0 z-50 overflow-hidden whitespace-nowrap">
          <span>Free Shipping Across India on Orders Above ₹5,000</span>
          <span className="text-maroon/20">•</span>
          <span>No Login Required for Faster Checkout</span>
          <span className="text-maroon/20">•</span>
          <span>Carefully Curated for Your Style</span>
        </div>
      </div>
    </Router>
  );
}


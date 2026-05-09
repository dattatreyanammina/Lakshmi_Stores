import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Truck, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { useCart } from '../context/CartContext';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  return (
    <nav className="bg-maroon border-b-4 border-gold sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src="/trusty-logo.svg"
            alt="Trusty Collections logo"
            className="h-10 w-10 rounded-full border-2 border-gold object-cover shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
          />
          <div className="flex flex-col">
            <span className="text-gold font-serif text-xl font-bold tracking-widest leading-none transition-colors">
              Trusty
            </span>
            <span className="text-gold/80 text-[10px] uppercase tracking-[0.3em] font-medium leading-none mt-1">
              Collections
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-semibold text-white/90">
          <Link to="/" className="hover:text-gold transition-colors border-b border-gold">Home</Link>
          <button onClick={() => navigate('/?category=Saree#products')} className="hover:text-gold transition-colors">Sarees</button>
          <button onClick={() => navigate('/?category=Dress#products')} className="hover:text-gold transition-colors">Dresses</button>
          <Link to="/track" className="hover:text-gold transition-colors flex items-center gap-2">
            <Truck size={14} className="text-gold" />
            Track Order
          </Link>
        </div>

        <div className="flex items-center gap-5 text-gold">
          <Link to="/cart" className="relative hover:text-white transition-colors" aria-label="View cart">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-gold px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-maroon">
                {itemCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-white transition-colors"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <Link to="/track" className="md:hidden hover:text-white transition-colors">
            <Truck size={22} strokeWidth={1.5} />
          </Link>
          <Link to="/admin/login" className="hover:text-white transition-colors">
            <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-maroon border-b border-gold p-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="max-w-3xl mx-auto flex gap-4">
            <input 
              type="text" 
              placeholder="Search collections..." 
              className="flex-grow bg-[#900000] border border-[#a00000] text-[#fdfbf7] placeholder-[#d4af37b1] px-6 py-3 rounded-none text-sm font-medium focus:ring-1 focus:ring-gold outline-none"
              autoFocus
            />
            <button className="bg-gold text-maroon px-8 py-3 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

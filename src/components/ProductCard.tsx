import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Check } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] ring-1 ring-stone-200/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <img 
              src={product.images[0] || 'https://images.unsplash.com/photo-1583391733965-0da3c8d76378?q=80&w=2670&auto=format&fit=crop'} 
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,13,11,0.05)_0%,rgba(17,13,11,0.18)_45%,rgba(17,13,11,0.78)_100%)]" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-maroon shadow-[0_6px_18px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                {product.category}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-end justify-between gap-3 text-white">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold-light/90">Handpicked</p>
                  <h3 className="mt-1 truncate font-serif text-xl italic font-bold leading-tight md:text-[1.35rem]">
                    {product.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                  TC-{product.id.slice(0,4).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Price</p>
              <p className="mt-1 font-serif text-2xl text-maroon">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Tap to explore</p>
              <p className="mt-1 text-xs text-stone-500">View details</p>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex-grow inline-flex items-center justify-center gap-2 rounded-full border border-maroon/20 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-maroon shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-0.5 hover:border-maroon hover:bg-maroon hover:text-gold"
        >
          {inCart ? <Check size={14} strokeWidth={2.5} /> : <ShoppingBag size={14} strokeWidth={2.5} />}
          {inCart ? 'Added' : 'Add to Cart'}
        </button>
        <Link
          to={`/order/${product.id}`}
          className="flex-grow inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gold shadow-[0_14px_30px_rgba(128,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-stone-900"
        >
          Checkout
        </Link>
      </div>
    </motion.div>
  );
}

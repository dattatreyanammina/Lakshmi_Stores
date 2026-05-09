import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

import { Product } from '../types';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchParams] = useSearchParams();
  const bannerItems: Array<{ title: string; subtitle: string; image: string }> = [
    {
      title: 'Banarasi Sarees',
      subtitle: 'Rich silk, zari borders',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Festive Silks',
      subtitle: 'Wedding-ready drapes',
      image: 'https://images.unsplash.com/photo-1610030469570-5f1a2f8f9e1f?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Kalankari',
      subtitle: 'Modern style, classic weave',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Kanjivaram',
      subtitle: 'Temple-inspired silks',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Chiffon Sarees',
      subtitle: 'Lightweight, elegant drape',
      image: 'https://images.unsplash.com/photo-1610030469570-5f1a2f8f9e1f?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Tussar Silk',
      subtitle: 'Natural texture and sheen',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Georgette Sarees',
      subtitle: 'Soft flow for every occasion',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Cotton Sarees',
      subtitle: 'Breathable everyday comfort',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop',
    },
  ];
  const marqueeItems = [...bannerItems, ...bannerItems];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'Saree' || category === 'Dress' || category === 'All') {
      setFilter(category);
      return;
    }

    setFilter('All');
  }, [searchParams]);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter((product: Product) => product.category === filter);

  return (
    <div>
      {/* Live Wallpaper Section */}
      <section className="relative h-[62vh] overflow-hidden bg-stone-950 px-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607187663809-5b6f3c6c0f9b?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center opacity-60"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.24),transparent_40%),linear-gradient(180deg,rgba(17,13,11,0.1)_0%,rgba(17,13,11,0.42)_50%,rgba(17,13,11,0.78)_100%)]" />

        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[8%] top-[18%] h-36 w-36 rounded-full bg-gold/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[10%] top-[30%] h-44 w-44 rounded-full bg-maroon/20 blur-3xl"
        />

        <div className="relative z-10 flex h-full items-center justify-center px-4 py-6 md:py-8">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
            <div className="relative overflow-hidden px-4 py-4 md:px-8 md:py-6">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583391733965-0da3c8d76378?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-25"
              />
              <motion.div
                animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]"
              />

              <div className="relative z-10 flex items-center justify-center px-2 text-center">
                <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-gold/20 bg-black/35 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-6">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-black md:aspect-[21/9]">
                    <img
                      src={encodeURI('/WhatsApp Image 2026-05-09 at 2.44.00 PM.jpeg')}
                      alt="Trusty Collections brand artwork"
                      className="h-full w-full object-contain object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.55)_100%)]" />
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-3 px-2 pb-1 md:flex-row md:justify-between md:px-4">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold/85 font-bold">Sarees that celebrate you</p>
                    <a href="#products" className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-maroon transition-transform hover:-translate-y-0.5 hover:bg-gold-light md:px-6 md:text-sm">
                      Shop Collections
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Banner Section */}
      <section className="relative z-10 -mt-12 px-0 pb-8 md:-mt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: -40 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full"
        >
          <div className="mx-auto w-full max-w-none overflow-hidden border-y border-gold/15 bg-[linear-gradient(135deg,rgba(127,0,0,0.96)_0%,rgba(74,17,17,0.95)_38%,rgba(252,250,246,0.98)_100%)] shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <div className="relative overflow-hidden px-3 py-4 md:px-6 md:py-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#6d1010] to-transparent md:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#fcfaf6] to-transparent md:w-32" />

              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="flex w-max gap-4 md:gap-5"
              >
                {marqueeItems.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="group relative h-48 w-[18rem] overflow-hidden rounded-[1.6rem] border border-stone-200 bg-stone-950 shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:-translate-y-1 md:h-52 md:w-[22rem]"
                  >
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-end p-5 text-center md:p-6">
                      <h3 className="text-2xl font-semibold leading-tight text-white md:text-[1.85rem]">{item.title}</h3>
                      <p className="mt-2 max-w-[15rem] text-sm leading-6 text-stone-100/88 md:text-base">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div id="products" className="max-w-7xl mx-auto px-4 pt-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl text-maroon font-bold mb-2">Our Collection</h2>
            <p className="text-stone-500 max-w-md">Browse our curated selection of premium sarees and ethnic dresses for your special occasions.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/50 rounded-none p-1 border border-gold/30 backdrop-blur-sm">
              {['All', 'Saree', 'Dress'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all ${filter === cat ? 'bg-maroon text-gold shadow-lg' : 'text-stone-500 hover:text-maroon'}`}
                >
                  {cat}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-stone-200 mb-4 rounded-sm" />
                <div className="h-4 bg-stone-200 w-2/3 mb-2" />
                <div className="h-4 bg-stone-200 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} delay={idx * 0.1} />
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-stone-200 rounded-2xl">
            <Search className="mx-auto text-stone-200 mb-4" size={48} />
            <p className="text-stone-400 font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

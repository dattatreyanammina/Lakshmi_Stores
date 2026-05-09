import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Share2, Info, ArrowLeft, Truck, ShieldCheck, Heart, Check } from 'lucide-react';

import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-1/2 aspect-[4/5] bg-stone-200" />
      <div className="w-full md:w-1/2 space-y-4">
        <div className="h-4 bg-stone-200 w-1/4" />
        <div className="h-10 bg-stone-200 w-3/4" />
        <div className="h-6 bg-stone-200 w-1/4" />
        <div className="h-40 bg-stone-200 w-full" />
      </div>
    </div>
  );

  if (!product) return <div className="py-40 text-center">Product not found.</div>;

  return (
    <div className="bg-[#fdfbf7]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-[10px] uppercase tracking-widest text-stone-400 flex items-center gap-2">
        <Link to="/" className="hover:text-maroon transition-colors">Home</Link>
        <ChevronRight size={14} className="text-gold" />
        <span className="hover:text-maroon transition-colors leading-none">{product.category}</span>
        <ChevronRight size={14} className="text-gold" />
        <span className="text-stone-900 font-bold truncate max-w-[150px] leading-none">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col md:flex-row gap-16">
        {/* Images Implementation */}
        <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
            {product.images.map((img: string, i: number) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-20 md:w-24 aspect-[3/4] border transition-all ${activeImg === i ? 'border-maroon ring-1 ring-maroon shadow-lg' : 'border-gold/20 opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
          <div className="flex-grow aspect-[3/4] relative ethnic-border overflow-hidden rounded-none group bg-white shadow-sm">
            <motion.img 
              key={activeImg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={product.images[activeImg]} 
              className="w-full h-full object-cover"
              alt={product.title}
            />
            <div className="absolute top-4 left-4">
              <span className="bg-gold text-maroon text-[10px] font-bold px-3 py-1 shadow-lg uppercase tracking-widest">Premium Selection</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold border-b border-gold/50 pb-1">Authentic Collection</span>
            <div className="flex gap-4 text-stone-400">
              <button className="hover:text-maroon transition-colors"><Share2 size={20} strokeWidth={1.5} /></button>
              <button className="hover:text-red-500 transition-colors"><Heart size={20} strokeWidth={1.5} /></button>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl text-stone-900 font-bold mb-4 italic leading-tight font-serif">{product.title}</h1>
          
          <div className="flex items-center gap-6 mb-10 border-y border-stone-100 py-6">
            <div className="flex flex-col">
              <span className="text-stone-400 line-through text-xs mb-1">Was ₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
              <span className="text-4xl font-bold text-maroon font-serif leading-none">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-maroon text-gold text-[10px] font-bold px-3 py-2 shadow-sm uppercase tracking-tighter">
              Save 20%
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-white/50 p-6 border border-gold/10 backdrop-blur-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Info size={14} className="text-gold" />
                Craftsmanship & Care
              </h3>
              <p className="text-stone-600 font-sans leading-relaxed text-sm">
                {product.description || "Indulge in the luxury of traditional craftsmanship. This exquisite piece from Trusty Collections is designed to make you feel like royalty at every occasion."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 border border-gold/30 rounded-none flex items-center justify-center text-gold">
                  <Truck size={18} strokeWidth={1} />
                </div>
                <span>Secured Worldwide Delivery</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 border border-gold/30 rounded-none flex items-center justify-center text-gold">
                  <ShieldCheck size={18} strokeWidth={1} />
                </div>
                <span>Quality Inspection Hub</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="bg-white border border-maroon/15 text-maroon h-16 rounded-none font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-maroon hover:text-gold transition-all transform active:scale-95 shadow-lg relative overflow-hidden group"
                >
                  {isInCart(product.id) ? <Check size={20} strokeWidth={2.5} className="relative z-10" /> : <ShoppingBag size={20} strokeWidth={2.5} className="relative z-10" />}
                  <span className="relative z-10">{isInCart(product.id) ? 'Added' : 'Add to Cart'}</span>
                </button>
                <Link 
                  to={`/order/${product.id}`}
                  className="bg-stone-900 text-gold h-16 rounded-none font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-maroon transition-all transform active:scale-95 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <ShoppingBag size={20} strokeWidth={2.5} className="relative z-10" />
                  <span className="relative z-10">Checkout</span>
                </Link>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/919491741484?text=${encodeURIComponent(`Hi Trusty Collections, I'm interested in ${product.title} (Price: ₹${product.price}). Is it available?`)}`)}
                className="border border-stone-200 text-stone-600 h-16 rounded-none font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-stone-100 transition-all text-[11px]"
              >
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

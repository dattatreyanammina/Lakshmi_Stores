import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { useCart } from '../context/CartContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-maroon/5 text-maroon">
          <ShoppingBag size={32} />
        </div>
        <h1 className="text-3xl font-serif italic text-stone-900 mb-4">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Add pieces from the collection and come back here when you are ready to check out.</p>
        <Link to="/" className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-gold">
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-2">Shopping Cart</p>
          <h1 className="text-4xl font-serif italic text-stone-900">Trusty Collections Cart</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={clearCart} className="rounded-full border border-stone-200 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 hover:border-maroon hover:text-maroon transition-colors">
            Clear Cart
          </button>
          <Link to="/checkout" className="rounded-full bg-maroon px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-gold shadow-[0_14px_30px_rgba(128,0,0,0.2)]">
            Checkout Now
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.05)] md:flex-row md:items-center">
              <img src={item.images[0]} alt={item.title} className="h-28 w-full rounded-[1rem] object-cover md:h-24 md:w-20" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">{item.category}</p>
                <h2 className="mt-1 font-serif text-2xl italic text-stone-900">{item.title}</h2>
                <p className="mt-2 font-serif text-lg text-maroon">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-white hover:text-maroon">
                    <Minus size={14} />
                  </button>
                  <span className="min-w-10 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-white hover:text-maroon">
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-400 hover:border-maroon hover:text-maroon">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] h-fit sticky top-24">
          <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 font-bold">Order Summary</p>
          <div className="mt-6 space-y-4 border-y border-stone-200 py-6">
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>Items</span>
              <span className="font-semibold text-stone-900">{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-6 text-stone-500">Checkout will take you into the secure order flow with your saved cart items.</p>
          <div className="mt-6 space-y-3">
            <Link to="/checkout" className="flex items-center justify-center rounded-full bg-maroon px-5 py-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Proceed to Checkout
            </Link>
            <button onClick={() => navigate('/')} className="w-full rounded-full border border-stone-200 px-5 py-4 text-xs font-bold uppercase tracking-[0.24em] text-stone-600 hover:border-maroon hover:text-maroon transition-colors">
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
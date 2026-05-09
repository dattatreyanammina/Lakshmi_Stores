import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Check if user is in 'admins' collection
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          const isDevAdmin = user.email === 'dattatreya_nammina@srmap.edu.in';
          
          if (adminDoc.exists() || isDevAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            // Auto logout if not admin for security
            await auth.signOut();
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          await auth.signOut();
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mb-4"></div>
        </div>
        <p className="text-stone-600 font-medium">Verifying admin access...</p>
      </div>
    </div>
  );

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

const ROLE_HOME = {
  client: '/client',
  freelancer: '/freelancer',
  admin: '/admin',
};

export default function ProtectedRoute({ allowedRole }) {
  const { user, isChecking, checkAuth } = useAuthStore();

  console.log("PROTECTED ROUTE:", {
    user,
    isChecking,
  });

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, []);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return (
      <Navigate
        to={ROLE_HOME[user.role] ?? '/login'}
        replace
      />
    );
  }

  return <Outlet />;
}
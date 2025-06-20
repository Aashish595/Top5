// components/ErrorBoundary.tsx
'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
}) {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error caught by boundary:', error.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <>{children}</>;
}
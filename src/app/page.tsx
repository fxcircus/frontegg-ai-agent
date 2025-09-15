import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { AcmePortal } from '@/components/AcmePortal';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  // Only render the UI if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <AcmePortal isAuthenticated={isAuthenticated} />;
} 
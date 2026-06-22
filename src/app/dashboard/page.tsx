"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Dashboard page decommissioned per requirements.
 * Redirecting users to homepage.
 */
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}

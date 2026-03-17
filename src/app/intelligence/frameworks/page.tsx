"use client"

import { redirect } from 'next/navigation';

/**
 * Replaced by unified Operational Intelligence index.
 */
export default function LegacyFrameworksRedirect() {
  redirect('/intelligence');
  return null;
}

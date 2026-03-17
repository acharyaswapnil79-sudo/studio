"use client"

import { redirect, useParams } from 'next/navigation';

export default function LegacyInsightRedirect() {
  const params = useParams();
  redirect(`/intelligence/framework/${params.id}`);
  return null;
}

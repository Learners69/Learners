"use client";

import dynamic from 'next/dynamic';

const AnimatedHero = dynamic(() => import('./AnimatedHero').then(mod => mod.AnimatedHero), {
  ssr: false
});

export function ClientHero() {
  return <AnimatedHero />;
} 
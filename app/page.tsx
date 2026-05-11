'use client';

import React, { useState, useRef } from 'react';
import { HeroSection } from '@/components/hero-section';
import { LinkGenerator } from '@/components/link-generator';

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  const handleCreateClick = () => {
    setShowGenerator(true);
    // Scroll to generator after a brief delay to let the state update
    setTimeout(() => {
      generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen w-full overflow-hidden">
      {!showGenerator ? (
        <HeroSection onCreateClick={handleCreateClick} />
      ) : (
        <div ref={generatorRef} className="min-h-screen flex items-center justify-center px-4 py-16">
          <LinkGenerator onLinksGenerated={() => {}} />
        </div>
      )}
    </main>
  );
}

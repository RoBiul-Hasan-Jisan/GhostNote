'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HeroSection } from '@/components/hero-section';
import { LinkGenerator } from '@/components/link-generator';
import { useUserData } from '@/hooks/useUserData';

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);
  const { currentUserId } = useUserData();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (currentUserId) {
      window.location.href = '/dashboard';
    }
  }, [currentUserId]);

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
          <LinkGenerator onLinksGenerated={() => {
            // Auto-redirect to dashboard after link generation
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 2000);
          }} />
        </div>
      )}
    </main>
  );
}

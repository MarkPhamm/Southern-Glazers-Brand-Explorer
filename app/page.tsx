'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [envVar, setEnvVar] = useState<string | null>(null);
  return (
    <div>
      <p> Welcome to Southern Glazer </p>
    </div>
  );
}
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [envVar, setEnvVar] = useState<string | null>(null);

  useEffect(() => {
    // Check the value of the environment variable
    const testVar = process.env.NEXT_PUBLIC_SUPABASE_URL;
    setEnvVar(testVar || 'Variable not found');
  }, []);

  return (
    <div>
      <h1>Checking .env variable</h1>
      <p>{envVar ? `Env Variable: ${envVar}` : 'Env Variable is not loaded'}</p>
    </div>
  );
}
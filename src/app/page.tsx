'use client';
import { useState, FormEvent } from 'react';

export default function Home() {
  const [breed, setBreed] = useState<string>('Golden Retriever');
  const [scenario, setScenario] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleTranslate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAudioUrl(null);

    try {
      const res = await fetch('/api/generate-bark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ breed, scenario }),
      });

      if (!res.ok) throw new Error('Failed to synthesize sound.');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
        <img src="/icon.svg" alt="BarkTranslator" width="32" height="32" />
        <h1 style={{ fontSize: '24px', margin: 0 }}>BarkTranslator Pro</h1>
      </div>
      <p style={{ color: '#666', marginBottom: '30px' }}>Translate human scenarios into realistic dog bark audio using AI</p>

      <form onSubmit={handleTranslate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dog Breed / Size</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Scenario</label>
          <textarea
            placeholder="e.g., A mailman just stepped onto the front porch and the dog noticed."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {loading ? 'Synthesizing SFX...' : 'Generate Bark Audio \u{1F43E}'}
        </button>
      </form>

      {audioUrl && (
        <div style={{ marginTop: '30px', textAlign: 'center', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3>Generated Output:</h3>
          <audio src={audioUrl} controls autoPlay style={{ width: '100%' }} />
        </div>
      )}
    </main>
  );
}

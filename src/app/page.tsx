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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to synthesize sound.');
      }

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
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: '20px' }}>
            <img src="/icon.svg" alt="BarkTranslator" width="72" height="72" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))' }} />
          </div>
          <h1 className="gradient-text">BarkTranslator Pro</h1>
          <p className="subtitle">Translate human scenarios into realistic dog bark audio</p>
          <span className="badge">Powered by Gemini + ElevenLabs</span>
        </div>

        <div className="card">
          <form onSubmit={handleTranslate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="label">Dog Breed / Size</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="input-field"
                placeholder="e.g., Golden Retriever, Chihuahua..."
              />
            </div>

            <div>
              <label className="label">Scenario</label>
              <textarea
                placeholder="e.g., A mailman just stepped onto the front porch and the dog noticed..."
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                required
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <><span className="spinner" /> Synthesizing SFX...</>
              ) : (
                <>Generate Bark Audio 🐾</>
              )}
            </button>
          </form>
        </div>

        {audioUrl && (
          <div className="output-card" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>Generated Output</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Auto-playing your synthesized bark</p>
            <audio src={audioUrl} controls autoPlay />
          </div>
        )}

        <p className="footer">Built with Next.js · Google Gemini · ElevenLabs</p>
      </div>
    </main>
  );
}

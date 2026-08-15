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
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          min-height: 100vh;
          color: #fff;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .input-field {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #6366f1;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        .input-field::placeholder { color: rgba(255, 255, 255, 0.4); }
        .btn-primary {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .output-card {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          animation: glow 2s ease-in-out infinite;
        }
        audio { width: 100%; margin-top: 15px; border-radius: 10px; }
        .badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid rgba(99, 102, 241, 0.3);
          font-size: 12px;
          color: #a5b4fc;
          margin-bottom: 20px;
        }
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .label { display: block; marginBottom: 8px; fontWeight: 500; color: rgba(255,255,255,0.8); fontSize: 14px; }
      `}</style>

      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: '20px' }}>
              <img src="/icon.svg" alt="BarkTranslator" width="72" height="72" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))' }} />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              BarkTranslator Pro
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
              Translate human scenarios into realistic dog bark audio
            </p>
            <span className="badge">Powered by Gemini + ElevenLabs</span>
          </div>

          {/* Form Card */}
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

          {/* Output */}
          {audioUrl && (
            <div className="output-card" style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>Generated Output</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Auto-playing your synthesized bark</p>
              <audio src={audioUrl} controls autoPlay />
            </div>
          )}

          {/* Footer */}
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '40px' }}>
            Built with Next.js · Google Gemini · ElevenLabs
          </p>
        </div>
      </main>
    </>
  );
}

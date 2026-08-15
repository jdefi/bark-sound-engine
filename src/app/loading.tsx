export default function Loading() {
  return (
    <main style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ marginTop: '100px' }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0070f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
          <path d="M12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          <circle cx="6" cy="8" r="2.5"/>
          <circle cx="18" cy="8" r="2.5"/>
          <circle cx="3.5" cy="13" r="2"/>
          <circle cx="20.5" cy="13" r="2"/>
          <ellipse cx="12" cy="16" rx="5" ry="4"/>
        </svg>
        <p style={{ color: '#666', marginTop: '20px' }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

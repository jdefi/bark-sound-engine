export default function Loading() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ animation: 'float 2s ease-in-out infinite', marginBottom: '24px' }}>
          <img
            src="/icon.svg"
            alt="Loading"
            width="64"
            height="64"
            style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))' }}
          />
        </div>
        <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px', margin: '0 auto 16px' }} />
        <p className="subtitle">Loading...</p>
      </div>
    </main>
  );
}

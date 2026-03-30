export default function Ticker() {
  const items = [
    'Hand Shine',
    'Deep Conditioning',
    'Color Revival',
    'Full Restoration',
    'Welt Repair',
    'Sole Resoling',
    'Leather Stretching',
    'By Appointment Only',
    
  ]

  const separator = (
    <span
      style={{ color: 'var(--rose-dust)', margin: '0 1.5rem', fontSize: '0.4rem', verticalAlign: 'middle' }}
    >
      ●
    </span>
  )

  const content = items.map((item, i) => (
    <span key={i} style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
      {item}{separator}
    </span>
  ))

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '40px',
        background: 'var(--deep)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }}>
        {content}{content}{content}{content}
      </div>
    </div>
  )
}

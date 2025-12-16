export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Scan Lines */}
      <div className="absolute inset-0 opacity-50 animate-scan">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-rpg-blue/[0.03] to-transparent bg-repeat-y" 
             style={{ backgroundSize: '100% 4px' }} />
      </div>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-rpg-blue rounded-full shadow-glow-blue animate-float"
          style={{
            left: `${(i + 1) * 10}%`,
            animationDuration: `${12 + i * 2}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
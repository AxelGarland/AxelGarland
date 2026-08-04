export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[50] mix-blend-multiply opacity-[var(--noise-opacity)]"
    >
      <div className="animate-grain-shift absolute inset-[-120%] h-[240%] w-[240%] bg-[length:280px_280px] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22280%22%20height=%22280%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.75%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22280%22%20height=%22280%22%20fill=%22%23000000%22%20filter=%22url(%23n)%22%20opacity=%220.42%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

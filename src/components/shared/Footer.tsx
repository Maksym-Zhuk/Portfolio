export default function Footer() {
  return (
    <footer className="w-full border-t border-border px-3 sm:px-10 xl:px-20 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 bg-card">
      <span className="text-sm font-mono text-muted-foreground">
        © 2026 Maksym Zhuk. All rights reserved.
      </span>
      <span className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase">
        Backend Engineer · Rust · Systems
      </span>
    </footer>
  );
}

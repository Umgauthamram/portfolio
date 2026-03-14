export default function Footer() {
    return (
        <footer className="py-12 bg-[var(--color-surface)] border-t-[6px] border-[var(--color-border)] text-center mt-auto">
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-4xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] tracking-tighter">
                    GR<span className="text-[var(--color-primary)]">.</span>
                </div>

                <p className="text-[var(--color-text-primary)] font-bold text-lg md:-ml-8">
                    Designed & Built by <span className="text-white bg-[var(--color-primary)] border-[3px] border-[var(--color-border)] px-3 py-1 ml-2 rounded-[1rem] shadow-[3px_3px_0_var(--color-shadow)] -rotate-2 inline-block">Gautham Ram U M</span>
                </p>

                <p className="text-[var(--color-text-muted)] font-[var(--font-code)] font-bold tracking-widest uppercase">
                    © 2026
                </p>
            </div>
        </footer>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact({ personalInfo }) {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus({ type: "error", message: "Failed to send message. Please reach out directly." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Network error. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%"
                }
            }
        );
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-32 bg-[var(--color-surface)] border-t-[6px] border-[var(--color-border)]">
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="neo-card p-10 md:p-16 lg:p-24 bg-gradient-to-br from-[#FFB37A] via-[#FF7D81] to-[#A270FF] dark:from-[#f97316] dark:via-[#ec4899] dark:to-[#8b5cf6]">
                    <div className="flex flex-col lg:flex-row gap-20">

                        {/* Left Header */}
                        <div className="flex-1 w-full text-left">
                            <h2 className="text-6xl lg:text-8xl font-[var(--font-heading)] font-black mb-8 text-[var(--color-text-primary)] leading-[1.05]">
                                Ready to <br /> scale up.
                            </h2>
                            <p className="text-[var(--color-text-primary)] font-bold mb-12 leading-relaxed text-xl md:text-2xl max-w-xl pr-10 opacity-80">
                                Open for opportunities, freelance projects, or just a chat about decentralized systems and beautiful UI.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <InfoCard icon="📧" text="Email Me" href={`mailto:${personalInfo.email}`} />
                                <InfoCard icon="📱" text="Call Me" href={`tel:${personalInfo.phone}`} />
                                <InfoCard icon="🔗" text="LinkedIn" href={personalInfo.linkedin} />
                                <InfoCard icon="🐙" text="GitHub" href={personalInfo.github} />
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="flex-1 w-full">
                            <form className="neo-card p-10 bg-[var(--color-surface)] grid gap-8 h-full" onSubmit={handleSubmit}>
                                <h3 className="text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)]">Say Hello</h3>

                                {status.message && (
                                    <div className={`p-4 font-bold border-4 rounded-xl text-center shadow-[4px_4px_0_var(--color-shadow)] ${status.type === 'success' ? 'bg-green-100/10 border-green-500 text-green-500' : 'bg-red-100/10 border-red-500 text-red-500'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-[var(--color-text-primary)] uppercase tracking-widest">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--color-background)] border-4 border-[var(--color-border)] p-4 rounded-xl font-bold text-[var(--color-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] placeholder-[var(--color-text-muted)]"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-[var(--color-text-primary)] uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[var(--color-background)] border-4 border-[var(--color-border)] p-4 rounded-xl font-bold text-[var(--color-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] placeholder-[var(--color-text-muted)]"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-[var(--color-text-primary)] uppercase tracking-widest">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full h-[150px] bg-[var(--color-background)] border-4 border-[var(--color-border)] p-4 rounded-xl font-bold text-[var(--color-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] resize-none overflow-y-auto placeholder-[var(--color-text-muted)]"
                                        placeholder="Let's build something..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="neo-btn bg-[var(--color-primary)] text-white w-full text-xl py-5 hover:-translate-y-2 shadow-[8px_8px_0_var(--color-shadow)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Hit me up'}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

function InfoCard({ icon, text, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[var(--color-background)] border-4 border-[var(--color-border)] p-4 rounded-2xl shadow-[4px_4px_0_var(--color-shadow)] hover:shadow-[6px_6px_0_var(--color-shadow)] hover:-translate-y-1 hover:-translate-x-1 transition-all group font-bold font-[var(--font-code)] text-[var(--color-text-primary)]"
        >
            <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
            <span>{text}</span>
        </a>
    );
}

"use client";

import { useState, useEffect } from "react";

export default function Loader() {
    const [visible, setVisible] = useState(true);
    const [text, setText] = useState("");
    const fullText = "> Initializing portfolio...";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setVisible(false), 800);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-[var(--color-background)] flex items-center justify-center transition-opacity duration-500">
            <div className="font-[var(--font-code)] text-[var(--color-primary)] text-xl md:text-2xl animate-pulse">
                {text}
                <span className="w-3 h-5 bg-[var(--color-secondary)] inline-block ml-2 animate-bounce"></span>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function DeveloperCharacter({ className }) {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        // I am dynamically fetching an awesome Open-Source Lottie Hacker/Developer animation!
        // If you want to change it:
        // 1. Go to https://lottiefiles.com/search?q=developer
        // 2. Download the 'Lottie JSON' file
        // 3. Put it in your project's '/public' folder
        // 4. Change this fetch URL to '/your-downloaded-file.json'

        fetch("https://lottie.host/17e279f6-1dc3-4a16-bd89-0be098c47bb9/2mR1zVpxd6.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.log("Lottie load failed", err));
    }, []);

    return (
        <div className={`relative ${className} group`}>
            {/* Decorative glowing background blob to make the character pop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 blur-3xl rounded-full scale-125 transition-opacity duration-500 group-hover:opacity-30"></div>

            {/* The Lottie Container */}
            <div className="relative z-10 w-full h-full max-w-lg mx-auto drop-shadow-[8px_8px_0_var(--color-shadow)] transition-transform duration-500 group-hover:scale-105">
                {animationData ? (
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-full h-full"
                    />
                ) : (
                    <div className="w-full h-[400px] flex items-center justify-center bg-[var(--color-surface)] border-4 border-[var(--color-border)] rounded-[2rem] text-center font-[var(--font-code)] font-bold shadow-[8px_8px_0_var(--color-shadow)]">
                        <div className="animate-pulse flex flex-col items-center gap-4">
                            <span className="text-4xl text-[var(--color-primary)]">⚒</span>
                            <span>Loading Animation...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

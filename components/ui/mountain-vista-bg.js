"use client";

import React, { useMemo } from "react";

// Data Configuration
const layersData = [
    { className: "layer-6", speed: "120s", size: "222px", zIndex: 1, image: "6" },
    { className: "layer-5", speed: "95s",  size: "311px", zIndex: 1, image: "5" },
    { className: "layer-4", speed: "75s",  size: "468px", zIndex: 1, image: "4" },
    { className: "bike-1",  speed: "10s",  size: "75px",  zIndex: 2, image: "bike", animation: "parallax_bike", bottom: "10px", noRepeat: true },
    { className: "bike-2",  speed: "15s",  size: "75px",  zIndex: 2, image: "bike", animation: "parallax_bike", bottom: "15px", noRepeat: true },
    { className: "layer-3", speed: "55s",  size: "158px", zIndex: 3, image: "3" },
    { className: "layer-2", speed: "30s",  size: "145px", zIndex: 4, image: "2" },
    { className: "layer-1", speed: "20s",  size: "136px", zIndex: 5, image: "1" },
];

const MountainVistaParallax = ({ title = "", subtitle = "" }) => {
    // Generate dynamic CSS for each layer with grayscale and low brightness for a sleek dark theme aesthetic
    const dynamicStyles = useMemo(() => {
        const baseStyles = `
            .hero-container {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 0;
                pointer-events: none;
            }
            .parallax-layer {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-repeat: repeat-x;
                background-position: 0 100%;
                animation-name: parallax_fg;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                filter: grayscale(100%) brightness(0.2) contrast(1.1);
                transform: translateZ(0);
                will-change: background-position;
            }
        `;

        const layerStyles = layersData
            .map(layer => {
                const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650/${layer.image}.png`;
                return `
                    .${layer.className} {
                        background-image: url(${url});
                        animation-duration: ${layer.speed};
                        background-size: auto ${layer.size};
                        z-index: ${layer.zIndex};
                        ${layer.animation ? `animation-name: ${layer.animation};` : ""}
                        ${layer.bottom ? `bottom: ${layer.bottom};` : ""}
                        ${layer.noRepeat ? "background-repeat: no-repeat;" : ""}
                    }
                `;
            })
            .join("\n");

        return baseStyles + "\n" + layerStyles;
    }, []);

    return (
        <div className="hero-container" aria-label="Animated parallax mountains and cyclists.">
            <style>{dynamicStyles}</style>
            {layersData.map(layer => (
                <div key={layer.className} className={`parallax-layer ${layer.className}`} />
            ))}
            {(title || subtitle) && (
                <div className="hero-content" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem" }}>
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>
                </div>
            )}
        </div>
    );
};

export default React.memo(MountainVistaParallax);

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const trailPos = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        // Check if device is mobile/touch
        const checkMobile = () => {
            const mobile = window.matchMedia('(pointer: coarse)').matches ||
                'ontouchstart' in window ||
                window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Don't initialize cursor on mobile
        if (isMobile) return;

        // High-performance mouse tracking with RAF
        const updateMousePosition = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        // Smooth cursor animation loop using RAF
        const animateCursor = () => {
            if (!cursorRef.current || !trailRef.current) return;

            // Smooth lerp for cursor (faster for better tracking)
            const cursorLerp = 0.2;
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * cursorLerp;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * cursorLerp;

            // Smooth lerp for trail (slower)
            const trailLerp = 0.1;
            trailPos.current.x += (mousePos.current.x - trailPos.current.x) * trailLerp;
            trailPos.current.y += (mousePos.current.y - trailPos.current.y) * trailLerp;

            // Apply transforms using transform for better performance
            const scale = isClicking ? 0.85 : isHovering ? 1.2 : 1;
            const trailScale = isHovering ? 1.4 : 1;

            cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 32}px, ${cursorPos.current.y - 32}px, 0) scale(${scale})`;
            trailRef.current.style.transform = `translate3d(${trailPos.current.x - 28}px, ${trailPos.current.y - 28}px, 0) scale(${trailScale})`;

            rafId.current = requestAnimationFrame(animateCursor);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .interactive');
            setIsHovering(!!isInteractive);
        };

        // Add event listeners
        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        // Start animation loop
        rafId.current = requestAnimationFrame(animateCursor);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', checkMobile);

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [isMobile, isHovering, isClicking, isDark]);

    // Don't render on mobile
    if (isMobile) return null;

    // Theme-aware glow color
    const glowColor = isDark
        ? 'rgba(0, 212, 255, 0.6)'
        : 'rgba(0, 150, 200, 0.5)';

    return (
        <>
            {/* Cursor trail/glow */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
                style={{
                    width: '56px',
                    height: '56px',
                    opacity: isHovering ? 0.6 : 0.3,
                    transition: 'opacity 0.2s ease',
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                        filter: 'blur(16px)',
                    }}
                />
            </div>

            {/* Main cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
                style={{
                    width: '64px',
                    height: '64px',
                    transition: 'filter 0.2s ease',
                }}
            >
                <img
                    src="/cursor.png"
                    alt=""
                    className="w-full h-full select-none"
                    style={{
                        filter: isHovering
                            ? `brightness(1.3) drop-shadow(0 0 12px ${glowColor})`
                            : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))',
                        imageRendering: 'crisp-edges',
                    }}
                    draggable="false"
                />
            </div>
        </>
    );
};

export default CustomCursor;

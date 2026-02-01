import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '../context/ThemeContext';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic29zbzU5MyIsImEiOiJjbWwzY285M3AwanVqM2hvZXJsdnBscmxnIn0.eEE0TwkMIO7RlUQ02QyZ3g';

const MapLocationCard = () => {
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());
    const mapContainer = useRef(null);
    const map = useRef(null);

    // Philadelphia coordinates
    const PHILLY_LNG = -75.1652;
    const PHILLY_LAT = 39.9526;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (map.current) return; // Initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: theme === 'dark'
                ? 'mapbox://styles/mapbox/dark-v11'
                : 'mapbox://styles/mapbox/streets-v12',
            center: [PHILLY_LNG, PHILLY_LAT],
            zoom: 12,
            pitch: 45, // Add 3D tilt
            bearing: 0,
            interactive: true, // Enable all interactions
        });

        // Add navigation controls (zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add marker
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#00d4ff';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.5)';

        new mapboxgl.Marker(el)
            .setLngLat([PHILLY_LNG, PHILLY_LAT])
            .addTo(map.current);

        // Add circles around the marker
        map.current.on('load', () => {
            // Outer circle
            map.current.addSource('outer-circle', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [PHILLY_LNG, PHILLY_LAT]
                    }
                }
            });

            map.current.addLayer({
                id: 'outer-circle-layer',
                type: 'circle',
                source: 'outer-circle',
                paint: {
                    'circle-radius': {
                        stops: [
                            [0, 0],
                            [20, 200]
                        ],
                        base: 2
                    },
                    'circle-color': '#00d4ff',
                    'circle-opacity': 0.1,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#00d4ff',
                    'circle-stroke-opacity': 0.4
                }
            });

            // Inner circle
            map.current.addSource('inner-circle', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [PHILLY_LNG, PHILLY_LAT]
                    }
                }
            });

            map.current.addLayer({
                id: 'inner-circle-layer',
                type: 'circle',
                source: 'inner-circle',
                paint: {
                    'circle-radius': {
                        stops: [
                            [0, 0],
                            [20, 100]
                        ],
                        base: 2
                    },
                    'circle-color': '#00d4ff',
                    'circle-opacity': 0.15,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#00d4ff',
                    'circle-stroke-opacity': 0.6
                }
            });
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [theme]);

    // Update map style when theme changes
    useEffect(() => {
        if (map.current) {
            map.current.setStyle(
                theme === 'dark'
                    ? 'mapbox://styles/mapbox/dark-v11'
                    : 'mapbox://styles/mapbox/streets-v12'
            );
        }
    }, [theme]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York'
        });
    };

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
            {/* Mapbox Map */}
            <div
                ref={mapContainer}
                className="absolute inset-0 z-0"
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%' }}
            />

            {/* Overlay Card */}
            <div className="absolute top-4 left-4 right-4 z-10 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl p-4 border border-white/20 pointer-events-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-semibold text-lg">Philadelphia, PA</h3>
                        <p className="text-white/60 text-sm">{formatTime(currentTime)}</p>
                    </div>
                </div>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-4 right-4 z-10 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-lg px-3 py-2 border border-white/20 pointer-events-none">
                <p className="text-white/80 text-xs font-mono text-center">
                    {PHILLY_LAT.toFixed(4)}°N, {Math.abs(PHILLY_LNG).toFixed(4)}°W
                </p>
            </div>
        </div>
    );
};

export default MapLocationCard;

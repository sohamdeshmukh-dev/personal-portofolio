import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="8" fill="#00d4ff" stroke="white" stroke-width="3"/>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const MapLocationCard = () => {
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York'
        });
    };

    // Philadelphia coordinates
    const PHILLY_LNG = -75.1652;
    const PHILLY_LAT = 39.9526;

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
            {/* Leaflet Map */}
            <div className="absolute inset-0 z-0">
                <MapContainer
                    center={[PHILLY_LAT, PHILLY_LNG]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    dragging={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    touchZoom={false}
                    attributionControl={false}
                >
                    <TileLayer
                        url={theme === 'dark'
                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        }
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Circle
                        center={[PHILLY_LAT, PHILLY_LNG]}
                        radius={2000}
                        pathOptions={{
                            color: '#00d4ff',
                            fillColor: '#00d4ff',
                            fillOpacity: 0.1,
                            weight: 2,
                            opacity: 0.4
                        }}
                    />
                    <Circle
                        center={[PHILLY_LAT, PHILLY_LNG]}
                        radius={1000}
                        pathOptions={{
                            color: '#00d4ff',
                            fillColor: '#00d4ff',
                            fillOpacity: 0.15,
                            weight: 2,
                            opacity: 0.6
                        }}
                    />
                    <Marker position={[PHILLY_LAT, PHILLY_LNG]} icon={customIcon} />
                </MapContainer>

                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/30 pointer-events-none"></div>
            </div>

            {/* Overlay Card */}
            <div className="absolute top-4 left-4 right-4 z-10 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-sm text-white/80">Working</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">Philadelphia, PA</h3>
                        <p className="text-white/60 text-sm">{formatTime(currentTime)}</p>
                    </div>
                </div>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-4 right-4 z-10 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-lg px-3 py-2 border border-white/20">
                <p className="text-white/80 text-xs font-mono text-center">
                    {PHILLY_LAT.toFixed(4)}°N, {Math.abs(PHILLY_LNG).toFixed(4)}°W
                </p>
            </div>


        </div>
    );
};

export default MapLocationCard;

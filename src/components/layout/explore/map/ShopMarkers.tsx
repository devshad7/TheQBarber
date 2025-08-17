"use client";

import { useEffect } from "react";

interface Shop {
  id: string;
  name: string;
  coords: [number, number];
}

interface Props {
  mapReady: boolean;
  mapInstanceRef: React.MutableRefObject<any>;
  shopLocations: Shop[];
  setSelectedShop: (shop: Shop | null) => void;
  setDrawerOpen: (val: boolean) => void;
}

export default function ShopMarkers({
  mapReady,
  mapInstanceRef,
  shopLocations,
  setSelectedShop,
  setDrawerOpen,
}: Props) {
  useEffect(() => {
    const run = async () => {
      if (!mapReady || !mapInstanceRef.current) return;
      const L = (await import("leaflet")).default;

      const shopIcon = L.divIcon({
        className: "leaflet-pulse-marker",
        html: `<div style="color: #ef4444; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C9.03 2 5 6.03 5 11c0 5.25 7.13 13.13 7.43 13.44.31.32.83.32 1.14 0C15.87 24.13 23 16.25 23 11c0-4.97-4.03-9-9-9zm0 13.5A4.5 4.5 0 1 1 14 6.5a4.5 4.5 0 0 1 0 9z" fill="#ef4444"/>
            <circle cx="14" cy="11" r="3" fill="#fff"/>
          </svg>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      shopLocations.forEach((shop) => {
        const marker = L.marker(shop.coords, { icon: shopIcon }).addTo(
          mapInstanceRef.current
        );
        marker.on("click", () => {
          mapInstanceRef.current.flyTo(shop.coords, 16, { animate: true });
          setSelectedShop(shop);
          setDrawerOpen(true);
        });
      });
    };
    run();
  }, [mapReady, shopLocations, mapInstanceRef, setSelectedShop, setDrawerOpen]);

  return null;
}

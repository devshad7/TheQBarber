"use client";

import { useEffect } from "react";

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  mapInstanceRef: React.MutableRefObject<any>;
  setMapReady: (val: boolean) => void;
}

export default function MapInitializer({
  mapRef,
  mapInstanceRef,
  setMapReady,
}: Props) {
  useEffect(() => {
    let cancelled = false;
    if (typeof window === "undefined") return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current, { zoomControl: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      if (!cancelled) setMapReady(true);
    };

    init();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setMapReady(false);
    };
  }, [mapRef, mapInstanceRef, setMapReady]);

  return null;
}

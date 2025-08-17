"use client";

import { useEffect, useRef } from "react";

interface Props {
  mapReady: boolean;
  mapInstanceRef: React.MutableRefObject<any>;
  myLocation: [number, number] | null;
}

export default function MyLocationMarker({
  mapReady,
  mapInstanceRef,
  myLocation,
}: Props) {
  const hasCenteredRef = useRef(false);
  const myLocationMarkerRef = useRef<any>(null);

  useEffect(() => {
    const run = async () => {
      if (!mapReady || !mapInstanceRef.current || !myLocation) return;
      const [lat, lng] = myLocation;
      const L = (await import("leaflet")).default;

      if (myLocationMarkerRef.current) {
        mapInstanceRef.current.removeLayer(myLocationMarkerRef.current);
      }

      const mainIcon = L.divIcon({
        className: "custom-main-marker z-top-marker",
        html: `<div style="background-color: #758ef1; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      myLocationMarkerRef.current = L.marker([lat, lng], {
        icon: mainIcon,
      }).addTo(mapInstanceRef.current);

      if (!hasCenteredRef.current) {
        mapInstanceRef.current.setView([lat, lng], 16, { animate: true });
        hasCenteredRef.current = true;
      }
    };
    run();
  }, [mapReady, myLocation, mapInstanceRef]);

  return null;
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@radix-ui/react-separator";
import { useUser } from "@clerk/nextjs";
import useShopQueues from "@/hooks/useShopsQueueCounts";

interface LocationProps {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  shopData: Array<{
    id: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
  }>;
}

export default function LeafletMap({ location, shopData }: LocationProps) {

  const {user} = useUser();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const shopMarkersRef = useRef<any[]>([]);
  const hasCenteredRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);

  const shopIds = shopData.map((shop) => shop.id);
  const userId = user?.id;
  const { queues } = useShopQueues(shopIds, userId);

  const containerIdRef = useRef<string>(
    `leaflet-map-${Math.random().toString(36).slice(2, 10)}`
  );
  if (mapRef.current && mapRef.current.id !== containerIdRef.current) {
    mapRef.current.id = containerIdRef.current;
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<{
    id: string;
    name: string;
    coords: [number, number];
  } | null>(null);

  const myLocation: [number, number] | null =
    location.latitude !== null && location.longitude !== null
      ? [Number(location.latitude), Number(location.longitude)]
      : null;

  const shopLocations = useMemo(
    () =>
      shopData
        .filter(
          (s) =>
            s.latitude !== null &&
            s.longitude !== null &&
            !Number.isNaN(Number(s.latitude)) &&
            !Number.isNaN(Number(s.longitude))
        )
        .map((s) => ({
          id: s.id,
          name: s.name,
          coords: [Number(s.latitude), Number(s.longitude)] as [number, number],
        })),
    [shopData]
  );

  const destroyExistingMapOnElement = (el: HTMLElement) => {
    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      el.innerHTML = "";
      el.className = el.className.replace(/\bleaflet-container\b/g, "").trim();
    } catch {}
  };

  // Initialize map once
  useEffect(() => {
    let cancelled = false;
    if (typeof window === "undefined") return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      if (!mapRef.current.id) {
        mapRef.current.id = containerIdRef.current;
      }

      destroyExistingMapOnElement(mapRef.current);

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, { zoomControl: false });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);
        mapInstanceRef.current = map;
      }

      if (!cancelled) setMapReady(true);
    };

    init();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapRef.current) {
        destroyExistingMapOnElement(mapRef.current);
      }
      shopMarkersRef.current = [];
      myLocationMarkerRef.current = null;
      setMapReady(false);
    };
  }, []);

  // Add shop markers
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!mapReady || !mapInstanceRef.current) return;
      const L = (await import("leaflet")).default;

      shopMarkersRef.current.forEach((m) =>
        mapInstanceRef.current.removeLayer(m)
      );
      shopMarkersRef.current = [];

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

      shopMarkersRef.current = shopLocations.map((shop) => {
        const marker = L.marker(shop.coords, { icon: shopIcon }).addTo(
          mapInstanceRef.current
        );
        marker.on("click", () => {
          // ✅ Smoothly pan to shop before opening drawer
          mapInstanceRef.current.flyTo(shop.coords, 16, { animate: true });
          setSelectedShop(shop);
          setDrawerOpen(true);
        });
        return marker;
      });
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [mapReady, shopLocations]);

  // My location marker (center only on first load)
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!mapReady || !mapInstanceRef.current || !myLocation) return;
      const [lat, lng] = myLocation;
      const L = (await import("leaflet")).default;

      if (myLocationMarkerRef.current) {
        mapInstanceRef.current.removeLayer(myLocationMarkerRef.current);
        myLocationMarkerRef.current = null;
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
      myLocationMarkerRef.current?.bringToFront?.();

      // ✅ Center only on first load
      if (!hasCenteredRef.current) {
        mapInstanceRef.current.setView([lat, lng], 16, { animate: true });
        hasCenteredRef.current = true;
      }
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [mapReady, myLocation]);

  return (
    <>
      <div
        ref={mapRef}
        className="leaflet-container w-full h-screen"
        style={{ width: "100%", height: "100vh" }}
      />
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="pb-6 z-[9999]">
          <DrawerHeader>
            <DrawerTitle className="text-primary">
              {selectedShop ? selectedShop.name : "Shop"}
            </DrawerTitle>
            <Separator className="my-4" />
            <DrawerDescription className="flex flex-col">
              <span>
                Current Waiting: {selectedShop?.id ? queues[selectedShop.id]?.size || 0 : 0}
              </span>
              <span>Status: Open until 9 PM</span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex items-center flex-row justify-between">
            <DrawerClose asChild>
              <span className="px-4 flex rounded-full justify-center items-center py-2 w-full border">
                Close
              </span>
            </DrawerClose>
            <button className="px-4 w-full py-2 flex rounded-full justify-center items-center border bg-rose-700 text-white">
              Navigate
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

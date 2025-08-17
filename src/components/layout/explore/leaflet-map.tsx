"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { useUser } from "@clerk/nextjs";
import useShopQueues from "@/hooks/useShopsQueueCounts";
import MapInitializer from "./map/MapInitializer";
import ShopMarkers from "./map/ShopMarkers";
import MyLocationMarker from "./map/MyLocationMarker";
import ShopDrawer from "./map/ShopDrawer";



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
  const { user } = useUser();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const [mapReady, setMapReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<{
    id: string;
    name: string;
    coords: [number, number];
  } | null>(null);

  const shopIds = shopData.map((shop) => shop.id);
  const userId = user?.id;
  const { queues } = useShopQueues(shopIds, userId);

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

  return (
    <>
      {/* Map Container */}
      <div
        ref={mapRef}
        className="leaflet-container w-full h-screen"
        style={{ width: "100%", height: "100vh" }}
      />

      {/* Initialize Map */}
      <MapInitializer
        mapRef={mapRef}
        mapInstanceRef={mapInstanceRef}
        setMapReady={setMapReady}
      />

      {/* Markers */}
      <ShopMarkers
        mapReady={mapReady}
        mapInstanceRef={mapInstanceRef}
        shopLocations={shopLocations}
        setSelectedShop={setSelectedShop}
        setDrawerOpen={setDrawerOpen}
      />
      <MyLocationMarker
        mapReady={mapReady}
        mapInstanceRef={mapInstanceRef}
        myLocation={myLocation}
      />

      {/* Drawer */}
      <ShopDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedShop={selectedShop}
        queues={queues}
      />
    </>
  );
}
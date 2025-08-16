"use client";

import LeafletMap from "@/components/layout/explore/leaflet-map";
import Footer from "@/components/layout/Footer";
import { db } from "@/config/firebase.config";
import useShopQueues from "@/hooks/useShopsQueueCounts";
import { useUser } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Page() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [shopData, setShopData] = useState<
    Array<{
      id: string;
      name: string;
      latitude: number | null;
      longitude: number | null;
    }>
  >([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setLocation({
          latitude: 26.8467,
          longitude: 80.9462,
        });
      }
    );
  }, []);

  useEffect(() => {
    const dbCollection = collection(db, "shops");
    getDocs(dbCollection)
      .then((snapshot) => {
        const shops = snapshot.docs.map((doc) => {
          const data = doc.data();
          const { location } = data;
          return {
            id: doc.id,
            name: data.name,
            latitude: location?.latitude,
            longitude: location?.longitude,
          };
        });
        // console.log(shops);
        setShopData(shops);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <LeafletMap location={location} shopData={shopData} />
      </div>
      <Footer />
    </>
  );
}

export default Page;

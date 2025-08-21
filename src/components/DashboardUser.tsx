"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, MapPinOff, Scissors } from "lucide-react";
import QueueCard from "./ui/QueueCard";
import { Card, CardContent } from "./ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import getShopDistance from "@/utils/get-shop-distance";
import { ShopDataProps } from "@/types/shop_data";
import SearchBar from "./ui/searchBar";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import InQueue from "./ui/InQueue";

const DashboardUser = () => {
  const { userId } = useAuth();
  const [shopData, setShopData] = useState<ShopDataProps[]>([]);
  const [isLocationPermissionAllowed, setIsLocationPermissionAllowed] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // fetch shops functions
  const fetchNearbyShops = async (positionArg?: GeolocationPosition) => {
    setLoading(true);
    setShopData([]);
    try {
      let position = positionArg;
      if (!position) {
        position = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
      }
      setIsLocationPermissionAllowed(true);
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const snapshot = await getDocs(collection(db, "shops"));
      const allShops = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const nearbyShops = allShops
        .map((shop: any) => {
          const lat = Number(shop.location?.latitude);
          const lng = Number(shop.location?.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;
          const distance = getShopDistance(userLat, userLng, lat, lng);
          return { ...shop, distance };
        })
        .filter((shop) => shop && shop.distance <= 2);

      setShopData(nearbyShops);
    } catch (err) {
      setIsLocationPermissionAllowed(false);
      setShopData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNearbyShops();
  }, []);

  // re-request for location permission when permission is not granted
  const requestLocationPermission = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationPermissionAllowed(true);
          fetchNearbyShops(position);
        },
        () => {
          setIsLocationPermissionAllowed(false);
          setLoading(false);
        }
      );
    } else {
      setIsLocationPermissionAllowed(false);
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto pt-2 pb-5 px-5">
        <SearchBar />
        <div className="mt-5">
          <InQueue userId={userId} />
        </div>

        <div className="mt-5 pb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Nearby Location</h2>
            <Link href={""} className="text-sm text-yellow-600 font-semibold">
              See All
            </Link>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <div className="animate-spin">
                <Loader2 size={40} color="#5a5a5a" />
              </div>
            </div>
          ) : isLocationPermissionAllowed ? (
            shopData.length > 0 ? (
              <QueueCard shopData={shopData} />
            ) : (
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center text-center p-16">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <Scissors className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Barber shop not found
                  </h3>
                  <p className="text-gray-500 mt-1">
                    No Barber shop found near your location
                  </p>
                </CardContent>
              </Card>
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8 text-center h-[400px] bg-gray-50">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                <MapPinOff className="h-10 w-10 text-gray-500" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">
                Location permission required
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                To find nearby barbers, please allow access to your location.
              </p>
              <Button
                onClick={requestLocationPermission}
                className="mt-6 bg-[#363636] cursor-pointer"
                disabled={loading}
              >
                Allow location access
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardUser;

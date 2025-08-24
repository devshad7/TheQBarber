import { db } from "@/config/firebase.config";
import { ShopDataProps } from "@/types/shop_data";
import getShopDistance from "@/utils/get-shop-distance";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export const useAllShops = () => {
  const [shops, setShops] = useState<ShopDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchShops = async (positionArg?: GeolocationPosition) => {
    try {
      let position = positionArg;
      if (!position) {
        position = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
      }
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const snapshot = await getDocs(collection(db, "shops"));
      const allShops = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const shopsWithDistance = allShops.map((shop: any) => {
        const lat = Number(shop.location?.latitude);
        const lng = Number(shop.location?.longitude);
        if (isNaN(lat) || isNaN(lng)) return null;
        const distance = getShopDistance(userLat, userLng, lat, lng);
        return { ...shop, distance };
      });
      setShops(shopsWithDistance);
    } catch (err) {
      console.error("Error fetching shops: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const filteredShops = useMemo(() => {
    if (!searchTerm.trim()) return shops;
    return shops.filter((shop) =>
      shop.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shops, searchTerm]);

  return { shops, isLoading, filteredShops, searchTerm, setSearchTerm };
};

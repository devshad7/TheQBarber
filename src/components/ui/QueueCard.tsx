"use client";

import { MapPin, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { ShopDataProps } from "@/types/shop_data";
import Link from "next/link";
import { db } from "@/config/firebase.config";
import { useUser } from "@clerk/nextjs";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useShopQueues from "@/hooks/useShopsQueueCounts";
import { ServiceModal } from "./service-modal";

interface QueueCardProps {
  shopData: (ShopDataProps & { distance?: number })[];
}

const QueueCard = ({ shopData }: QueueCardProps) => {
  const { user } = useUser();
  const [modalShopId, setModalShopId] = useState<string | null>(null);

  const shopIds = shopData.map((shop) => shop.id);
  const userId = user?.id;
  const { queues } = useShopQueues(shopIds, userId);

  // Join queue handler
  const handleAddQueue = async (
    shopId: string,
    serviceId: string,
    serviceDuration: string
  ) => {
    if (!user) return;
    const docRef = doc(db, "shops", shopId, "queues", user.id);
    await setDoc(docRef, {
      fullName: user.fullName,
      estTime: serviceDuration,
      cutType: serviceId,
      mobileNumber: user.phoneNumbers?.[0]?.phoneNumber || "",
      barberUserId: shopId,
      joinedAt: serverTimestamp(),
    })
      .then(() => console.log("Joined queue"))
      .catch((err) => console.error("Error: " + err.message));
  };

  // 🟢 User not in queue, show all shop cards
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[#363636]">
      {shopData.map((shop) => (
        <div key={shop.id}>
          <div className="">
            <Card className="max-w-full md:max-w-md w-full border p-5">
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold">{shop.name}</h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      <span>
                        {typeof shop.distance === "number"
                          ? `${shop.distance.toFixed(2)} km away`
                          : "Distance unknown"}
                      </span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    Available
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Queue: {queues[shop.id]?.size || 0}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">
                      {queues[shop.id]?.size || 0} waiting
                    </span>
                    <span className="text-xs">
                      ~{queues[shop.id]?.estTime || 0} min
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="bg-yellow-700 hover:bg-yellow-800 cursor-pointer text-white font-bold py-5 w-full"
                    onClick={() => setModalShopId(shop.id)}
                  >
                    <Plus className="w-5 h-5" />
                    Join Queue
                  </Button>
                  <Button
                    variant="outline"
                    className="font-bold border-gray-200 bg-transparent py-5 cursor-pointer w-full"
                  >
                    <Link
                      href={`https://www.google.com/maps/dir/?api=1&destination=${Number(
                        shop.location?.latitude
                      )},${Number(shop.location?.longitude)}`}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Directions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      <ServiceModal
        isOpen={modalShopId !== null}
        onOpenChange={(open) => {
          if (!open) setModalShopId(null);
        }}
        handleAddQueue={(serviceId, serviceDuration) => {
          if (modalShopId && serviceId && serviceDuration) {
            handleAddQueue(modalShopId, serviceId, serviceDuration);
            setModalShopId(null);
          }
        }}
      />
    </div>
  );
};

export default QueueCard;

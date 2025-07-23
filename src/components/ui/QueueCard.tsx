"use client";

import { MapPin, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { ShopDataProps } from "@/types/shop_data";
import Link from "next/link";
import { db } from "@/config/firebase.config";
import { useUser } from "@clerk/nextjs";
import { doc, serverTimestamp, setDoc, onSnapshot } from "firebase/firestore";
import useShopQueues from "@/hooks/useShopsQueueCounts";
import { ServiceModal } from "./service-modal";
import { QueueStatus } from "./QueueStatus";
import InQueue from "./InQueue";

interface QueueCardProps {
  shopData: (ShopDataProps & { distance?: number })[];
}

const QueueCard = ({ shopData }: QueueCardProps) => {
  const { user } = useUser();
  const [modalShopId, setModalShopId] = useState<string | null>(null);

  // Tracks each shop's queue info
  const [queueInfo, setQueueInfo] = useState<{
    [shopId: string]: { inQueue: boolean; position: number | null };
  }>({});

  // Tracks if the user is in queue, and their position
  const [userQueue, setUserQueue] = useState<{
    shopId: string;
    position: number | null;
  } | null>(null);

  const [activeQueueInfo, setActiveQueueInfo] = useState<{
    shopName: string | null;
    estTime: number | null;
    cutType: string | null;
    location: { latitude: string | null; longitude: string | null };
  }>({
    shopName: null,
    estTime: null,
    cutType: null,
    location: { latitude: null, longitude: null },
  });

  const shopIds = shopData.map((shop) => shop.id);
  const userId = user?.id;
  const { queues } = useShopQueues(shopIds, userId);

  // Firestore real-time document listener for each shop's queue doc for the current user
  useEffect(() => {
    if (!user?.id) return;

    const unsubscribes = shopData.map((shop) => {
      const ref = doc(db, "shops", shop.id, "queues", user.id);
      return onSnapshot(ref, (snapshot) => {
        if (snapshot.exists()) {
          setUserQueue((prev) =>
            prev && prev.shopId === shop.id
              ? prev
              : { shopId: shop.id, position: null }
          );
        } else {
          setUserQueue((prev) =>
            prev && prev.shopId === shop.id ? null : prev
          );
        }
      });
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [user?.id, shopData]);

  // Map position from queueInfo whenever userQueue or queueInfo changes
  useEffect(() => {
    if (userQueue) {
      const pos = queueInfo[userQueue.shopId]?.position ?? null;
      if (pos !== userQueue.position) {
        setUserQueue((prev) =>
          prev ? { shopId: prev.shopId, position: pos } : null
        );
      }
    }
  }, [queueInfo, userQueue]);

  // Keeps display info in sync when userQueue or queues change
  useEffect(() => {
    if (userQueue?.shopId) {
      const shop = shopData.find((s) => s.id === userQueue.shopId);
      const estTime = queues[userQueue.shopId]?.estTime ?? null;
      const cuttingType = queues[userQueue.shopId]?.cutType ?? null;
      setActiveQueueInfo({
        shopName: shop?.name ?? null,
        estTime,
        cutType: cuttingType,
        location: {
          latitude: shop?.location?.latitude ?? null,
          longitude: shop?.location?.longitude ?? null,
        },
      });
    } else {
      setActiveQueueInfo({
        shopName: null,
        estTime: null,
        cutType: null,
        location: { latitude: null, longitude: null },
      });
    }
  }, [userQueue, queues, shopData]);

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

  // 🟢 If user is in a queue, show InQueue card for that shop
  if (userQueue?.shopId) {
    return (
      <div className="w-full text-[#363636]">
        <InQueue
          position={userQueue.position}
          shopId={userQueue.shopId}
          userId={user?.id ?? ""}
          cutType={activeQueueInfo.cutType ?? ""}
          shopName={activeQueueInfo.shopName}
          estTime={activeQueueInfo.estTime}
          location={activeQueueInfo.location}
        />
      </div>
    );
  }

  // 🟢 User not in queue, show all shop cards
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-[#363636]">
      {shopData.map((shop) => (
        <div key={shop.id}>
          <QueueStatus
            shopId={shop.id}
            onStatusChange={(data) => {
              setQueueInfo((prev) => ({
                ...prev,
                [shop.id]: {
                  inQueue: data.inQueue,
                  position: data.position,
                },
              }));
            }}
          />
          <div>
            <Card className="max-w-full md:max-w-md w-full border p-5">
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{shop.name}</h2>
                    <div className="flex items-center text-muted-foreground">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    className="bg-[#363636] hover:bg-[#414141] cursor-pointer text-white font-bold py-5"
                    onClick={() => setModalShopId(shop.id)}
                  >
                    <Plus className="w-5 h-5" />
                    Join Queue
                  </Button>
                  <Button
                    variant="outline"
                    className="font-bold border-gray-300 bg-transparent py-5 cursor-pointer"
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

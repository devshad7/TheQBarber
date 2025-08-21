"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

type ShopDetails = {
  id: string;
  name: string;
  total_waiting: number;
  location: {
    latitude: string;
    longitude: string;
  };
};

type QueueDetails = {
  queue_position: number;
  cutType: string;
  joinedAt: Timestamp;
  estTime: number;
};

type UserQueue = {
  barber_shop: ShopDetails;
  queue_details: QueueDetails;
};

export function useUserQueue(userId: string | null | undefined) {
  const [userQueues, setUserQueues] = useState<UserQueue[]>([]);

  useEffect(() => {
    if (!userId) return;

    let unsubs: Unsubscribe[] = [];

    // Listen to ALL shops in realtime
    const unsubShops = onSnapshot(collection(db, "shops"), (shopsSnap) => {
      // cleanup previous listeners
      unsubs.forEach((u) => u());
      unsubs = [];

      shopsSnap.docs.forEach((shopDoc) => {
        const queueRef = doc(db, "shops", shopDoc.id, "queues", userId);

        // listen to this user's queue in this shop
        const unsubUserQueue = onSnapshot(queueRef, (queueSnap) => {
          if (!queueSnap.exists()) {
            // remove this shop's queue if user left
            setUserQueues((prev) =>
              prev.filter((q) => q.barber_shop.id !== shopDoc.id)
            );
            return;
          }

          const { barberUserId, cutType, joinedAt } = queueSnap.data() as {
            barberUserId: string;
            cutType: string;
            joinedAt: Timestamp;
          };

          const shopRef = doc(db, "shops", barberUserId);
          const unsubShop = onSnapshot(shopRef, (shopSnap) => {
            if (!shopSnap.exists()) return;

            const shopData = shopSnap.data() as Omit<
              ShopDetails,
              "id" | "total_waiting"
            >;

            const q = query(
              collection(db, "shops", barberUserId, "queues"),
              orderBy("joinedAt", "asc")
            );

            const unsubQueueList = onSnapshot(q, (queueList) => {
              const allQueues = queueList.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              })) as {
                id: string;
                cutType: string;
                estTime: number;
                joinedAt: Timestamp;
              }[];

              const position = allQueues.findIndex((q) => q.id === userId);

              if (position === -1) {
                // user disappeared → remove
                setUserQueues((prev) =>
                  prev.filter((q) => q.barber_shop.id !== barberUserId)
                );
                return;
              }

              // ✅ waitTime = sum of cutTimes of all users before current one
              const waitTime =
                position === 0
                  ? 0
                  : allQueues
                      .slice(0, position) // all ahead of me
                      .reduce((acc, q) => acc + (q.estTime || 0), 0);

              const updatedQueue: UserQueue = {
                barber_shop: {
                  id: barberUserId,
                  name: shopData.name,
                  location: {
                    latitude: shopData.location.latitude,
                    longitude: shopData.location.longitude,
                  },
                  total_waiting: allQueues.length,
                },
                queue_details: {
                  queue_position: position + 1,
                  cutType,
                  joinedAt,
                  estTime: waitTime,
                },
              };

              // replace or add this shop’s queue
              setUserQueues((prev) => {
                const others = prev.filter(
                  (q) => q.barber_shop.id !== barberUserId
                );
                const next = [...others, updatedQueue];

                // sort so newest joined is first
                return next.sort((a, b) => {
                  const aTime = a.queue_details.joinedAt?.toMillis?.() ?? 0;
                  const bTime = b.queue_details.joinedAt?.toMillis?.() ?? 0;
                  return bTime - aTime;
                });
              });
            });

            unsubs.push(unsubQueueList);
          });

          unsubs.push(unsubShop);
        });

        unsubs.push(unsubUserQueue);
      });
    });

    return () => {
      unsubShops();
      unsubs.forEach((u) => u());
    };
  }, [userId]);

  return userQueues;
}

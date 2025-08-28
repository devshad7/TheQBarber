"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface CancelledQueue {
  id: string;
  userId: string;
  barber_shop_name: string;
  canceledAt: Timestamp;
}

export const useGetCancelledBooking = (userId: string | null | undefined) => {
  const [cancelledQueues, setCancelledQueues] = useState<CancelledQueue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setCancelledQueues([]);

    // listen to shops collection
    const unsubscribeShops = onSnapshot(
      collection(db, "shops"),
      (shopSnapshot) => {
        const unsubscribers: (() => void)[] = []; // to hold child unsubscribes
        const allResults: CancelledQueue[] = [];

        shopSnapshot.docs.forEach((shopDoc) => {
          const cancelledRef = collection(
            db,
            "shops",
            shopDoc.id,
            "canceledQueues"
          );

          // listen to each shop's cancelledQueues subcollection
          const unsubscribeCancelled = onSnapshot(
            cancelledRef,
            (cancelledSnap) => {
              const userCancelled = cancelledSnap.docs
                .map((doc) => {
                  const data = doc.data() as DocumentData;
                  return { id: doc.id, ...data } as CancelledQueue;
                })
                .filter((item) => item.userId === userId);

              // merge results for this shop into the allResults
              allResults.push(...userCancelled);
              setCancelledQueues([...allResults]);
              setLoading(false);
            }
          );

          unsubscribers.push(unsubscribeCancelled);
        });

        // cleanup all inner listeners when shops change
        return () => {
          unsubscribers.forEach((unsub) => unsub());
        };
      }
    );

    // cleanup on unmount
    return () => unsubscribeShops();
  }, [userId]);

  return { cancelledQueues, loading };
};

// Todo: deleting part is not reflecting in real-time
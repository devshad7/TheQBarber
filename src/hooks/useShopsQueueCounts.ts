import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

type QueueInfo = {
  size: number;
  estTime: number;
  cutType: string | null;
};

function useShopQueues(shopIds: string[], userId: string | undefined) {
  const [queues, setQueues] = useState<{ [shopId: string]: QueueInfo }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueues = async () => {
      const result: { [shopId: string]: QueueInfo } = {};
      for (const shopId of shopIds) {
        const queuesRef = collection(db, "shops", shopId, "queues");
        const snapshot = await getDocs(queuesRef);

        let totalEstTime = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const time =
            typeof data.estTime === "string" ? parseInt(data.estTime, 10) : 0;
          totalEstTime += isNaN(time) ? 0 : time;
        });

        let cutType: string | null = null;
        if (userId) {
          const myDocRef = doc(db, "shops", shopId, "queues", userId);
          const myDocSnap = await getDoc(myDocRef);
          if (myDocSnap.exists()) {
            cutType = myDocSnap.data().cutType || null;
          }
        }

        result[shopId] = {
          size: snapshot.size,
          estTime: totalEstTime,
          cutType: cutType,
        };
      }
      setQueues(result);
      setLoading(false);
    };

    if (shopIds.length > 0) fetchQueues();
  }, [shopIds, userId]);

  return { queues, loading };
}

export default useShopQueues;

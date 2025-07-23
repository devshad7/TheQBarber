// components/QueueStatus.tsx
import { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

interface QueueStatusProps {
  shopId: string;
  onStatusChange?: (data: {
    inQueue: boolean;
    position: number | null;
  }) => void;
}

export const QueueStatus = ({ shopId, onStatusChange }: QueueStatusProps) => {
  const { user } = useUser();
  const [inQueue, setInQueue] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      if (!user?.id) return;
      setLoading(true);

      const queueRef = collection(db, "shops", shopId, "queues");
      const snapshot = await getDocs(queueRef);
      const queueList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userIndex = queueList.findIndex((q: any) => q.id === user.id);

      setInQueue(userIndex !== -1);
      setPosition(userIndex !== -1 ? userIndex + 1 : null);
      setLoading(false);

      onStatusChange?.({ inQueue, position: userIndex + 1 });
    };

    fetchQueue();
  }, [shopId, user?.id, onStatusChange]);

  return <></>;
};

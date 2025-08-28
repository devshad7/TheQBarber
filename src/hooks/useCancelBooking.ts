import { db } from "@/config/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const handleQueueDone = async ({
  shopId,
  userId,
}: {
  shopId: string;
  userId: string | null | undefined;
}) => {
  if (!shopId || !userId) return;
  try {
    const queueRef = doc(db, "shops", shopId, "queues", userId);
    const canceledRef = collection(db, "shops", shopId, "canceledQueues");

    // Get the current queue data
    const snap = await getDoc(queueRef);
    const barber_shop_id = snap.data()?.barberUserId;

    const barberRef = doc(db, "shops", barber_shop_id);
    const barberSnap = await getDoc(barberRef);
    const barber_shop_name = barberSnap.data()?.name;

    if (snap.exists()) {
      const data = snap.data();

      // Save it to canceledQueues
      await addDoc(canceledRef, {
        ...data,
        userId: userId,
        barber_shop_name: barber_shop_name,
        canceledAt: new Date(),
      });

      // Delete from active queue
      await deleteDoc(queueRef);
    }
  } catch (err: any) {
    console.error("Error moving queue to canceled:", err.message);
  }
};

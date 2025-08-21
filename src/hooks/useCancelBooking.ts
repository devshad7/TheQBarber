import { db } from "@/config/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";

export const handleQueueDone = ({
  shopId,
  userId,
}: {
  shopId: string;
  userId: string | null | undefined;
}) => {
  if (!shopId || !userId) return;
  const ref = doc(db, "shops", shopId, "queues", userId);
  deleteDoc(ref)
    .then(() => {
      console.log("Cutting Done");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

"use client";

import { Phone, Check, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import Link from "next/link";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useUser } from "@clerk/nextjs";

interface Queue {
  id: string;
  fullName: string;
  mobileNumber: string;
  estTime: string;
  cutType: string;
  barberUserId: string;
}

const QueueCardBarber = () => {
  const { user } = useUser();
  const [queue, setQueue] = useState<Queue[]>([]);

  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "shops", user.id, "queues");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const queueData = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Queue, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      setQueue(queueData);
      // console.log(queueData);
    });

    return () => unsubscribe();
  }, [user]);

  const hasCustomers = queue.length > 0;

  // click function to remove from queue when done
  const handleQueueDone = (id: string, barberUserId: string) => {
    const ref = doc(db, "shops", barberUserId, "queues", id);
    deleteDoc(ref)
      .then(() => {
        console.log("Cutting Done");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      {hasCustomers ? (
        <div>
          <Card>
            <CardContent className="">
              <h3 className="font-bold mb-4 text-lg">Current Queue</h3>
              <div className="flex flex-col gap-y-4">
                {queue.map((customer, idx) => (
                  <div
                    key={customer.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 px-5 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 shadow-sm shadow-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{customer.fullName}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 mr-1.5" />
                          {customer.mobileNumber}
                        </div>
                        <p className="text-sm text-gray-500">
                          Cutting time {customer.estTime}min
                        </p>
                        <p className="text-sm text-blue-600 font-medium mt-1">
                          {customer.cutType}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                      <Link
                        href={`tel:${customer.mobileNumber}`}
                        className="w-full md:w-auto"
                      >
                        <Button
                          className="w-full md:w-auto bg-transparent cursor-pointer"
                          variant="outline"
                        >
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                      </Link>
                      <Button
                        className="bg-green-600 hover:bg-green-700 w-full md:w-auto cursor-pointer"
                        onClick={() =>
                          handleQueueDone(customer.id, customer.barberUserId)
                        }
                      >
                        <Check className="h-4 w-4" />
                        Done
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center text-center p-16">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              No Customers in Queue
            </h3>
            <p className="text-gray-500 mt-1">
              Customers can find you in the app and join your queue.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default QueueCardBarber;

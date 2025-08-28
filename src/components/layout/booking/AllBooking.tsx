import React from "react";
import { Card, CardContent } from "../../ui/card";
import { useUserQueue } from "@/hooks/useUserQueue";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Separator } from "../../ui/separator";
import { formatWaitTime } from "@/hooks/useFormatWaitTime";
import { handleQueueDone } from "@/hooks/useCancelBooking";
import { useGetCancelledBooking } from "@/hooks/useGetCancelledBooking";
import { Loader2 } from "lucide-react";

const InQueue = ({
  userId,
  type,
}: {
  userId: string | null | undefined;
  type: string | null;
}) => {
  const userQueue = useUserQueue(userId);

  const { cancelledQueues, loading } = useGetCancelledBooking(userId);

  const handleGetCancelledBooking = () => {
    console.log(cancelledQueues);
  };

  // if (!userQueue || userQueue.length === 0) {
  //   return (
  //     <>
  //       <p className="text-center">No bookings found</p>
  //     </>
  //   );
  // }

  if (type !== "upcoming") {
    //Todo: fix it to production level when the things are done
    if (type === "completed") {
      return (
        <>
          <p className="text-center">No completed bookings found</p>
        </>
      );
    } else if (type === "cancelled") {
      return (
        <div className="space-y-4">
          {loading ? (
            <LoadingSpinner />
          ) : cancelledQueues.length > 0 ? (
            cancelledQueues.map((data) => (
              <Card
                className="w-full border border-yellow-700 bg-yellow-50"
                key={data.id}
              >
                <CardContent className="">
                  <h2 className="text-lg font-semibold">
                    {data.barber_shop_name}
                  </h2>
                  <p className="text-sm text-gray-600 font-semibold">
                    Canceled at: {data.canceledAt.toDate().toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center">No cancelled bookings found</p>
          )}
        </div>
      );
    }
  }

  return (
    <div className="space-y-4">
      {userQueue.length > 0 ? (
        userQueue.map((data) => (
          <Card
            className="w-full border border-yellow-700 bg-yellow-50"
            key={data.barber_shop.id}
          >
            <CardContent className="">
              <h2 className="text-lg font-semibold">{data.barber_shop.name}</h2>
              <p className="text-sm text-gray-600 font-semibold">
                #{data.queue_details.queue_position} •{" "}
                {data.queue_details.cutType} •{" "}
                {data.queue_details.estTime > 0
                  ? formatWaitTime(Number(data.queue_details.estTime))
                  : "It's your turn"}
              </p>
              <div className="text-sm space-x-2 text-yellow-700 mt-2">
                <Drawer>
                  <DrawerTrigger>
                    <span className="underline underline-offset-2">
                      Cancel Booking
                    </span>
                  </DrawerTrigger>
                  <DrawerContent
                    className="pb-6 z-[9999]"
                    overlayClassName="backdrop-blur-md bg-transparent"
                  >
                    <DrawerHeader>
                      <DrawerTitle className="text-yellow-800">
                        Cancel Booking
                      </DrawerTitle>
                      <Separator className="my-4" />
                      <DrawerDescription className="flex flex-col">
                        <span className="text-base font-semibold text-[#363636]">
                          Are you sure want to cancel your booking?
                        </span>
                        <span className="font-light mt-1">
                          Your spot will be released, but you can schedule a new
                          appointment anytime.
                        </span>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="flex items-center flex-row justify-between">
                      <DrawerClose asChild>
                        <span className="px-4 flex rounded-full justify-center items-center py-2 w-full border">
                          Cancel
                        </span>
                      </DrawerClose>
                      <span
                        className="px-4 w-full py-2 flex rounded-full justify-center items-center border bg-yellow-700 hover:bg-yellow-800 text-white"
                        onClick={() =>
                          handleQueueDone({
                            shopId: data.barber_shop.id,
                            userId: userId,
                          })
                        }
                      >
                        Confirm
                      </span>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <span className="underline underline-offset-2">
                  View E-Receipt
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center">No upcoming bookings found.</p>
      )}
    </div>
  );
};

export default InQueue;

const LoadingSpinner = () => {
  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

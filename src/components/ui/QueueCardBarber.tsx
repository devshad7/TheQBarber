import { Phone, Check, Users } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import Link from "next/link";

interface Queue {
  id: number;
  name: string;
  phone: string;
  waitTime: string;
  service: string;
}

const QueueCardBarber = () => {
  const queue: Queue[] = [
    // {
    //   id: 1,
    //   name: "fjaksd",
    //   phone: "8324389218",
    //   waitTime: "less than 1 minutes",
    //   service: "Beard Trim",
    // },
  ];
  const hasCustomers = queue.length > 0;

  return (
    <>
      {hasCustomers ? (
        <div>
          <Card>
            <CardContent className="">
              <h3 className="font-bold mb-4 text-lg">Current Queue</h3>
              <div className="flex flex-col gap-y-4">
                {queue.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 px-5 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 shadow-sm shadow-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.id}
                      </div>
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 mr-1.5" />
                          {customer.phone}
                        </div>
                        <p className="text-sm text-gray-500">
                          Waiting for {customer.waitTime}
                        </p>
                        <p className="text-sm text-blue-600 font-medium mt-1">
                          {customer.service}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                      <Link
                        href={`tel:${customer.phone}`}
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
                      <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto cursor-pointer">
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

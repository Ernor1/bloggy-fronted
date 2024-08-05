"use client";

import { TTags, TUser } from "@/lib/types";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const DashboardFilterPage = ({ params }: { params: { filter: string } }) => {
  const { data } = useQuery(["dashboard", params.filter], {
    queryFn: async (): Promise<any> => {
      const { data } = await axios.get(`http://localhost:5000/api/v1/${params.filter}/all`);
      console.log(data);

      return data.data;
    },
    refetchOnWindowFocus: false,
  });
  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
    {data && data.length > 0
      ? data.map((card:any) => (
          <Card
            radius="sm"
            shadow="none"
            className="border"
            key={card.id}
            
          >
            <CardHeader className="justify-between">
              <Chip
                radius="sm"
                as={Link}
                href={"/"}
                variant="light"
                size="sm"
                className="font-bold text-base border border-transparent"
                  // onMouseEnter={() => setHoverCardData(card)}
                  // onMouseLeave={() => setHoverCardData(null)}
                // style={{
                //   backgroundColor:
                //     tag.id === hoverCardData?.id
                //       ? `${hoverCardData.color}30`
                //       : "",
                //   borderColor:
                //     tag.id === hoverCardData?.id
                //       ? `${hoverCardData.color}`
                //       : "",
                // }}
              >
                {card.name}
              </Chip>
            </CardHeader>
            <CardBody className="py-1">
              <p>{card.description}</p>
            </CardBody>
            <CardFooter>
              <Button radius="sm" color="primary" className="mr-2">
                Edit
              </Button>
              <Button radius="sm" color="danger">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      : null}
  </div>
  );
};

export default DashboardFilterPage;

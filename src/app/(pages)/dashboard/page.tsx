"use client";

import DashboardPosts from "@/components/dashboard/Posts";
import { TDashboard } from "@/lib/types";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setDashBoardData } from "@/redux/dashboardSlice";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const Dashboard = () => {
  const [data, setData] = useState<TDashboard | null>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const { filterPost } = useAppSelector((state) => state.dashboard);

  const postData = useQuery(["dashboard", user?.userName], {
    queryFn: async (): Promise<TDashboard> => {
      const { data } = await axios.get(`/api/dashboard`);
      return data;
    },
    onSuccess: (fetchedData) => {
      setData(fetchedData);
      dispatch(setDashBoardData(fetchedData));
    },
  });

  const postDataWithFilter = useQuery(["dashboard", filterPost], {
    queryFn: async (): Promise<TDashboard> => {
      const { data } = await axios.get(`/api/dashboard?filter=${filterPost}`);
      return data;
    },
    enabled: !!filterPost,
    onSuccess: (fetchedData) => {
      setData(fetchedData);
      dispatch(setDashBoardData(fetchedData));
    },
  });
  if (!user && !(user?.roles?.some((role:any) => role.roleName === "ADMIN"))) {
    return (
      <div className="flex items-center justify-center flex-col h-[80vh]">
        <div className="inline-flex rounded-full bg-yellow-100 p-4">
          <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold my-6">you are not authorize</h1>
        <Button
          variant="bordered"
          color="primary"
          radius="sm"
          as={Link}
          href="/"
        >
          <Icon name="chevron-left" /> Return Home
        </Button>
      </div>
    );
  }

  if (postData.isLoading) {
    return (
      <div className="h-[calc(100dvh_-_150px)] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="">
      {data !== null && Object.entries(data).length > 0 ? (
        <DashboardPosts dashboardData={data} />
      ) : null}
    </section>
  );
};

export default Dashboard;

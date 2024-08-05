"use client";

import Icon from "@/components/Icon";
import PostCard from "@/components/posts/PostCard";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { useAppSelector } from "@/hooks/reduxHooks";
import { TUser } from "@/lib/types";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getBlogsByAuthor } from "@/app/api/blog.api";
import { getCommentsByUserId } from "@/app/api/comment.api";

const Page = ({ params }: { params: { userId: string } }) => {
  const { moreInfo } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);
  console.log(moreInfo)
  const[comments,setComments] = useState<any[]>([]);

  const { data, isLoading, isError } = useQuery(["user", params.userId], {
    queryFn: async (): Promise<any> => {
      try {
        const { data } = await getBlogsByAuthor(params.userId);
        return data;
      } catch (error: any) {
        console.log(error);
        notFound();
      }
    },
    retry: 1,
  });
  useEffect(() => {
    getCommentsByUserId(user?.id).then((res) => {
      console.log(res);
      setComments(res);
    });

  },[user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)]">
        Loading...
      </div>
    );
  }

  if (isError) {
    notFound();
  }
  console.log(data);

  return (
    <>
      {data && Object.entries(data).length > 0 && (
        <main className="bg-neutral-100">

          <section className="py-3 grid grid-cols-1 md:grid-cols-[250px_1fr] md:w-[80%] m-auto gap-4">
            <aside>
              <div
                className={clsx(
                  moreInfo ? "max-md:grid" : "max-md:hidden",
                  "bg-white rounded-md p-4 md:grid gap-4 text-neutral-600"
                )}
              >
                <div className="flex items-center gap-4">
                  <span>
                    <Icon strokeWidth={1.25} name="newspaper" />
                  </span>
                  <span>{data?.length} posts published</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    <Icon strokeWidth={1.25} name="message-circle" />
                  </span>
                  <span>{comments.length} comments written </span>
                </div>

              </div>
            </aside>
            <div>
              {data.length > 0 ? (
                data.map((post:any) => <PostCard post={post} key={post.id} />)
              ) : (
                <div className="p-4 rounded-md bg-white">
                  @{data.username} has not published any post yet!
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Page;

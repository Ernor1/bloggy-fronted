"use client";
import PostArticle from "@/components/posts/PostArticle";
import UserProfileCard from "@/components/posts/UserProfileCard";
import { TPost } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setProgress } from "@/redux/commonSlice";
import { getBlog, getBlogsByAuthor } from "@/app/api/blog.api";

type TPostProp = {
  params: { postId: string };
};

const Page = ({ params }: TPostProp) => {
  const dispatch = useAppDispatch();
  const[userPosts, setUserPosts] = useState<any[]>([]);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: async (): Promise<TPost> => {
      const  {data}  = await getBlog(params.postId);
      return data;
    },
    retry: 1,
    onSuccess: () => {
      dispatch(setProgress(100));
    },
  });
  console.log(data);
  // useEffect(()=>{
  //   if(data?.author.id){
  //     getBlogsByAuthor(data.author.id).then((res)=>{
  //       setUserPosts(res.data);
  //     })
  //   }

  
  // })
  // if (isError) {
  //   console.log("error");
  //   dispatch(setProgress(100));
  //   throw new Error("Oops something went wrong.");
  // }

  if (isLoading) {
    dispatch(setProgress(70));
    return (
      <div className="sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)] text-xl flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }




  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[65%_35%] p-2 md:py-6 md:px-16 h-full gap-4">
        <section>
          {data && (
            <PostArticle post={data} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;

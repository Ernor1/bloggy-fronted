"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import { Avatar, Button, useDisclosure } from "@nextui-org/react";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

import { TComment, TPost } from "@/lib/types";

import { useQuery } from "@tanstack/react-query";

import Icon from "../Icon";
import AddComment from "./AddComment";
import AddReply from "./AddReply";
import CommentCard from "./CommentCard";
import AuthModal from "../AuthModal";
import { getCommentsByPostId } from "@/app/api/comment.api";

const Comments = ({ post }: { post: TPost }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { user } = useAppSelector((state) => state.auth);

  const [openReplyInput, setOpenReplyInput] = useState("");
  const [extentReplies, setExtendReplies] = useState("");

  const comments = useQuery({
    queryKey: ["comments", post.path],
    queryFn: async (): Promise<any[]> => {
      try {
        const  data  = await getCommentsByPostId(post.id);
         console.log(data)
        return data;
      } catch (error: any) {
        return [];
      }
    },
    enabled: !!post.id,
  });

  if (comments.isLoading) {
    return <>Loading...</>;
  }


  console.log(comments)

  return (
    <section className="" id="comments">
      {/* ===COMMENT INPUT BOX=== */}
      <h4 className="text-2xl font-bold pb-6">
        Top Comments: {comments?.data?.length}
      </h4>
      <AddComment post={post} />
      {/* ===ALL COMMENTS=== */}
      <div className="pt-8">
        {comments.data && comments.data.length > 0
          ? comments.data.map((comment) => (
              <div className="flex md:gap-4 gap-2 pb-6" key={comment.id}>
                {/* <Avatar
                  fallback={comment.user.username}
                  src={comment.author.avatar}
                  as={Link}
                  href={`/${comment.author.username}`}
                  className="w-8 h-8 md:w-10 md:h-10"
                /> */}
                <div className="flex-1">
                  {/* ===COMMENTS CARD=== */}
                  <CommentCard
                    data={comment}
                    type="comment"
                    postPath={post.path}
                  />
                </div>
              </div>
            ))
          : null}
      </div>

      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default Comments;

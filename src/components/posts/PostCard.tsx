"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import { TPost } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setProgress } from "@/redux/commonSlice";
import { useQueryClient } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/app/api/comment.api";

const PostCard = ({ post }: { post: TPost }) => {
  const dispatch = useAppDispatch();

  const { authStatus, user } = useAppSelector((state) => state.auth);
  const[comments, setComments] = useState(0);

  const queryClient = useQueryClient();


  const getComments =async()=>{
    const data= await getCommentsByPostId(post.id);
    setComments(data.length);
  }
  useEffect( () => {
    getComments();
  }, []);

  return (
    <article className="mb-2">
      <Card shadow="none" radius="sm" className="border">
        <CardHeader>
          <User
            as={Link}
            href={post.author.username}
            name={post.author.name}
            description={"@" + post.author.username}
            avatarProps={{
              src: `${post.author.avatar}`,
            }}
          />
        </CardHeader>
        <CardBody className="py-0">
          <div className="flex items-center">
            <div className="flex-[2]">
              <h3 className="text-2xl font-bold">
                <Link
                  href={`/${post.author.username}/${post.id}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="pt-2">
                <p>{post.content}</p>
                </div>

            </div>
            {post.image !== null && (
              <figure className="max-md:hidden flex-1 w-full h-full">
                <Image
                  src={post.image}
                  width={200}
                  height={200}
                  alt="about image"
                  className="rounded-md object-cover w-full h-full aspect-[4/2]"
                />
              </figure>
            )}
          </div>
        </CardBody>
        <CardFooter className="justify-between">
          <div className="flex items-center gap-4">
            <Button
              className="flex items-center gap-2"
              variant="light"
              as={Link}
              href={`/${post.author.username}/${post.id}#comments`}
            >
              <Icon name="message-circle" strokeWidth={1.25} />
              <span>
                {comments}{" "}
                <span className="max-sm:hidden transparent">Comments</span>
              </span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};

export default PostCard;

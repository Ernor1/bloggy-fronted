"use client";

import { getAllBlogs } from "@/app/api/blog.api";
import { getAllCategories } from "@/app/api/category.api";
import { getAllComments } from "@/app/api/comment.api";
import { getAllTags } from "@/app/api/tag.api";
import { useAppSelector } from "@/hooks/reduxHooks";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Count = () => {
  const params = useParams();
  const[posts,setPosts] = useState<any[]>([]);
  const[tags,setTags] = useState<any[]>([]);
  const[categories,setCategories] = useState<any[]>([]);
  const[comments,setComments] = useState<any[]>([]);
  useEffect(()=>{
    getAllBlogs().then((res)=>{
      setPosts(res)
    })
    getAllTags().then((res)=>{
      setTags(res)
    })
    getAllCategories().then((res)=>{
      setCategories(res)
    })
    getAllComments().then((res)=>{
      setComments(res)
    })

  },[])

  return (
    <>
      {posts !== null && comments !==null && tags !==null && categories !==null ? (
        <>
          {!params.filter ? (
            <section className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-4">
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">{posts.length}</span>
                <p className="text-default-500">Total post </p>
              </div>

              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">
                  {tags.length}
                </span>
                <p className="text-default-500">Total tags </p>
              </div>
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">{categories.length}</span>
                <p className="text-default-500">Total categories</p>
              </div>
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">
                  {comments.length}
                </span>
                <p className="text-default-500">Total  comments</p>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Count;

"use client";

import { getAllBlogs } from "@/app/api/blog.api";
import { getAllCategories } from "@/app/api/category.api";
import { getAllComments } from "@/app/api/comment.api";
import { getAllTags } from "@/app/api/tag.api";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Button, Select, SelectItem } from "@nextui-org/react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardFilter = () => {
  const router = useRouter();
  const params = useParams();

  const { dashboardData } = useAppSelector((state) => state.dashboard);
  const[tags,setTags] = useState<any[]>([]);
  const[categories,setCategories] = useState<any[]>([]);
  const[comments,setComments] = useState<any[]>([]);
  useEffect(()=>{

    getAllTags().then((res)=>{
      setTags(res)
    })
    getAllCategories().then((res)=>{
      setCategories(res)
    })
    getAllBlogs().then((res)=>{
      setComments(res)
    })

  },[])

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value);
  };

  return (
    <>
      <aside className="flex-1 flex flex-col gap-4 max-md:hidden">
        <Button
          as={Link}
          href="/dashboard"
          variant={!params.filter ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Posts</span>
          <span>{comments.length}</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/category"
          variant={params.filter === "followers" ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Categories</span>
          <span>{categories.length}</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/tag"
          variant={params.filter === "following_users" ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Tags</span>
          <span>{tags.length}</span>
        </Button>

      </aside>

    </>
  );
};

export default DashboardFilter;

const FilterLinks = [
  {
    label: "Posts",
    path: "/dashboard",
  },
  {
    label: "Followers",
    path: "/dashboard/followers",
  },
  {
    label: "Following Users",
    path: "/dashboard/following_users",
  },
  {
    label: "Following Tags",
    path: "/dashboard/following_tags",
  },
];

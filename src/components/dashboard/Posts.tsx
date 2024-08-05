import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import Icon from "../Icon";
import DeletePostModal from "../posts/DeletePostModal";
import { TDashboard } from "@/lib/types";

import moment from "moment";
import { setFilterPost } from "@/redux/dashboardSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { getAllBlogs } from "@/app/api/blog.api";

type TDeletePayloadProp = {
  path: string;
  id: string;
};

const DashboardPosts = ({ dashboardData }: { dashboardData: any }) => {
  const[blogs,setBlogs] = useState<any[]>([]);
  const router = useRouter();
  useEffect(()=>{
    getAllBlogs().then((res)=>{
      setBlogs(res)
    })

  },[])

  const dispatch = useAppDispatch();

  const [deletePostPayload, setDeletePostPayload] =
    useState<TDeletePayloadProp>({ id: "", path: "" });

  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const handleDelete = (postId: string, postPath: string) => {
    const deletePayload = {
      path: postPath,
      id: postId,
    };
    setDeletePostPayload(deletePayload);
    onOpen();
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFilterPost(value));
  };
  console.log(dashboardData)

  return (
    <>
      {blogs.length > 0 ? (
        <div className="">
          <div className="flex justify-between items-center py-4">
            <h3 className="text-2xl font-semibold">Posts</h3>
            <div>
            <Button
            as={Link}
            href={"/new"}
            variant="ghost"
            color="primary"
            className="border-1.5 group-hover:underline"
            radius="sm"
          >
            Write Post
          </Button>

            </div>
          </div>
          <div className="border rounded-md">
            {blogs.map((post:any) => (
              <div
                key={post.id}
                className="grid md:grid-cols-[60%_20%_20%] grid-cols-2 border-b p-4 hover:bg-default-50 items-center"
              >
                <div className="max-md:col-span-2">
                  <h2 className="text-xl font-bold leading-none pb-2 text-primary-600">
                    <Link href={`/${dashboardData.username}/${post.path}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-default-600">
                    <span className="font-bold mr-2">Published:</span>
                    <span>
                      {moment(post.createdOn, moment.ISO_8601).format("MMM DD")}
                    </span>
                  </p>
                </div>                
                <div className="justify-self-end">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() =>
                      router.push(
                        `/${post.author.username}/${post.id}/edit`
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(post.id, post.path)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Card radius="sm" shadow="none" className="border">
          <CardBody className="text-xl font-medium flex justify-center">
            This is where you can manage your posts, but you haven&apos;t
            written anything yet.
          </CardBody>
          <CardFooter className="justify-center">
            <Button radius="sm" color="primary" as={Link} href="/new">
              Write your first post now
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* ===DELETE POST MODAL=== */}
      <DeletePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        post={deletePostPayload}
        type="dashboard"
      />
    </>
  );
};

export default DashboardPosts;

const PostSort = [
  {
    label: "Recently Created",
    value: "recently_created",
  },
  {
    label: "Most Views",
    value: "most_views",
  },
  {
    label: "Most Comments",
    value: "most_comments",
  },
  {
    label: "Most Reactions",
    value: "most_reactions",
  },
  {
    label: "Published",
    value: "PUBLISHED",
  },
  {
    label: "Draft",
    value: "DRAFT",
  },
];

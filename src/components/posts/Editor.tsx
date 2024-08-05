"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";

import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Icon from "../Icon";
import EditorJS from "@editorjs/editorjs";
import { convertImageToBase64 } from "@/utils/convertImageTobase64";
import { TPost } from "@/lib/types";
import { createBlog, getAllBlogs, updateBlog } from "@/app/api/blog.api";
import { getAllTags } from "@/app/api/tag.api";
import { getAllCategories } from "@/app/api/category.api";

type TForm = {
  title: string;
  image: Blob | MediaSource;
  postType: "DRAFT" | "PUBLISHED";
};

const Editor = ({ post }: { post: TPost | null }) => {
  const router = useRouter();
  const params = useParams();
  const[categories,setCategories]=useState([])
  const[tags,setTags]=useState([])
  const[selectedCategory,setSelectedCategory]=useState<any>(post?.category.map((category:any)=>category.id))
  const[selectedTag,setSelectedTag]=useState<any>([])

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TForm>({ defaultValues: { title: post?.title } });
  const postType = watch("postType");

  const [imageFile, setImageFile] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef<EditorJS | undefined>(undefined);

  useEffect(() => {
    if (errors.title) {
      toast.error("Title can't be empty!");
    }
  }, [errors.title]);

  const onSubmitHandler: SubmitHandler<TForm> = async (data) => {
    try {
      const blocks = await ref.current?.save();

      if (params.postId) {
        const res = await updateBlog(params.postId, {
          title: data.title,
          content: blocks,
          categories: Array.from(selectedCategory),
          tags: Array.from(selectedTag),
        })
        toast.success(res.message);
        router.push(`/dashboard`);
      } else {
        console.log(typeof(Array.from(selectedCategory)))
        console.log(Array.from(selectedTag)[0])
        const res = await createBlog({
          title: data.title,
          content: blocks?.blocks[0].data.text,
          categories: Array.from(selectedCategory),
          tags: Array.from(selectedTag),
        })
        toast.success(res.message);

          router.push(
            `/`
          );
      }
      reset();
      setImageFile(null);
      ref?.current?.clear();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const convertedImage = await convertImageToBase64(file);
    setImageFile(convertedImage);
  };

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Raw = (await import("@editorjs/raw")).default;
    const CheckList = (await import("@editorjs/checklist")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        placeholder: "Write your post content here...",
        inlineToolbar: true,
        data: post?.content,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          list: List,
          checkList: CheckList,
          embed: Embed,
          linkTool: LinkTool,
          inlineCode: InlineCode,
          table: Table,
          quote: Quote,
          code: Code,
          raw: Raw,
        },
        onReady: () => {
          ref.current = editor;
        },
      });
    }
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initEditor();

      return () => {
        ref.current && ref.current.destroy;
        ref.current === undefined;
      };
    }
  }, [isMounted, initEditor]);

  useEffect(()=>{
    getAllCategories().then((res) => {
      setCategories(res)
    })
    getAllTags().then((res) => {
      setTags(res)
    })
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="h-full">
      <nav className="bg-transparent flex justify-between md:px-6 px-2 py-2 items-center">
        <Button
          radius="sm"
          variant="light"
          aria-label="Back button"
          onPress={() => router.back()}
        >
          <Icon name="chevron-left" /> back
        </Button>

        { 
          <div className="flex items-center gap-4">

            <Button
              color="primary"
              radius="sm"
              type="submit"
              isDisabled={
                postType === "PUBLISHED" && isSubmitting ? true : false
              }
              isLoading={
                postType === "PUBLISHED" && isSubmitting ? true : false
              }
              onClick={() => setValue("postType", "PUBLISHED")}
            >
              {postType === "PUBLISHED" && isSubmitting
                ? "publishing..."
                : "Publish"}
            </Button>
          </div>
        }
      </nav>

      <div className="max-md:px-4 h-full overflow-y-auto">
        <div className="max-w-[650px] m-auto">
          <div className="flex gap-8 ">
            {!imageFile && (
              <input
                type="file"
                {...register("image")}
                onChange={handleImage}
              />
            )}
            {imageFile && (
              <figure className="relative w-full h-[300px] pt-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="absolute -top-2 -right-4 text-red-500 "
                  onClick={() => {
                    setImageFile(null), resetField("image");
                  }}
                >
                  <Icon name="x" />
                </Button>
                <Image
                  src={imageFile}
                  width={100}
                  height={100}
                  alt="post image"
                  className="w-full h-full object-cover"
                />
              </figure>
            )}
            {post && post.image !== null && !imageFile && (
              <Image
                src={post.image}
                alt={post.title}
                width={100}
                height={100}
              />
            )}
          </div>
          <TextareaAutosize
            {...register("title", { required: true })}
            aria-label="Post Title"
            placeholder="New post title here..."
            className="lg:text-5xl md:text-4xl text-3xl leading-tight resize-none w-full md:font-extrabold font-bold outline-none text-[rgb(68, 64, 60)]"
          />
          <Select
            items={categories}
            selectionMode="multiple"
            selectedKeys={selectedCategory}
            label="Category"
            placeholder="Select a category"
            className="max-w-xs mr-4  "
            // onChange={setSelectedCategory}
            onSelectionChange={setSelectedCategory} 
            >
              {(category:any) => <SelectItem value={category.id} key={category?.id}>{category?.name}</SelectItem>}
          </Select>
          <Select
            items={tags}
            selectionMode="multiple"
            selectedKeys={selectedTag}
            label="Tag"
            placeholder="Select a tag"
            className="max-w-xs"
            // onChange={setSelectedTag}
            onSelectionChange={setSelectedTag}
            >
              {(tag:any) => <SelectItem value={tag.id}  key={tag?.id}>{tag?.name}</SelectItem>}
          </Select>
        </div>
        <div id="editor" className="prose max-w-full" />
      </div>
    </form>
  );
};

export default Editor;

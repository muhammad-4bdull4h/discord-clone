"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import React, { useEffect, useState } from "react";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { getFileTypeFromHeaders } from "@/lib/getFileTypeFromHeaders";

function FileUpload({
  endpoint,
  value,
  onChange,
}: {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}) {
  const [fileType, setfileType] = useState("");
  useEffect(() => {
    console.log("File URL: ", value);
    (async () => {
      const fileType = await getFileTypeFromHeaders(value);
      console.log(fileType);

      setfileType(fileType!);
    })();
  }, [value]);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="upload"
          fill
          className="rounded-full border-black border-2"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute shadow-sm top-0 right-0 "
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    console.log(fileType);
    return (
      <div className="relative flex items-center p-2 m-2 rounded-md bg-background/10   ">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value.slice(0, Math.floor(value.length / 2))}...
          {/* {value} */}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute shadow-sm top-0 right-0 "
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}

export default FileUpload;

import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

function FileUpload({
  endpoint,
  value,
  onChange,
}: {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}) {
  const fileType = value?.split(".").pop();
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

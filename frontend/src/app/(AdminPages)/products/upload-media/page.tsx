"use client";

import GradientButton from "@/components/common/buttons/GradientButton";
import FileUploadField from "@/components/common/FileUploadField";
import TitleHeadings from "@/components/common/headings/TitleHeadings";
import { useAppDispatch } from "@/hooks/reduxHooks";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";


const fileSettings = {
    image: {
        acceptedTypes: ["image/png", "image/jpeg"],
        maxSizeInBytes: 2 * 1024 * 1024, // 2 MB
        errorMessage: "Only PNG, JPEG files under 2MB are allowed." 
    },
    model: {
        acceptedTypes: ["glb", "model/gltf-binary"],
        maxSizeInBytes: 10 * 1024 * 1024, // 10 MB
        errorMessage: "Only GLTF files under 10MB are allowed."
    }
}

function UploadMediaPage() {
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const mediaType = searchParams.get("mediaType") as "image" | "model";
  const { addMessage } = SnackBarActions;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: FurnitureItemsSvs.uploadMedia,
    onSettled(data) {
      dispatch(
        addMessage({
          message: data?.message ?? "",
          type: data?.error ? "error" : "success",
        })
      );
      setFiles([]);
    },
    onSuccess: () => {
      if(mediaType === "image") {
        router.push(`/products/upload-media?itemId=${itemId}&mediaType=model`);
      }
    }
  });

  if(mediaType !== "image" && mediaType !== "model") {
    return <p>Invalid media type</p>
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!itemId) {
      return;
    }

    mutate({files, itemId: parseInt(itemId), mediaType});
    
  }

  return (
    <div>
      {mediaType === "image" && <TitleHeadings>Upload Image</TitleHeadings>}
      {mediaType === "model" && <TitleHeadings>Upload 3D Model</TitleHeadings>}
      <form onSubmit={handleSubmit}>
        <FileUploadField
          files={files}
          setFiles={setFiles}
          acceptedTypes={fileSettings[mediaType].acceptedTypes}
          maxSizeInBytes={fileSettings[mediaType].maxSizeInBytes} // 2 MB
          multiple={true}
          onFilesSelected={(files) => console.log(files)}
          errorMessage={fileSettings[mediaType].errorMessage}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <GradientButton disabled={isPending} type="submit">Add Furniture</GradientButton>
        </div>
      </form>
    </div>
  );
}

export default UploadMediaPage;

"use client";

import GradientButton from "@/components/common/buttons/GradientButton";
import FileUploadField from "@/components/common/FileUploadField";
import TitleHeadings from "@/components/common/headings/TitleHeadings";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";


const fileSettings = {
    image: {
        acceptedTypes: ["image/png", "image/jpeg"],
        maxSizeInBytes: 2 * 1024 * 1024, // 2 MB
        errorMessage: "Only PNG, JPEG files under 2MB are allowed." 
    },
    model: {
        acceptedTypes: ["model/gltf+json", "model/gltf-binary"],
        maxSizeInBytes: 10 * 1024 * 1024, // 10 MB
        errorMessage: "Only GLTF files under 10MB are allowed."
    }

}

function UploadMediaPage() {
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const mediaType = searchParams.get("mediaType") as "image" | "model";

  if(mediaType !== "image" && mediaType !== "model") {
    return <p>Invalid media type</p>
  }

  return (
    <div>
      <h1>Upload Media</h1>
      <p>Item ID: {itemId}</p>
      <p>Media Type: {mediaType}</p>
      {mediaType === "image" && <TitleHeadings>Upload Image</TitleHeadings>}
      {mediaType === "model" && <TitleHeadings>Upload 3D Model</TitleHeadings>}
      <form>
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
          <GradientButton type="submit">Add Furniture</GradientButton>
        </div>
      </form>
    </div>
  );
}

export default UploadMediaPage;

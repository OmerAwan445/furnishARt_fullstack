import React, { useEffect, useState } from "react";
import { FileInput, Label } from "flowbite-react";

type FileUploadProps = {
  acceptedTypes: string[]; // List of accepted MIME types (e.g., ["image/png", "image/jpeg"])
  maxSizeInBytes: number; // Maximum file size in bytes
  multiple?: boolean; // Allow multiple files
  onFilesSelected: (files: File[]) => void; // Callback for selected files
  errorMessage?: string; // Custom error message
  files: File[]; // Files passed from the parent
  setFiles: React.Dispatch<React.SetStateAction<File[]>>; // Setter function for files state in parent
};

type PreviewFile = {
  file: File;
  previewUrl: string | null; // For image previews
};

const FileUploadField: React.FC<FileUploadProps> = ({
  acceptedTypes,
  maxSizeInBytes,
  multiple = false,
  onFilesSelected,
  errorMessage = "Invalid file type or size. Please check the requirements.",
  files,
  setFiles,
}) => {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const invalidFiles: File[] = [];
    const previews: PreviewFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (
        (acceptedTypes.includes(file.type) || (fileExtension && acceptedTypes.includes(fileExtension))) &&
        file.size <= maxSizeInBytes
      ) {
        validFiles.push(file);
        if (file.type.startsWith("image/")) {
          previews.push({
            file,
            previewUrl: URL.createObjectURL(file),
          });
        } else {
          previews.push({ file, previewUrl: null });
        }
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      alert(errorMessage);
    }

    if (validFiles.length > 0) {
      setFiles(validFiles); // Update files in parent state
      onFilesSelected(validFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  useEffect(() => {
    if (files.length === 0) {
      setPreviewFiles([]); // Clear previewFiles if all files are removed
      return;
    }

    const previews = files.map((file) =>
      file.type.startsWith("image/")
        ? { file, previewUrl: URL.createObjectURL(file) }
        : { file, previewUrl: null }
    );
    setPreviewFiles(previews);

    // Cleanup URLs to avoid memory leaks
    return () => {
      previews.forEach((preview) => {
        if (preview.previewUrl) URL.revokeObjectURL(preview.previewUrl);
      });
    };
  }, [files]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Accepted types: {acceptedTypes.join(", ")} (Max: {maxSizeInBytes / 1024 / 1024} MB)
          </p>
        </div>
        <FileInput
          id="dropzone-file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </Label>

      {/* Preview Section */}
      <div className="mt-4 grid grid-cols-2 gap-4 w-full">
        {previewFiles.map((preview, index) => (
          <div key={index} className="relative border rounded-md p-2">
            {preview.previewUrl ? (
              <img
                src={preview.previewUrl}
                alt={preview.file.name}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-32 bg-gray-200 text-gray-700">
                {preview.file.name}
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 p-0.5 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadField;

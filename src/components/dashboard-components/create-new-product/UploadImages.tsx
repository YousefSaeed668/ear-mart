import { formatFileSize } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Reorder, motion } from "framer-motion";

interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
}
interface UploadImagesProps {
  onOrderChange: (files: File[]) => void;
}
export function UploadImages({ onOrderChange }: UploadImagesProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  useEffect(() => {
    const orderedFiles = order
      .map((id) => files.find((f) => f.id === id)?.file)
      .filter((f): f is File => f !== undefined);
    onOrderChange(orderedFiles);
  }, [order, files, onOrderChange]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setOrder((prev) => [...prev, ...newFiles.map((f) => f.id)]);
  }, []);

  const removeFile = useCallback((idToRemove: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== idToRemove));
    setOrder((prev) => prev.filter((id) => id !== idToRemove));
  }, []);

  useEffect(() => {
    // Cleanup function to revoke object URLs
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  return (
    <div className="mt-10">
      <div
        {...getRootProps()}
        className="border-dashed border-4 flex items-center justify-center py-6 rounded-lg min-h-[112px]"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="text-textGrayColor text-lg font-normal text-center">
            Drop your files here, or{" "}
            <span className="text-primaryColor">click to browse</span>
            <br /> 1200 x 1600 (3:4) recommended
          </p>
        )}
      </div>
      <aside className="mt-6">
        <h4 className="font-semibold">Uploads</h4>
        <p className="text-textGrayColor">
          First Image Will Be The Product Thumbnail{" "}
        </p>
        <Reorder.Group
          axis="y"
          values={order}
          onReorder={setOrder}
          className="flex flex-col gap-4 mt-6"
        >
          {order.map((id) => {
            const file = files.find((f) => f.id === id);
            if (!file) return null;
            return (
              <Reorder.Item
                key={id}
                value={id}
                className="flex items-center gap-2"
              >
                <GripVertical className="cursor-move" />
                <motion.div layoutId={`image-${id}`}>
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    className="object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                </motion.div>
                <div className="flex flex-col gap-1 flex-grow">
                  <span className="text-sm font-semibold">
                    {file.file.name}
                  </span>
                  <span className="text-textGrayColor">
                    {formatFileSize(file.file.size)}
                  </span>
                </div>
                <X
                  className="h-4 w-4 text-textGrayColor cursor-pointer"
                  onClick={() => removeFile(id)}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </aside>
    </div>
  );
}

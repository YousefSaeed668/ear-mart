import { formatFileSize } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Reorder, motion } from "framer-motion";

interface FileWithPreview {
  id: string;
  file: File | string;
  preview: string;
}

interface UploadImagesProps {
  onOrderChange: (files: (File | string)[]) => void;
  error?: string;
  defaultImages?: string[];
}

export function UploadImages({
  onOrderChange,
  error,
  defaultImages = [],
}: UploadImagesProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [order, setOrder] = useState<string[]>([]);

  const isDefaultImagesInitialized = useRef(false);

  useEffect(() => {
    if (!isDefaultImagesInitialized.current) {
      const defaultFileItems = defaultImages.map((url) => ({
        id: Math.random().toString(36).substr(2, 9),
        file: url,
        preview: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      }));
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        defaultFileItems.forEach((item) => {
          if (!newFiles.some((f) => f.file === item.file)) {
            newFiles.push(item);
          }
        });
        return newFiles;
      });
      setOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        defaultFileItems.forEach((item) => {
          if (!newOrder.includes(item.id)) {
            newOrder.push(item.id);
          }
        });
        return newOrder;
      });

      isDefaultImagesInitialized.current = true;
    }
  }, [defaultImages]);

  useEffect(() => {
    const orderedFiles = order
      .map((id) => files.find((f) => f.id === id)?.file)
      .filter((f): f is File | string => f !== undefined);
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
    return () => {
      files.forEach((file) => {
        if (file.file instanceof File) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
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
      {error && (
        <div
          className="bg-red-100 mb-10 border border-red-400 text-red-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold">{error}</strong>
        </div>
      )}
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
      {files.length > 0 && (
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
                      alt={
                        file.file instanceof File
                          ? file.file.name
                          : "Uploaded image"
                      }
                      className="object-cover rounded-lg"
                      width={file.file instanceof File ? 64 : 400}
                      height={file.file instanceof File ? 64 : 400}
                      style={{ width: "64px", height: "64px" }}
                    />
                  </motion.div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <span className="text-sm font-semibold">
                      {file.file instanceof File
                        ? file.file.name
                        : "Uploaded image"}
                    </span>
                    <span className="text-textGrayColor">
                      {file.file instanceof File
                        ? formatFileSize(file.file.size)
                        : ""}
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
      )}
    </div>
  );
}

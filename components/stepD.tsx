"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

interface FileObject {
  file: File;
  name: string;
  preview: string;
}

interface FileUploadProps {
  onUpload: () => void;
}

export const StepD = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [percent, setPercent] = useState<number>(0);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
          })),
        ]);
      }
    },
    []
  );

  async function arrayBufferToBlob(
    arrayBufferPromise: Promise<ArrayBuffer>,
    mimeType = "application/json"
  ): Promise<Blob> {
    const arrayBuffer = await arrayBufferPromise;
    return new Blob([arrayBuffer], { type: mimeType });
  }

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    //On submit handle logic
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <main className="light text-foreground bg-background h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center h-auto">
          <div className="max-w-3xl w-full p-6">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <label className="flex justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></svg>
                  <span className="font-medium text-gray-600 text-lg flex items-center justify-center">
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag and drop some files here, or{" "}
                        <span className="text-blue-600 underline">
                          click to select files
                        </span>
                      </p>
                    )}
                  </span>
                </span>
              </label>
            </div>

            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
              Accepted Files
            </h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-10">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-32 rounded-md shadow-lg pt-5 pl-5"
                >
                  <button
                    type="button"
                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => removeFile(file.name)}
                  ></button>
                  <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>
            <div>
              <button
                type="submit"
                className="ml-auto mt-4 text-[16px] uppercase tracking-wider font-bold text-white bg-blue-800 border border-blue-800 rounded-lg px-4 py-2 hover:bg-blue-900 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

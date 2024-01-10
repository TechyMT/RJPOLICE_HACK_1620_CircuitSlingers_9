"use client";
import { Button, Spinner } from "@nextui-org/react";
import React, { useState, ChangeEvent, DragEvent } from "react";
import useAuthStore from "../../utils/auth";

interface EvidenceBoxProps {
  onChange: (key: string, value: any) => void;
  formData: any;
  handleClick: any;
  loading: boolean;
}

const EvidenceBox: React.FC<EvidenceBoxProps> = ({
  formData,
  onChange,
  handleClick,
  loading,
}) => {
  const user = useAuthStore((state) => state.user);
  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    formData.evidencesList || []
  );

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    // Merge the new files with the existing ones
    onChange("evidencesList", [...selectedFiles, ...Array.from(files)]);
    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const preventDefault = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-[80vw] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#f1f1ff] dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-[#c9c9ff] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 "
        onDrop={handleDrop}
        onDragOver={preventDefault}
      >
        <div>Enter Evidence(s) if there are any!</div>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 "
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
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
            <span className="font-semibold ">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 ">
            SVG, PNG, JPG, or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          multiple // Allow multiple file selection
        />
        {selectedFiles.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </label>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            handleClick(selectedFiles);
          }}
          className="px-4 py-2 mt-5 font-medium focus:outline-none"
          color="primary"
        >
          {loading ? <Spinner size="sm" color="white"  /> : "Upload"}
        </Button>
      </div>
    </>
  );
};

export default EvidenceBox;

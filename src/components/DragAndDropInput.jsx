import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cloud from '../assets/cloud-image.svg';

const DragAndDropInput = ({ onDropFiles }) => {
    const [previews, setPreviews] = useState([]);

    const uploadToCloudinary = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ticket_image"); // Replace with your Cloudinary upload preset
    
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dcqzmbsuq/image/upload", // Replace with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );
    
        const data = await response.json();
        localStorage.setItem("profileImage", data.secure_url); // Move this after fetching
    
        return data.secure_url; // Cloudinary URL of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    };
  
    const onDrop = useCallback(
      async (acceptedFiles) => {
        const uploadedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const cloudinaryUrl = await uploadToCloudinary(file);
            return {
              preview: URL.createObjectURL(file),
              cloudinaryUrl,
            };
          })
        );
  
        setPreviews((prev) => [...prev, ...uploadedFiles]);
  
        // Pass uploaded Cloudinary URLs to the parent component
        onDropFiles(uploadedFiles.map((file) => file.cloudinaryUrl));
      },
      [onDropFiles]
    );
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
      });

  return (
    <>
    <div className={`flex flex-col justify-center items-center space-y-3 p-5 cursor-pointer ${previews.length > 0 ? "hidden" : "block"}`} {...getRootProps()}>
        <input {...getInputProps()} />
        <img src={cloud} alt="cloud-download-image" className='md:w-6' />
        <p className='text-center text-xs roboto font-extralight'>Drag & drop or click to upload</p>
    </div>

    {previews.length > 0 && (
        <div className="">
          {previews.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt="Preview"
                className="md:w-40 md:h-40 object-cover rounded-lg "
              />

              {file.cloudinaryUrl && (
                <p className="text-xs text-gray-500 break-all">
                  {file.cloudinaryUrl}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DragAndDropInput
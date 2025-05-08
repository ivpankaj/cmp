/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from "react";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import { FaFileUpload, FaFilePdf, FaDownload, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { jsPDF } from "jspdf";

const ImageToPdfPage = () => {
  interface SelectedImage {
    file: File;
    preview: string | ArrayBuffer | null;
    name: string;
  }
  
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setError(null);
    setPdfUrl(null);

    // Clear the file input value to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({
          file: file,
          preview: reader.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      setError("Please select a valid image file.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const convertToPdf = () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setIsConverting(true);
    
    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px"
      });
      
      // Create an image element to get dimensions
      const img = new Image();
      img.src = typeof selectedImage.preview === 'string' ? selectedImage.preview : '';
      
      img.onload = () => {
        // Calculate dimensions to fit on A4
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // Scale image to fit page width while maintaining aspect ratio
        let finalWidth = pageWidth - 40; // 20px margin on each side
        let finalHeight = (imgHeight * finalWidth) / imgWidth;
        
        // If height exceeds page height, scale based on height instead
        if (finalHeight > pageHeight - 40) {
          finalHeight = pageHeight - 40;
          finalWidth = (imgWidth * finalHeight) / imgHeight;
        }
        
        // Center the image on the page
        const xPos = (pageWidth - finalWidth) / 2;
        const yPos = (pageHeight - finalHeight) / 2;
        
        // Add the image to the PDF
        pdf.addImage(
          typeof selectedImage.preview === 'string' ? selectedImage.preview : '',
          "JPEG",
          xPos,
          yPos,
          finalWidth,
          finalHeight
        );
        
        // Generate PDF blob URL
        const pdfBlob = pdf.output("blob");
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setIsConverting(false);
      };
    } catch (err) {
      console.error("Error converting to PDF:", err);
      setError("Failed to convert image to PDF. Please try again.");
      setIsConverting(false);
    }
  };


  return (
    <>
      <HeroSection
        title={["Image.", "to PDF."]}
        subtitle="Convert any image to PDF format with just a few clicks. Easy, fast, and completely free."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our image to PDF converter tool allows you to quickly transform your images into 
              professional-looking PDF documents for easy sharing, printing, and storage. 
              The entire process happens in your browser — no data is uploaded to any server.
            </p>
          </section>

          {/* Upload Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <div className={`p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 flex flex-col items-center justify-center`}>
                {!selectedImage ? (
                  <div 
                    onClick={triggerFileInput}
                    className="w-full py-16 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors duration-300"
                  >
                    <FaFileUpload size={48} className="text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-2">Click or drag image here to upload</p>
                    <p className="text-gray-500 text-sm">Supports JPG, PNG, GIF, WEBP</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FaFilePdf size={24} className="text-green-500 mr-2" />
                        <span className="text-gray-300 text-lg truncate max-w-xs">
                          {selectedImage.name}
                        </span>
                      </div>
                      <button
                        onClick={triggerFileInput}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        Change
                      </button>
                    </div>
                    <div className="relative rounded-lg overflow-hidden mb-6">
                      <img
                        src={typeof selectedImage.preview === 'string' ? selectedImage.preview : undefined}
                        alt="Preview"
                        className="w-full max-h-96 object-contain bg-gray-900 p-2 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 text-red-500 text-center">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
                  <button
                    onClick={convertToPdf}
                    disabled={!selectedImage || isConverting}
                    className={`flex-1 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      !selectedImage || isConverting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isConverting ? (
                      "Converting..."
                    ) : (
                      <>
                        Convert to PDF <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  {pdfUrl && (
                    <a
                      href={pdfUrl}
                      download={`${selectedImage?.name.split('.')[0]}.pdf`}
                      className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      Download PDF <FaDownload className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Upload Image</h3>
                <p className="text-gray-400">Select any image from your device that you want to convert to PDF format.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Convert</h3>
                <p className="text-gray-400">Click the convert button and our tool will transform your image into a professional PDF document.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Download</h3>
                <p className="text-gray-400">Download your new PDF file instantly and use it for whatever you need.</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {["Fast Conversion", "100% Private", "High Quality", "Free to Use"].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle size={24} className="text-white" />
                  </div>
                  <p className="text-lg font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Need Help?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              If you have any questions about our image to PDF converter or need assistance with other digital tools, we&lsquo;re here to help!
            </p>
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Contact Support <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default ImageToPdfPage;
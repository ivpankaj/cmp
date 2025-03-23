/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import { FaFileUpload, FaFilePdf, FaDownload, FaArrowRight, FaTrash, FaPlus, FaCheckCircle } from "react-icons/fa";
import { PDFDocument } from 'pdf-lib';

const PdfCombinerPage = () => {
  interface PdfFile {
    file: File;
    name: string;
    size: string;
    arrayBuffer: ArrayBuffer;
  }
  
  const [selectedPdfs, setSelectedPdfs] = useState<PdfFile[]>([]);
  const [combinedPdfUrl, setCombinedPdfUrl] = useState<string | null>(null);
  const [isCombining, setIsCombining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePdfUpload = async (event:any) => {
    const files = Array.from(event.target.files);
    setError(null);
    setCombinedPdfUrl(null);
    
    if (files.length === 0) return;
    
    const newPdfs: PdfFile[] = [];
    const invalidFiles = [];

    for (const file of files) {
      const pdfFile = file as File;
      if (pdfFile.type === 'application/pdf') {
        try {
          // Read the PDF file as an ArrayBuffer
          const arrayBuffer = await (file as File).arrayBuffer();
          
          // Create a preview (first page thumbnail) could be implemented here
          // For simplicity, we'll just store the file information
          newPdfs.push({
            file: file as File,
            name: (file as File).name,
            size: formatFileSize((file as File).size),
            arrayBuffer: arrayBuffer
          });
        } catch (err) {
          console.error("Error reading PDF:", err);
          invalidFiles.push((file as File).name);
        }
      } else {
        invalidFiles.push((file as File).name);
      }
    }

    if (invalidFiles.length > 0) {
      setError(`Some files were not valid PDFs: ${invalidFiles.join(', ')}`);
    }

    if (newPdfs.length > 0) {
      setSelectedPdfs(prev => [...prev, ...newPdfs]);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes:any) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removePdf = (index:any) => {
    setSelectedPdfs(prev => prev.filter((_, i) => i !== index));
    setCombinedPdfUrl(null);
  };

  const combinePdfs = async () => {
    if (selectedPdfs.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }

    if (selectedPdfs.length === 1) {
      setError("Please select at least two PDF files to combine.");
      return;
    }

    setIsCombining(true);
    setError(null);
    
    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      
      // Loop through each selected PDF
      for (const pdfData of selectedPdfs) {
        try {
          // Load the PDF document
          const pdf = await PDFDocument.load(pdfData.arrayBuffer);
          
          // Copy all pages from the source document to the merged document
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
          });
        } catch (err) {
          console.error(`Error processing ${pdfData.name}:`, err);
          setError(`Error processing ${pdfData.name}. The file might be corrupted or password-protected.`);
          setIsCombining(false);
          return;
        }
      }
      
      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();
      
      // Create a Blob from the PDF bytes
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      
      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      setCombinedPdfUrl(url);
    } catch (err) {
      console.error("Error combining PDFs:", err);
      setError("Failed to combine PDFs. Please try again.");
    } finally {
      setIsCombining(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetAll = () => {
    setSelectedPdfs([]);
    setCombinedPdfUrl(null);
    setError(null);
  };

  return (
    <>
      <HeroSection
        title={["PDF.", "Combiner."]}
        subtitle="Merge multiple PDF files into a single document with just a few clicks. Simple, fast, and secure."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our PDF combiner tool allows you to easily merge multiple PDF files into a single document.
              Perfect for creating comprehensive reports, combining scanned documents, or organizing your digital paperwork.
              All processing happens in your browser — your files never leave your device.
            </p>
          </section>

          {/* Upload Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 flex flex-col items-center justify-center">
                
                {/* Upload Area */}
                <div 
                  onClick={triggerFileInput}
                  className="w-full py-8 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors duration-300 mb-6"
                >
                  <FaFileUpload size={36} className="text-gray-400 mb-3" />
                  <p className="text-gray-400 mb-2">Click to upload PDF files</p>
                  <p className="text-gray-500 text-sm">Or drag and drop PDFs here</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePdfUpload}
                    accept="application/pdf"
                    multiple
                    className="hidden"
                  />
                </div>

                {/* Selected PDFs List */}
                {selectedPdfs.length > 0 && (
                  <div className="w-full mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium">Selected PDFs ({selectedPdfs.length})</h3>
                      <button
                        onClick={resetAll}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto border border-gray-700 rounded-lg bg-gray-900/50">
                      {selectedPdfs.map((pdf, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0"
                        >
                          <div className="flex items-center">
                            <FaFilePdf size={20} className="text-red-500 mr-3" />
                            <div>
                              <p className="text-gray-300 font-medium truncate max-w-xs">{pdf.name}</p>
                              <p className="text-gray-500 text-xs">{pdf.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removePdf(index)}
                            className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                            aria-label={`Remove ${pdf.name}`}
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                      <button
                        onClick={triggerFileInput}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaPlus size={14} className="mr-2" />
                        Add More PDFs
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="w-full mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-center">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
                  <button
                    onClick={combinePdfs}
                    disabled={selectedPdfs.length < 2 || isCombining}
                    className={`flex-1 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      selectedPdfs.length < 2 || isCombining ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isCombining ? (
                      "Combining PDFs..."
                    ) : (
                      <>
                        Combine PDFs <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  {combinedPdfUrl && (
                    <a
                      href={combinedPdfUrl}
                      download="combined_document.pdf"
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
                <h3 className="text-xl font-bold mb-2">Upload PDFs</h3>
                <p className="text-gray-400">Select multiple PDF files from your device that you want to combine.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Arrange Order</h3>
                <p className="text-gray-400">The PDFs will be combined in the order they appear in the list.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Download</h3>
                <p className="text-gray-400">Click combine, then download your new merged PDF file.</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Browser-Based Processing", 
                "Unlimited Combinations", 
                "Maintains PDF Quality", 
                "100% Secure & Private"
              ].map((feature, index) => (
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
              If you have any questions about our PDF combiner or need assistance with other document tools, we&lsquo;re here to help!
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

export default PdfCombinerPage;
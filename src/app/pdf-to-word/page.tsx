/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from "react";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import { FaFileUpload, FaFilePdf, FaFileWord, FaDownload, FaArrowRight, FaCheckCircle, } from "react-icons/fa";

const PdfToWordPage = () => {
  interface SelectedFile {
    file: File;
    preview: string;
    name: string;
    size: string;
  }
  
  const [selectedPdf, setSelectedPdf] = useState<SelectedFile | null>(null);
  const [wordFileUrl, setWordFileUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setWordFileUrl(null);
    setConversionProgress(0);

    // Clear the file input value to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (file && file.type === "application/pdf") {
      // Format file size
      const sizeInKB = file.size / 1024;
      const sizeInMB = sizeInKB / 1024;
      const formattedSize = sizeInMB >= 1 
        ? `${sizeInMB.toFixed(2)} MB` 
        : `${sizeInKB.toFixed(2)} KB`;

      // Create PDF thumbnail preview
      const fileURL = URL.createObjectURL(file);
      
      setSelectedPdf({
        file: file,
        preview: fileURL,
        name: file.name,
        size: formattedSize
      });
    } else if (file) {
      setError("Please select a valid PDF file.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const convertToWord = () => {
    if (!selectedPdf) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    
    // Simulate conversion process with progress updates
    const totalSteps = 10;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.floor((currentStep / totalSteps) * 100);
      setConversionProgress(progress);
      
      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        finishConversion();
      }
    }, 300);
    
    // This is where you would actually implement the PDF to Word conversion
    // For demonstration, we're just simulating it
  };
  
  const finishConversion = () => {
    try {
      // In a real implementation, this would be the result of actual conversion
      // Here we're just creating a mock Word document URL
      
      // For demo purposes, we'll create a simple Blob to simulate a Word file
      const mockWordContent = `This is a simulated Word document converted from ${selectedPdf?.name}`;
      const wordBlob = new Blob([mockWordContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const wordUrl = URL.createObjectURL(wordBlob);
      
      setWordFileUrl(wordUrl);
      setIsConverting(false);
    } catch (err) {
      console.error("Error converting to Word:", err);
      setError("Failed to convert PDF to Word. Please try again.");
      setIsConverting(false);
    }
  };

  return (
    <>
      <HeroSection
        title={["PDF.", "to Word."]}
        subtitle="Convert PDF documents to editable Word format with just a few clicks. Easy, fast, and completely free."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our PDF to Word converter tool allows you to quickly transform your PDF documents into 
              editable Microsoft Word files for easy editing, reformatting, and content extraction. 
              The entire process happens in your browser — no data is uploaded to any server.
            </p>
          </section>

          {/* Upload Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <div className={`p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 flex flex-col items-center justify-center`}>
                {!selectedPdf ? (
                  <div 
                    onClick={triggerFileInput}
                    className="w-full py-16 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors duration-300"
                  >
                    <FaFileUpload size={48} className="text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-2">Click or drag PDF file here to upload</p>
                    <p className="text-gray-500 text-sm">Maximum file size: 100MB</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePdfUpload}
                      accept="application/pdf"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FaFilePdf size={24} className="text-red-500 mr-2" />
                        <div className="flex flex-col">
                          <span className="text-gray-300 text-lg truncate max-w-xs">
                            {selectedPdf.name}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {selectedPdf.size}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={triggerFileInput}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        Change
                      </button>
                    </div>
                    
                    {/* PDF Preview (this would be a thumbnail in real implementation) */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative w-32 h-40 bg-gray-800 rounded-md overflow-hidden border border-gray-700 flex items-center justify-center">
                        <FaFilePdf size={48} className="text-red-500" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-1 px-2 text-xs text-center">
                          PDF Preview
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 text-red-500 text-center">
                    {error}
                  </div>
                )}

                {isConverting && (
                  <div className="w-full mt-6">
                    <div className="flex justify-between mb-2">
                      <span>Converting...</span>
                      <span>{conversionProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${conversionProgress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-gray-400 text-sm text-center">
                      {conversionProgress < 30 && "Parsing PDF structure..."}
                      {conversionProgress >= 30 && conversionProgress < 60 && "Extracting text and formatting..."}
                      {conversionProgress >= 60 && conversionProgress < 90 && "Creating Word document..."}
                      {conversionProgress >= 90 && "Finalizing conversion..."}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
                  <button
                    onClick={convertToWord}
                    disabled={!selectedPdf || isConverting}
                    className={`flex-1 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      !selectedPdf || isConverting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isConverting ? (
                      "Converting..."
                    ) : (
                      <>
                        Convert to Word <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  {wordFileUrl && (
                    <a
                      href={wordFileUrl}
                      download={`${selectedPdf?.name.split('.')[0]}.docx`}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      Download Word <FaDownload className="ml-2" />
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
                <h3 className="text-xl font-bold mb-2">Upload PDF</h3>
                <p className="text-gray-400">Select any PDF document from your device that you want to convert to Word format.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Convert</h3>
                <p className="text-gray-400">Click the convert button and our tool will transform your PDF into an editable Word document.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Download</h3>
                <p className="text-gray-400">Download your new Word file instantly and start editing your content.</p>
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
                "Maintains Formatting", 
                "Preserves Tables", 
                "Extracts Images", 
                "100% Private"
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

          {/* Conversion Comparison */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              What Gets Converted
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaFilePdf className="text-red-500 mr-2" /> PDF Elements
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Text content and paragraphs</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Basic formatting (bold, italic, underline)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Tables and columns</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Embedded images</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Headers and footers</p>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaFileWord className="text-blue-500 mr-2" /> Word Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Edit text and content</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Restructure document layout</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Apply new styles and formatting</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Extract and modify tables</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <p className="ml-3 text-gray-300">Add comments and track changes</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Need More Tools?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Try our other document conversion tools including Word to PDF, PDF to Excel, and more!
            </p>
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Explore More Tools <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default PdfToWordPage;
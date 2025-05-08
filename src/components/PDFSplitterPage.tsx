/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import React, { useState, useRef } from "react";
import { FaCheckCircle, FaArrowRight, FaFilePdf, FaUpload, FaDownload } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const PDFSplitterPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [splitMethod, setSplitMethod] = useState("range");
  const [pageRanges, setPageRanges] = useState("");
  const [splitEvery, setSplitEvery] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitComplete, setSplitComplete] = useState(false);
  const [splitResults, setSplitResults] = useState<{ id: number; name: string; pages: string; size: string; }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // In a real implementation, you would use a PDF library to get the total pages
      // For this mockup, we'll simulate a random page count
      setTotalPages(Math.floor(Math.random() * 20) + 5);
      setSplitComplete(false);
      setSplitResults([]);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleSplitPDF = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Create mock results based on the selected split method
      const results = [];
      
      if (splitMethod === "range") {
        // Parse page ranges and create result files
        const ranges = pageRanges.split(",").map(range => range.trim());
        ranges.forEach((range, index) => {
          let rangeName = range;
          if (range.includes("-")) {
            rangeName = `pages_${range.replace("-", "to")}`;
          } else {
            rangeName = `page_${range}`;
          }
          
          results.push({
            id: index + 1,
            name: `${fileName.replace(".pdf", "")}_${rangeName}.pdf`,
            pages: range,
            size: `${Math.floor(Math.random() * 500) + 100}KB`
          });
        });
      } else if (splitMethod === "every") {
        // Split every N pages
        const numberOfFiles = Math.ceil(totalPages / splitEvery);
        for (let i = 0; i < numberOfFiles; i++) {
          const startPage = i * splitEvery + 1;
          const endPage = Math.min((i + 1) * splitEvery, totalPages);
          results.push({
            id: i + 1,
            name: `${fileName.replace(".pdf", "")}_${startPage}to${endPage}.pdf`,
            pages: `${startPage}-${endPage}`,
            size: `${Math.floor(Math.random() * 500) + 100}KB`
          });
        }
      }
      
      setSplitResults(results);
      setIsProcessing(false);
      setSplitComplete(true);
    }, 2000);
  };

  // New function to handle single file download
  const handleDownloadFile = (fileName: string) => {
    // In a real implementation, you would generate or fetch the PDF file
    // For this mockup, we'll simulate a download by creating a blank PDF
    console.log(`Downloading file: ${fileName}`);
    
    // Create a dummy blob to simulate a PDF file
    const blob = new Blob(['%PDF-1.5 (dummy content)'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  };

  // New function to handle downloading all files
  const handleDownloadAllFiles = () => {
    console.log('Downloading all files');
    
    // In a real implementation, you would create a zip file with all PDFs
    // For this mockup, we'll just call the single download function for each file with a delay
    splitResults.forEach((result, index) => {
      setTimeout(() => {
        handleDownloadFile(result.name);
      }, index * 500); // Stagger downloads 500ms apart to make it clear they're happening
    });
  };

  const resetForm = () => {
    setFile(null);
    setFileName("");
    setTotalPages(0);
    setPageRanges("");
    setSplitEvery(1);
    setSplitComplete(false);
    setSplitResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const features = [
    "Split by page ranges (e.g., 1-3, 5, 7-10)",
    "Split into equal parts",
    "Extract specific pages",
    "Batch processing for multiple PDFs",
    "Preserve document quality"
  ];

  return (
    <>
      <HeroSection
        title={["PDF.", "Splitter."]}
        subtitle="Divide your PDF documents with precision and ease. Extract pages, split by ranges, or create multiple documents in seconds."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our PDF Splitter tool allows you to divide large PDF documents into smaller, more manageable files.
              Extract specific pages or split by custom ranges to organize your documents exactly how you need them.
            </p>
          </section>

          {/* PDF Splitter Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-center">PDF Splitter</h2>
              
              {!splitComplete ? (
                <>
                  {/* Step 1: Upload PDF */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Step 1: Upload Your PDF</h3>
                    <div 
                      className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-white/50 transition-all"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {!file ? (
                        <div>
                          <FaUpload size={40} className="mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-400 mb-2">Click or drag and drop to upload your PDF</p>
                          <p className="text-gray-500 text-sm">Maximum file size: 50MB</p>
                        </div>
                      ) : (
                        <div>
                          <FaFilePdf size={40} className="mx-auto mb-4 text-red-500" />
                          <p className="text-white font-medium mb-1">{fileName}</p>
                          <p className="text-gray-400 text-sm">Total Pages: {totalPages}</p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              resetForm();
                            }}
                            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
                          >
                            Change File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Choose Split Method */}
                  {file && (
                    <div className="mb-8">
                      <h3 className="text-xl font-medium mb-4">Step 2: Choose Split Method</h3>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <div className="flex items-center mb-3">
                            <input
                              type="radio"
                              id="splitByRange"
                              name="splitMethod"
                              value="range"
                              checked={splitMethod === "range"}
                              onChange={() => setSplitMethod("range")}
                              className="mr-2 h-4 w-4"
                            />
                            <label htmlFor="splitByRange" className="text-white">Split by Page Ranges</label>
                          </div>
                          
                          {splitMethod === "range" && (
                            <div className="ml-6 mb-4">
                              <input
                                type="text"
                                value={pageRanges}
                                onChange={(e) => setPageRanges(e.target.value)}
                                placeholder="e.g., 1-3, 5, 7-10"
                                className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white"
                              />
                              <p className="text-gray-400 text-sm mt-2">
                                Separate ranges with commas. Example: 1-3, 5, 7-10
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center mb-3">
                            <input
                              type="radio"
                              id="splitEvery"
                              name="splitMethod"
                              value="every"
                              checked={splitMethod === "every"}
                              onChange={() => setSplitMethod("every")}
                              className="mr-2 h-4 w-4"
                            />
                            <label htmlFor="splitEvery" className="text-white">Split Every N Pages</label>
                          </div>
                          
                          {splitMethod === "every" && (
                            <div className="ml-6 flex items-center">
                              <span className="text-gray-400 mr-3">Split every</span>
                              <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={splitEvery}
                                onChange={(e) => setSplitEvery(parseInt(e.target.value) || 1)}
                                className="w-16 p-2 bg-black/50 border border-white/20 rounded-lg text-white text-center"
                              />
                              <span className="text-gray-400 ml-3">pages</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Split Button */}
                  {file && (
                    <div className="text-center">
                      <button
                        onClick={handleSplitPDF}
                        disabled={isProcessing || (splitMethod === "range" && !pageRanges)}
                        className={`px-8 py-4 font-medium rounded-full transform hover:scale-105 transition-all duration-300 ${
                          isProcessing || (splitMethod === "range" && !pageRanges)
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200"
                        }`}
                      >
                        {isProcessing ? (
                          <span>Processing...</span>
                        ) : (
                          <span>Split PDF <FaScissors className="inline ml-2" /></span>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Results Section */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-medium">Split Complete</h3>
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
                      >
                        Split Another PDF
                      </button>
                    </div>
                    
                    <div className="border border-white/20 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-white/10">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Filename</th>
                            <th className="p-3 text-left">Pages</th>
                            <th className="p-3 text-left">Size</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {splitResults.map((result) => (
                            <tr key={result.id} className="border-t border-white/10 hover:bg-white/5">
                              <td className="p-3">{result.id}</td>
                              <td className="p-3">{result.name}</td>
                              <td className="p-3">{result.pages}</td>
                              <td className="p-3">{result.size}</td>
                              <td className="p-3 text-right">
                                <button 
                                  onClick={() => handleDownloadFile(result.name)}
                                  className="text-green-400 hover:text-green-300 transition-colors"
                                  title={`Download ${result.name}`}
                                >
                                  <FaDownload size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button 
                        onClick={handleDownloadAllFiles}
                        className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
                      >
                        Download All Files <FaDownload className="inline ml-2" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <FaCheckCircle
                    size={24}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <p className="text-gray-400 mt-2">{feature}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Common Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Business Documents</span>
                  Extract specific sections from large reports or presentations to share with clients or team members. Split financial statements, contracts, or proposals to focus on relevant information.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Academic Papers</span>
                  Separate chapters, literature reviews, or methodology sections from research papers. Create focused study materials by extracting specific pages from textbooks or course materials.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Legal Documents</span>
                  Extract specific sections from legal agreements or court documents. Split case files into manageable parts for easier review and sharing with relevant parties.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Personal Documents</span>
                  Split scanned books into chapters for easier digital reading. Extract specific pages from manuals, guides, or personal records for reference or sharing.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Start Splitting PDFs Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Organize your documents, extract important information, and share only what matters with our powerful PDF splitting tool.
            </p>
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
            >
              Upload Your First PDF <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default PDFSplitterPage;
"use client";
import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import dynamic from "next/dynamic";

// Load PDF.js worker dynamically
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToWordPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      extractTextFromPDF(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      if (!reader.result) return;

      const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }

      setTextContent(extractedText);
    };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">PDF to Word Converter</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <textarea
        className="w-full h-64 p-4 bg-gray-900 text-white border border-gray-700 rounded"
        value={textContent}
        readOnly
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(PdfToWordPage), { ssr: false });

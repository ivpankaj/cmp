"use client";
import BackgroundEffect from "@/components/Background";
import MainHeading from "@/mini component/Main_Heading";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const ToolPage = () => {
  const tools = [
    {
      category: "Tech Tools",
      items: [
        { id: 1, name: "Convert PDF to Word", description: "Easily convert PDF files into editable Word documents.", icon: "📄", path: "/pdf-to-word" },
        { id: 2, name: "Image to PDF", description: "Combine multiple images into a single PDF file.", icon: "🖼️", path: "/image-to-pdf" },
        { id: 3, name: "Merge PDFs", description: "Merge multiple PDF files into one document.", icon: "📚", path: "/combine-pdf" },
        { id: 4, name: "Split PDF", description: "Split a PDF file into smaller parts.", icon: "✂️", path: "/split-pdf" },
      ],
    },
    {
      category: "Text Tools",
      items: [
        { id: 5, name: "Check ATS Score", description: "Evaluate your resume's compatibility with Applicant Tracking Systems.", icon: "📋", path: "/ats-checker" },
        { id: 6, name: "Word Counter", description: "Count words, characters, and paragraphs in your text.", icon: "📝", path: "/tools/word-counter" },
        { id: 7, name: "Case Converter", description: "Convert text between uppercase, lowercase, and title case.", icon: "🔤", path: "/tools/case-converter" },
        { id: 8, name: "Remove Extra Spaces", description: "Clean up unnecessary spaces in your text.", icon: "🧹", path: "/tools/remove-spaces" },
      ],
    },
    {
      category: "Image Tools",
      items: [
        { id: 9, name: "Compress Images", description: "Reduce image file size without losing quality.", icon: "📸", path: "/tools/compress-images" },
        { id: 10, name: "Resize Images", description: "Adjust image dimensions for web or print.", icon: "📏", path: "/tools/resize-images" },
        { id: 11, name: "Convert Image Formats", description: "Change image formats like PNG, JPEG, and SVG.", icon: "🔄", path: "/tools/convert-image-formats" },
        { id: 12, name: "Add Watermark", description: "Protect your images by adding custom watermarks.", icon: "💧", path: "/tools/add-watermark" },
      ],
    },
    {
      category: "Code Tools",
      items: [
        { id: 13, name: "Minify Code", description: "Optimize your JavaScript, CSS, or HTML code.", icon: "⚙️", path: "/tools/minify-code" },
        { id: 14, name: "JSON Formatter", description: "Format and validate JSON data for readability.", icon: "📦", path: "/tools/json-formatter" },
        { id: 15, name: "Regex Tester", description: "Test and debug regular expressions online.", icon: "🔍", path: "/tools/regex-tester" },
        { id: 16, name: "Base64 Encoder/Decoder", description: "Encode or decode data using Base64.", icon: "🔒", path: "/tools/base64" },
      ],
    },
    {
      category: "Miscellaneous Tools",
      items: [
        { id: 17, name: "QR Code Generator", description: "Create QR codes for URLs, text, or contact info.", icon: "📱", path: "/qr-generator" },
        { id: 18, name: "Password Generator", description: "Generate strong and secure passwords.", icon: "🔑", path: "/password-generate" },
        { id: 19, name: "Unit Converter", description: "Convert units like length, weight, and temperature.", icon: "⚖️", path: "/tools/unit-converter" },
        { id: 20, name: "Color Picker", description: "Pick colors and get their HEX, RGB, or HSL values.", icon: "🎨", path: "/tools/color-picker" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
      <BackgroundEffect />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MainHeading mainText="Explore tools"/>

        {/* Section 2: Tool Categories */}
        {tools.map((category) => (
          <section key={category.category} className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((tool) => (
                <div
                  key={tool.id}
                  className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl text-center mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-400">{tool.description}</p>
                  <Link href={tool.path}>
                    <button className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                      Use Tool <FaArrowRight className="inline ml-2" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Section 3: Call to Action */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6">Need More Tools?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We&apos;re constantly adding new tools to help you work smarter. Stay tuned for updates!
          </p>
          <Link href="/coming-soon">
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Stay Tuned for more <FaArrowRight className="inline ml-2" />
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ToolPage;
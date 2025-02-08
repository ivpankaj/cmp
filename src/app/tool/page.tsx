"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ToolPage = () => {
  const tools = [
    {
      category: "Document Tools",
      items: [
        { id: 1, name: "Convert PDF to Word", description: "Easily convert PDF files into editable Word documents.", icon: "📄" },
        { id: 2, name: "Image to PDF", description: "Combine multiple images into a single PDF file.", icon: "🖼️" },
        { id: 3, name: "Merge PDFs", description: "Merge multiple PDF files into one document.", icon: "📚" },
        { id: 4, name: "Split PDF", description: "Split a PDF file into smaller parts.", icon: "✂️" },
      ],
    },
    {
      category: "Text Tools",
      items: [
        { id: 5, name: "Check ATS Score", description: "Evaluate your resume's compatibility with Applicant Tracking Systems.", icon: "📋" },
        { id: 6, name: "Word Counter", description: "Count words, characters, and paragraphs in your text.", icon: "📝" },
        { id: 7, name: "Case Converter", description: "Convert text between uppercase, lowercase, and title case.", icon: "🔤" },
        { id: 8, name: "Remove Extra Spaces", description: "Clean up unnecessary spaces in your text.", icon: "🧹" },
      ],
    },
    {
      category: "Image Tools",
      items: [
        { id: 9, name: "Compress Images", description: "Reduce image file size without losing quality.", icon: "📸" },
        { id: 10, name: "Resize Images", description: "Adjust image dimensions for web or print.", icon: "📏" },
        { id: 11, name: "Convert Image Formats", description: "Change image formats like PNG, JPEG, and SVG.", icon: "🔄" },
        { id: 12, name: "Add Watermark", description: "Protect your images by adding custom watermarks.", icon: "💧" },
      ],
    },
    {
      category: "Code Tools",
      items: [
        { id: 13, name: "Minify Code", description: "Optimize your JavaScript, CSS, or HTML code.", icon: "⚙️" },
        { id: 14, name: "JSON Formatter", description: "Format and validate JSON data for readability.", icon: "📦" },
        { id: 15, name: "Regex Tester", description: "Test and debug regular expressions online.", icon: "🔍" },
        { id: 16, name: "Base64 Encoder/Decoder", description: "Encode or decode data using Base64.", icon: "🔒" },
      ],
    },
    {
      category: "Miscellaneous Tools",
      items: [
        { id: 17, name: "QR Code Generator", description: "Create QR codes for URLs, text, or contact info.", icon: "📱" },
        { id: 18, name: "Password Generator", description: "Generate strong and secure passwords.", icon: "🔑" },
        { id: 19, name: "Unit Converter", description: "Convert units like length, weight, and temperature.", icon: "⚖️" },
        { id: 20, name: "Color Picker", description: "Pick colors and get their HEX, RGB, or HSL values.", icon: "🎨" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Tech Tools</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore our collection of free tools designed to simplify your workflow. From document management to coding utilities, we&lsquo;ve got you covered.
          </p>
        </section>

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
                  <button className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                    Use Tool <FaArrowRight className="inline ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Section 3: Call to Action */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6">Need More Tools?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We&lsquo;re constantly adding new tools to help you work smarter. Stay tuned for updates!
          </p>
          <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
            Explore More <FaArrowRight className="inline ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ToolPage;
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from "react";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import { FaFileUpload, FaFileAlt, FaArrowRight, FaCheckCircle, } from "react-icons/fa";

const ResumeAtsCheckerPage = () => {
  interface UploadedFile {
    file: File;
    content: string;
    name: string;
  }
  
  const [resume, setResume] = useState<UploadedFile | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [results, setResults] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Handle resume file upload
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setResults(null);

    // Clear the file input value to allow re-selecting the same file
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }

    if (file && (file.type === "application/pdf" || file.type === "application/msword" || 
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                file.type === "text/plain")) {
      const reader = new FileReader();
      reader.onload = () => {
        // For a real app, you would need to parse the file content
        // Here we're just pretending to extract text
        setResume({
          file: file,
          content: typeof reader.result === 'string' ? reader.result : "Sample resume content for demonstration",
          name: file.name,
        });
      };
      reader.readAsText(file);
    } else if (file) {
      setError("Please upload a valid resume file (PDF, DOC, DOCX, or TXT).");
    }
  };

  const triggerResumeInput = () => {
    resumeInputRef.current?.click();
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setResults(null);
  };

  const analyzeResume = () => {
    if (!resume) {
      setError("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    // Simulate analysis process
    setTimeout(() => {
      try {
        // This is a mock analysis - in a real app, you would use NLP or AI to analyze
        const resumeContent = resume.content.toLowerCase();
        const jdContent = jobDescription.toLowerCase();
        
        // Extract keywords from job description (simplified)
        const keywords = extractKeywords(jdContent);
        
        // Check which keywords are in the resume
        const matched = keywords.filter(keyword => resumeContent.includes(keyword));
        const missing = keywords.filter(keyword => !resumeContent.includes(keyword));
        
        // Calculate score (simplified)
        const score = Math.round((matched.length / (matched.length + missing.length)) * 100);
        
        // Generate suggestions
        const suggestions = generateSuggestions(missing);
        
        setResults({
          score,
          matchedKeywords: matched,
          missingKeywords: missing,
          suggestions
        });
        
        setIsAnalyzing(false);
      } catch (err) {
        console.error("Error analyzing resume:", err);
        setError("Failed to analyze your resume. Please try again.");
        setIsAnalyzing(false);
      }
    }, 2000); // Simulate processing time
  };

  // Helper function to extract keywords from job description
  const extractKeywords = (text: string): string[] => {
    // In a real app, this would use NLP or AI to extract relevant keywords
    // This is just a simple example
    const commonWords = ["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "are"];
    const words = text.split(/\s+/).filter(word => word.length > 3 && !commonWords.includes(word));
    
    // Remove duplicates and limit to 15 words
    return Array.from(new Set(words)).slice(0, 15);
  };

  // Generate suggestions based on missing keywords
  const generateSuggestions = (missingKeywords: string[]): string[] => {
    if (missingKeywords.length === 0) return ["Your resume matches the job description well!"];
    
    const suggestions = [
      "Consider adding the missing keywords to your resume where applicable.",
      "Tailor your experience section to highlight skills related to: " + 
        missingKeywords.slice(0, 3).join(", "),
      "Use industry-specific terminology from the job description."
    ];
    
    return suggestions;
  };

  return (
    <>
      <HeroSection
        title={["Resume.", "ATS Score."]}
        subtitle="Check how well your resume matches a job description. Optimize your resume for applicant tracking systems."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our Resume ATS Checker analyzes your resume against a job description to calculate how likely 
              it is to pass through Applicant Tracking Systems. Improve your chances of getting an interview 
              by optimizing your resume for each job application. All processing happens in your browser — your data stays private.
            </p>
          </section>

          {/* Upload Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300">
                {/* Resume Upload */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Step 1: Upload Your Resume</h3>
                  {!resume ? (
                    <div 
                      onClick={triggerResumeInput}
                      className="w-full py-12 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors duration-300"
                    >
                      <FaFileUpload size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-400 mb-2">Click or drag resume here to upload</p>
                      <p className="text-gray-500 text-sm">Supports PDF, DOC, DOCX, TXT</p>
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={handleResumeUpload}
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FaFileAlt size={24} className="text-green-500 mr-2" />
                          <span className="text-gray-300 text-lg truncate max-w-xs">
                            {resume.name}
                          </span>
                        </div>
                        <button
                          onClick={triggerResumeInput}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Step 2: Paste Job Description</h3>
                  <textarea
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                    placeholder="Paste the full job description here..."
                    className="w-full h-48 p-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300"
                  />
                </div>

                {error && (
                  <div className="mt-4 mb-4 text-red-500 text-center">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
                  <button
                    onClick={analyzeResume}
                    disabled={!resume || !jobDescription || isAnalyzing}
                    className={`flex-1 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      !resume || !jobDescription || isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isAnalyzing ? (
                      "Analyzing..."
                    ) : (
                      <>
                        Analyze Resume <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          {results && (
            <section className="mb-20">
              <div className="max-w-3xl mx-auto">
                <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-6 text-center">ATS Compatibility Score</h3>
                  
                  {/* Score Display */}
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 rounded-full border-8 border-blue-500 flex items-center justify-center bg-black">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{results.score}%</div>
                        <div className="text-gray-400 mt-2">Match Rate</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Keywords Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                      <h4 className="font-bold text-green-400 mb-2 flex items-center">
                        <FaCheckCircle className="mr-2" /> Matched Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {results.matchedKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-sm">
                            {keyword}
                          </span>
                        ))}
                        {results.matchedKeywords.length === 0 && (
                          <span className="text-gray-400 text-sm">No keywords matched.</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
                      <h4 className="font-bold text-red-400 mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {results.missingKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-sm">
                            {keyword}
                          </span>
                        ))}
                        {results.missingKeywords.length === 0 && (
                          <span className="text-gray-400 text-sm">No missing keywords.</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Suggestions to Improve</h4>
                    <ul className="list-disc ml-5 space-y-2">
                      {results.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-300">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
                <p className="text-gray-400">Upload your resume and paste the job description you&lsquo;re applying for.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Analyze</h3>
                <p className="text-gray-400">Our tool compares your resume against the job description to identify matches and gaps.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Optimize</h3>
                <p className="text-gray-400">Get personalized suggestions to improve your resume for higher ATS matching scores.</p>
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
                "Keyword Analysis", 
                "ATS Score Calculator", 
                "Personalized Tips", 
                "Privacy Protected"
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
            <h2 className="text-4xl font-bold mb-6">Need Help With Your Resume?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Want expert help optimizing your resume for ATS systems? Our professional resume writers can help you stand out from the crowd.
            </p>
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Professional Resume Services <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default ResumeAtsCheckerPage;
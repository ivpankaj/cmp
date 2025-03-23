/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from "react";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import { 
  FaLink, 
  FaDownload, 
  FaArrowRight, 
  FaCheckCircle, 
  FaMobileAlt, 
  FaFileAlt, 
  FaEnvelope,
  FaMapMarkerAlt,
  
  FaQrcode,
  FaCog,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaIdCard,
  FaVrCardboard
} from "react-icons/fa";
import QRCode from "qrcode";

// Types for QR code data
type QRCodeType = 'url' | 'text' | 'email' | 'sms' | 'location' | 'vcard' | 'social';
type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

interface QROptions {
  width: number;
  color: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

const QRCodeGeneratorPage = () => {
  // States for QR Code content
  const [qrType, setQrType] = useState<QRCodeType>('url');
  const [qrText, setQrText] = useState('');
  const [qrUrl, setQrUrl] = useState('https://');
  const [qrEmail, setQrEmail] = useState({ address: '', subject: '', body: '' });
  const [qrSms, setQrSms] = useState({ number: '', message: '' });
  const [qrLocation, setQrLocation] = useState({ latitude: '', longitude: '', name: '' });
  const [qrVcard, setQrVcard] = useState({ name: '', phone: '', email: '', organization: '', title: '', url: '', address: '' });
  const [qrSocial, setQrSocial] = useState({ platform: 'twitter' as SocialPlatform, username: '' });
  
  // States for QR code options and result
  const [qrOptions, setQrOptions] = useState<QROptions>({
    width: 300,
    color: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    margin: 4
  });
  
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Function to generate QR code content based on type
  const generateQRContent = (): string => {
    switch (qrType) {
      case 'url':
        return qrUrl;
      case 'text':
        return qrText;
      case 'email':
        return `mailto:${qrEmail.address}?subject=${encodeURIComponent(qrEmail.subject)}&body=${encodeURIComponent(qrEmail.body)}`;
      case 'sms':
        return `smsto:${qrSms.number}:${qrSms.message}`;
      case 'location':
        return `geo:${qrLocation.latitude},${qrLocation.longitude}?q=${encodeURIComponent(qrLocation.name || `${qrLocation.latitude},${qrLocation.longitude}`)}`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${qrVcard.name}
TEL:${qrVcard.phone}
EMAIL:${qrVcard.email}
ORG:${qrVcard.organization}
TITLE:${qrVcard.title}
URL:${qrVcard.url}
ADR:${qrVcard.address}
END:VCARD`;
      case 'social':
        switch(qrSocial.platform) {
          case 'twitter':
            return `https://twitter.com/${qrSocial.username}`;
          case 'facebook':
            return `https://facebook.com/${qrSocial.username}`;
          case 'instagram':
            return `https://instagram.com/${qrSocial.username}`;
          case 'linkedin':
            return `https://linkedin.com/in/${qrSocial.username}`;
          default:
            return `https://twitter.com/${qrSocial.username}`;
        }
      default:
        return qrText;
    }
  };

  // Generate QR code
  const generateQRCode = async () => {
    const content = generateQRContent();
    
    if (!content || (qrType === 'url' && qrUrl === 'https://')) {
      setError("Please enter valid content for the QR code");
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(content, {
        width: qrOptions.width,
        margin: qrOptions.margin,
        color: {
          dark: qrOptions.color,
          light: qrOptions.backgroundColor
        },
        errorCorrectionLevel: qrOptions.errorCorrectionLevel
      });
      
      setQrCodeImageUrl(qrCodeDataUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError("Failed to generate QR code. Please check your input and try again.");
      setIsGenerating(false);
    }
  };

  // Download QR code image
  const downloadQRCode = () => {
    if (!qrCodeImageUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeImageUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render input fields based on selected QR code type
  const renderInputFields = () => {
    switch (qrType) {
      case 'url':
        return (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">URL</label>
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Text Content</label>
            <div className="relative">
              <FaFileAlt className="absolute left-3 top-4 text-gray-500" />
              <textarea
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter your text here..."
                rows={5}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={qrEmail.address}
                  onChange={(e) => setQrEmail({...qrEmail, address: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Subject (Optional)</label>
              <input
                type="text"
                value={qrEmail.subject}
                onChange={(e) => setQrEmail({...qrEmail, subject: e.target.value})}
                placeholder="Email subject"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Body (Optional)</label>
              <textarea
                value={qrEmail.body}
                onChange={(e) => setQrEmail({...qrEmail, body: e.target.value})}
                placeholder="Email body content..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  value={qrSms.number}
                  onChange={(e) => setQrSms({...qrSms, number: e.target.value})}
                  placeholder="+1234567890"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Message (Optional)</label>
              <textarea
                value={qrSms.message}
                onChange={(e) => setQrSms({...qrSms, message: e.target.value})}
                placeholder="Message content..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'location':
        return (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Location Name (Optional)</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={qrLocation.name}
                  onChange={(e) => setQrLocation({...qrLocation, name: e.target.value})}
                  placeholder="Empire State Building"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Latitude</label>
                <input
                  type="text"
                  value={qrLocation.latitude}
                  onChange={(e) => setQrLocation({...qrLocation, latitude: e.target.value})}
                  placeholder="40.7484"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Longitude</label>
                <input
                  type="text"
                  value={qrLocation.longitude}
                  onChange={(e) => setQrLocation({...qrLocation, longitude: e.target.value})}
                  placeholder="-73.9857"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      
      case 'vcard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={qrVcard.name}
                  onChange={(e) => setQrVcard({...qrVcard, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={qrVcard.phone}
                onChange={(e) => setQrVcard({...qrVcard, phone: e.target.value})}
                placeholder="+1234567890"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={qrVcard.email}
                onChange={(e) => setQrVcard({...qrVcard, email: e.target.value})}
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Organization</label>
              <input
                type="text"
                value={qrVcard.organization}
                onChange={(e) => setQrVcard({...qrVcard, organization: e.target.value})}
                placeholder="Company Inc."
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={qrVcard.title}
                onChange={(e) => setQrVcard({...qrVcard, title: e.target.value})}
                placeholder="Product Manager"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Website</label>
              <input
                type="url"
                value={qrVcard.url}
                onChange={(e) => setQrVcard({...qrVcard, url: e.target.value})}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Address</label>
              <textarea
                value={qrVcard.address}
                onChange={(e) => setQrVcard({...qrVcard, address: e.target.value})}
                placeholder="123 Main St, Anytown, ST 12345"
                rows={2}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'social':
        return (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Platform</label>
              <div className="relative">
                <select
                  value={qrSocial.platform}
                  onChange={(e) => setQrSocial({...qrSocial, platform: e.target.value as SocialPlatform})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Username/ID</label>
              <div className="relative">
                {qrSocial.platform === 'twitter' && <FaTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
                {qrSocial.platform === 'facebook' && <FaFacebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
                {qrSocial.platform === 'instagram' && <FaInstagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
                {qrSocial.platform === 'linkedin' && <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
                <input
                  type="text"
                  value={qrSocial.username}
                  onChange={(e) => setQrSocial({...qrSocial, username: e.target.value})}
                  placeholder="username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render advanced options
  const renderAdvancedOptions = () => {
    return (
      <div className={`space-y-4 mb-4 transition-all duration-300 ${showAdvancedOptions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div>
          <label className="block text-gray-300 mb-2">QR Code Size (px)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="100"
              max="800"
              step="50"
              value={qrOptions.width}
              onChange={(e) => setQrOptions({...qrOptions, width: parseInt(e.target.value)})}
              className="w-full mr-4"
            />
            <span className="text-gray-300 min-w-[4rem] text-right">{qrOptions.width}px</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Foreground Color</label>
            <div className="flex">
              <input
                type="color"
                value={qrOptions.color}
                onChange={(e) => setQrOptions({...qrOptions, color: e.target.value})}
                className="w-12 h-10 border-0 p-0 bg-transparent"
              />
              <input
                type="text"
                value={qrOptions.color}
                onChange={(e) => setQrOptions({...qrOptions, color: e.target.value})}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Background Color</label>
            <div className="flex">
              <input
                type="color"
                value={qrOptions.backgroundColor}
                onChange={(e) => setQrOptions({...qrOptions, backgroundColor: e.target.value})}
                className="w-12 h-10 border-0 p-0 bg-transparent"
              />
              <input
                type="text"
                value={qrOptions.backgroundColor}
                onChange={(e) => setQrOptions({...qrOptions, backgroundColor: e.target.value})}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Error Correction Level</label>
          <select
            value={qrOptions.errorCorrectionLevel}
            onChange={(e) => setQrOptions({...qrOptions, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H'})}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
          <p className="text-gray-500 text-sm mt-1">Higher correction levels make QR codes more reliable but larger.</p>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Margin Size</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="10"
              value={qrOptions.margin}
              onChange={(e) => setQrOptions({...qrOptions, margin: parseInt(e.target.value)})}
              className="w-full mr-4"
            />
            <span className="text-gray-300 min-w-[3rem] text-right">{qrOptions.margin}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeroSection
        title={["QR Code.", "Generator."]}
        subtitle="Create custom QR codes for URLs, text, contact cards, and more. Professional, customizable, and completely free."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our QR code generator lets you create and customize QR codes for various purposes - 
              from sharing website links to contact information. The entire process happens in your 
              browser — no data is uploaded to any server, ensuring your information stays private.
            </p>
          </section>

          {/* Generator Section */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left Column - Input Options */}
                  <div className="lg:col-span-3">
                    <h3 className="text-2xl font-bold mb-6">Create Your QR Code</h3>
                    
                    {/* QR Type Selector */}
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2">QR Code Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {[
                          { type: 'url', label: 'URL', icon: <FaLink /> },
                          { type: 'text', label: 'Text', icon: <FaFileAlt /> },
                          { type: 'email', label: 'Email', icon: <FaEnvelope /> },
                          { type: 'sms', label: 'SMS', icon: <FaMobileAlt /> },
                          { type: 'location', label: 'Location', icon: <FaMapMarkerAlt /> },
                          { type: 'vcard', label: 'vCard', icon: <FaVrCardboard /> },
                          { type: 'social', label: 'Social', icon: <FaTwitter /> }
                        ].map((item) => (
                          <button
                            key={item.type}
                            onClick={() => setQrType(item.type as QRCodeType)}
                            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                              qrType === item.type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            <span className="text-lg mb-1">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Input Fields for selected type */}
                    {renderInputFields()}
                    
                    {/* Advanced Options Toggle */}
                    <button
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      className="flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors duration-300"
                    >
                      <FaCog className="mr-2" />
                      {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                    </button>
                    
                    {/* Advanced Options */}
                    {renderAdvancedOptions()}
                    
                    {/* Error Message */}
                    {error && (
                      <div className="mt-4 text-red-500 text-center">
                        {error}
                      </div>
                    )}
                    
                    {/* Generate Button */}
                    <button
                      onClick={generateQRCode}
                      disabled={isGenerating}
                      className={`w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                        isGenerating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isGenerating ? (
                        "Generating..."
                      ) : (
                        <>
                          Generate QR Code <FaQrcode className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Right Column - QR Preview */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-6">QR Code Preview</h3>
                    <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center">
                      <div className="w-full aspect-square flex items-center justify-center bg-white rounded-lg mb-4 p-4">
                        {qrCodeImageUrl ? (
                          <img
                            src={qrCodeImageUrl}
                            alt="Generated QR Code"
                            className="max-w-full max-h-full"/>
                        ) : (
                          <div className="text-gray-400 text-center">
                            <FaQrcode size={80} className="mx-auto mb-2 opacity-30" />
                            <p>Your QR code will appear here</p>
                          </div>
                        )}
                      </div>
                      
                      {qrCodeImageUrl && (
                        <button
                          onClick={downloadQRCode}
                          className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                        >
                          Download QR Code <FaDownload className="ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Select QR Type</h3>
                <p className="text-gray-400">Choose what type of QR code you need - URL, text, contact information, or more.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Customize</h3>
                <p className="text-gray-400">Enter your content and adjust appearance settings like colors, size, and error correction level.</p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Download</h3>
                <p className="text-gray-400">Generate your QR code and download it as a high-quality PNG image ready for print or digital use.</p>
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
                { title: "Multiple QR Types", desc: "Create QR codes for URLs, text, emails, contact cards, locations, and more" },
                { title: "Customizable Design", desc: "Choose colors, size, and error correction levels to match your branding" },
                { title: "High Resolution", desc: "Download QR codes as high-quality images perfect for print or digital" },
                { title: "100% Private", desc: "All processing happens in your browser - no data is sent to any server" },
                { title: "Free to Use", desc: "Create unlimited QR codes without any cost or account signup" },
                { title: "Mobile Friendly", desc: "Works perfectly on smartphones and tablets" },
                { title: "No Watermarks", desc: "Clean QR codes without any logos or branding added" },
                { title: "Instant Generation", desc: "Generate your QR code in seconds with our fast processing" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-400 text-center text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Popular Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaLink className="mr-2 text-blue-400" /> Business Cards & Marketing
                </h3>
                <p className="text-gray-400">
                  Add QR codes to business cards, flyers, posters, and other marketing materials to quickly connect people with your website, portfolio, or social media profiles.
                </p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaIdCard className="mr-2 text-blue-400" /> Contact Sharing
                </h3>
                <p className="text-gray-400">
                  Create vCard QR codes that allow people to instantly save your contact information to their phone without manual entry or business cards.
                </p>
              </div>
              
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-400" /> Location & Navigation
                </h3>
                <p className="text-gray-400">
                  Share physical locations through QR codes that open directly in map applications, perfect for events, stores, or helping people find specific places.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto divide-y divide-gray-800">
              {[
                {
                  q: "Are the QR codes generated permanent?",
                  a: "Yes, the QR codes you generate will work forever. Unlike dynamic QR codes that require a service subscription, our static QR codes contain all the information directly and will never expire."
                },
                {
                  q: "Can I customize the design of my QR code?",
                  a: "Yes, you can customize the colors, size, error correction level, and margins of your QR code. Our advanced options allow you to match your QR code to your branding or design requirements."
                },
                {
                  q: "How secure is this QR code generator?",
                  a: "Very secure. All processing happens entirely in your browser, and your data never leaves your device. We don't store, track, or have any access to the information you use to generate QR codes."
                },
                {
                  q: "Can I use these QR codes for commercial purposes?",
                  a: "Absolutely! You can use the QR codes generated by our tool for any purpose, including commercial applications, without attribution or limitations."
                },
                {
                  q: "What's the optimal size for printing QR codes?",
                  a: "For best results when printing, we recommend keeping your QR code at least 2 x 2 cm (0.8 x 0.8 inches) in size. The higher error correction level you select, the larger your QR code should be when printed."
                }
              ].map((item, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-xl font-medium mb-2">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="p-8 rounded-xl backdrop-blur-sm bg-gradient-to-r from-blue-900/70 to-indigo-900/70 border border-blue-700/30">
              <h2 className="text-4xl font-bold mb-6">Need More Tools?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Check out our full suite of web tools, including PDF conversions, image editing, text utilities, and more - all completely free and privacy-focused.
              </p>
              <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                Explore All Tools <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default QRCodeGeneratorPage;
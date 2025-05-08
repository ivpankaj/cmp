/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import React, { useState } from "react";
import {  FaArrowRight, FaCopy, FaSyncAlt, FaLock } from "react-icons/fa";

const PasswordGeneratorPage = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Medium");

  const generatePassword = () => {
    let charset = "";
    
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      setPassword("Please select at least one character type");
      setPasswordStrength("Weak");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };

  const calculatePasswordStrength = (pass:any) => {
    let strength = 0;
    
    if (pass.length >= 12) strength += 1;
    if (pass.match(/[A-Z]/)) strength += 1;
    if (pass.match(/[a-z]/)) strength += 1;
    if (pass.match(/[0-9]/)) strength += 1;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 1;

    if (strength <= 2) setPasswordStrength("Weak");
    else if (strength <= 4) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Weak": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Strong": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const strengthBenefits = [
    "Protects against brute force attacks",
    "Guards your personal information",
    "Secures financial transactions",
    "Prevents unauthorized access",
    "Keeps your digital identity safe",
  ];

  return (
    <>
      <HeroSection
        title={["Secure.", "Password."]}
        subtitle="Generate strong, unique passwords to fortify your digital presence and protect your online accounts."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              In today&lsquo;s digital landscape, strong passwords are your first line of defense against cyber threats.
              Our advanced password generator creates secure, unique passwords tailored to your specifications.
            </p>
          </section>

          {/* Password Generator Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-center">Password Generator</h2>
              
              {/* Password Display */}
              <div className="mb-8 relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg text-lg text-white"
                    placeholder="Your secure password will appear here"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-4 text-white/70 hover:text-white"
                    title="Copy to clipboard"
                  >
                    <FaCopy size={20} />
                  </button>
                </div>
                {copied && (
                  <span className="absolute -bottom-6 right-0 text-green-500 text-sm">
                    Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Password Strength Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Password Strength:</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStrengthColor()}`}>
                    {passwordStrength}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{
                      width:
                        passwordStrength === "Weak"
                          ? "33%"
                          : passwordStrength === "Medium"
                          ? "66%"
                          : "100%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Password Options */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Password Length: {passwordLength}</label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="uppercase"
                      checked={includeUppercase}
                      onChange={() => setIncludeUppercase(!includeUppercase)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="uppercase" className="text-gray-400">Uppercase (A-Z)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lowercase"
                      checked={includeLowercase}
                      onChange={() => setIncludeLowercase(!includeLowercase)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="lowercase" className="text-gray-400">Lowercase (a-z)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="numbers"
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers(!includeNumbers)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="numbers" className="text-gray-400">Numbers (0-9)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="symbols"
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols(!includeSymbols)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="symbols" className="text-gray-400">Symbols (!@#$)</label>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generatePassword}
                  className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
                >
                  Generate Password <FaSyncAlt className="inline ml-2" />
                </button>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Why Strong Passwords Matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {strengthBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <FaLock
                    size={24}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <p className="text-gray-400 mt-2">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Best Practices Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Password Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Use Unique Passwords</span>
                  Never reuse passwords across different accounts. Each online service should have its own unique password to prevent a breach of one account from compromising others.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Enable Two-Factor Authentication</span>
                  For an extra layer of security, enable two-factor authentication whenever possible. This adds a second verification step beyond just your password.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Change Passwords Regularly</span>
                  Update your passwords periodically, especially for critical accounts like banking, email, and social media to minimize the risk of unauthorized access.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400">
                  <span className="text-white font-medium block mb-2">Use a Password Manager</span>
                  Consider using a reputable password manager to securely store and generate complex passwords for all your accounts.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Secure Your Digital Identity Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Start generating strong, unique passwords for all your accounts and take the first step toward better online security.
            </p>
            <button
              onClick={generatePassword}
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
            >
              Generate Your First Password <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default PasswordGeneratorPage;
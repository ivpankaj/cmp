"use client";
import BackgroundEffect from "@/components/Background";
import React from "react";


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
      {/* Background elements */}
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">
            Last Updated: Jan 20, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to CookMyPapers This Privacy Policy
              explains how we collect, use, disclose, and protect your personal
              information when you use our website, services, and products
              (collectively referred to as the Servics). By using our Services,
              you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold mb-6">2. Information We Collect</h2>
            <h3 className="text-gray-300 leading-relaxed">
              We may collect the following types of information:
              <ul className="list-disc pl-6 mt-4">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, and other contact details.
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details or
                  other payment-related information.
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, device
                  information, and pages visited.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> Cookies,
                  pixels, and similar technologies to enhance your experience.
                </li>
              </ul>
            </h3>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold mb-6">3. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use your information for the following purposes:
              <ul className="list-disc pl-6 mt-4">
                <li>To provide and maintain our Services.</li>
                <li>To process payments and fulfill orders.</li>
                <li>To communicate with you about updates, promotions, and support.</li>
                <li>To analyze usage patterns and improve our Services.</li>
                <li>To comply with legal obligations and enforce our policies.</li>
              </ul>
            </p>
          </section>

          {/* Section 4: Sharing Your Information */}
          <section>
            <h2 className="text-3xl font-bold mb-6">4. Sharing Your Information</h2>
            <h3 className="text-gray-300 leading-relaxed">
              We do not sell your personal information. However, we may share it
              with third parties under the following circumstances:
              <ul className="list-disc pl-6 mt-4">
                <li>With service providers who assist us in operating our Services.</li>
                <li>For legal reasons, such as responding to subpoenas or court orders.</li>
                <li>To protect our rights, property, or safety.</li>
                <li>With your consent or at your direction.</li>
              </ul>
            </h3>
          </section>

          {/* Section 5: Data Security */}
          <section>
            <h2 className="text-3xl font-bold mb-6">5. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, alteration, or
              disclosure. However, no method of transmission over the internet or
              electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* Section 6: Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-3xl font-bold mb-6">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar technologies to enhance your experience,
              analyze trends, and administer our Services. You can manage your
              cookie preferences through your browser settings. However, disabling
              cookies may affect the functionality of our Services.
            </p>
          </section>

          {/* Section 7: Third-Party Links */}
          <section>
            <h2 className="text-3xl font-bold mb-6">7. Third-Party Links</h2>
            <p className="text-gray-300 leading-relaxed">
              Our Services may contain links to third-party websites or services.
              We are not responsible for the privacy practices or content of these
              third parties. We encourage you to review their privacy policies
              before providing any personal information.
            </p>
          </section>

          {/* Section 8: Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">8. Children&quot;s Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our Services are not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such information, we
              will take steps to delete it.
            </p>
          </section>

          {/* Section 9: Changes to Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">9. Changes to Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to update or modify this Privacy Policy at any
              time. If we make material changes, we will notify you by email or
              through our Services. Your continued use of our Services after any
              changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

      
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
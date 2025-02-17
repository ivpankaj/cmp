"use client";
import BackgroundEffect from "@/components/Background";
import React from "react";


const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
      {/* Background elements */}
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
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
              Welcome to CookMyPapers (&quot;we&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and
              Conditions govern your use of our website, services, and products
              (collectively referred to as the &quot;Services&quot;). By accessing or using
              our Services, you agree to comply with and be bound by these Terms.
              If you do not agree with any part of these Terms, you must not use
              our Services.
            </p>
          </section>

          {/* Section 2: Eligibility */}
          <section>
            <h2 className="text-3xl font-bold mb-6">2. Eligibility</h2>
            <p className="text-gray-300 leading-relaxed">
              To use our Services, you must be at least 18 years old or have the
              consent of a parent or guardian. By using our Services, you
              represent and warrant that you meet these eligibility requirements.
              If you are using our Services on behalf of an organization, you
              represent and warrant that you have the authority to bind that
              organization to these Terms.
            </p>
          </section>

          {/* Section 3: Account Registration */}
          <section>
            <h2 className="text-3xl font-bold mb-6">3. Account Registration</h2>
            <p className="text-gray-300 leading-relaxed">
              To access certain features of our Services, you may need to create
              an account. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete. You are
              responsible for safeguarding your account credentials and for all
              activities that occur under your account. You must notify us
              immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* Section 4: Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold mb-6">4. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content, trademarks, logos, and intellectual property displayed
              on our Services are owned by CookMyPapers or its licensors. You may
              not use, reproduce, modify, distribute, or display any of this
              content without our prior written consent. Any unauthorized use of
              our intellectual property may result in legal action.
            </p>
          </section>

          {/* Section 5: User Conduct */}
          <section>
            <h2 className="text-3xl font-bold mb-6">5. User Conduct</h2>
            <h3 className="text-gray-300 leading-relaxed">
              You agree to use our Services only for lawful purposes and in
              accordance with these Terms. You must not:
              <ul className="list-disc pl-6 mt-4">
                <li>Violate any applicable laws or regulations.</li>
                <li>
                  Infringe upon the rights of others, including intellectual
                  property rights.
                </li>
                <li>
                  Upload or transmit any harmful, offensive, or inappropriate
                  content.
                </li>
                <li>
                  Attempt to gain unauthorized access to our systems or networks.
                </li>
              </ul>
            </h3>
          </section>

          {/* Section 6: Payments and Refunds */}
          <section>
            <h2 className="text-3xl font-bold mb-6">6. Payments and Refunds</h2>
            <p className="text-gray-300 leading-relaxed">
              Certain Services may require payment. All payments are non-refundable
              unless otherwise stated in writing. We reserve the right to change
              pricing for our Services at any time. If you dispute any charges, you
              must notify us within 30 days of the transaction date.
            </p>
          </section>

          {/* Section 7: Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">7. Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              Your use of our Services is also governed by our Privacy Policy,
              which explains how we collect, use, and protect your personal
              information. By using our Services, you consent to the practices
              described in our Privacy Policy.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold mb-6">8. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the fullest extent permitted by law, CookMyPapers shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of our
              Services. Our total liability to you for any claims arising from or
              related to these Terms shall not exceed the amount you paid us in
              the past 12 months.
            </p>
          </section>

          {/* Section 9: Termination */}
          <section>
            <h2 className="text-3xl font-bold mb-6">9. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend your access to our
              Services at any time, with or without cause, and without prior
              notice. Upon termination, your right to use our Services will
              immediately cease. Sections of these Terms that by their nature
              should survive termination will survive, including but not limited
              to intellectual property ownership, warranties, disclaimers, and
              limitations of liability.
            </p>
          </section>

          {/* Section 10: Governing Law */}
          <section>
            <h2 className="text-3xl font-bold mb-6">10. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law principles.
              Any disputes arising out of or related to these Terms shall be
              subject to the exclusive jurisdiction of the courts located in
              Bangalore, India.
            </p>
          </section>

          {/* Section 11: Changes to Terms */}
          <section>
            <h2 className="text-3xl font-bold mb-6">11. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time.
              If we make material changes, we will notify you by email or through
              our Services. Your continued use of our Services after any changes
              constitutes your acceptance of the new Terms.
            </p>
          </section>

       
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
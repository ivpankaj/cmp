"use client";
import BackgroundEffect from "@/components/Background";
import React from "react";


const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10" >
      {/* Background elements */}
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Return and Refund Policy</h1>
          <p className="text-gray-400 text-lg">
            Last Updated: October 20, 2023
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to CookMyPapers  This Return and
              Refund Policy outlines the terms and conditions under which you may
              request a return or refund for products or services purchased from
              us. By making a purchase, you agree to comply with this policy.
            </p>
          </section>

          {/* Section 2: Eligibility for Returns */}
          <section>
            <h2 className="text-3xl font-bold mb-6">2. Eligibility for Returns</h2>
            <h3 className="text-gray-300 leading-relaxed">
              To be eligible for a return, the following conditions must be met:
              <ul className="list-disc pl-6 mt-4">
                <li>The item must be unused and in its original condition.</li>
                <li>
                  You must initiate the return request within 14 days of receiving
                  the product.
                </li>
                <li>
                  Digital products (e.g., software, subscriptions) are non-returnable
                  unless there is a technical issue or defect.
                </li>
                <li>
                  Customized or personalized items are not eligible for return.
                </li>
              </ul>
            </h3>
          </section>

          {/* Section 3: How to Initiate a Return */}
          <section>
            <h2 className="text-3xl font-bold mb-6">3. How to Initiate a Return</h2>
            <h3 className="text-gray-300 leading-relaxed">
              To initiate a return, follow these steps:
              <ol className="list-decimal pl-6 mt-4">
                <li>Contact our support team at support@cookmypapers.com.</li>
                <li>Provide your order number and reason for the return.</li>
                <li>
                  Once approved, ship the item back to the address provided by our
                  team.
                </li>
                <li>
                  Include a copy of the invoice or proof of purchase with the
                  returned item.
                </li>
              </ol>
            </h3>
          </section>

          {/* Section 4: Refund Process */}
          <section>
            <h2 className="text-3xl font-bold mb-6">4. Refund Process</h2>
            <h3 className="text-gray-300 leading-relaxed">
              Refunds will be processed as follows:
              <ul className="list-disc pl-6 mt-4">
                <li>
                  Refunds will be issued to the original payment method used during
                  purchase.
                </li>
                <li>
                  Processing times may vary depending on your bank or payment
                  provider.
                </li>
                <li>
                  Shipping costs are non-refundable unless the return is due to an
                  error on our part.
                </li>
                <li>
                  A restocking fee of 10% may apply for certain items, as specified
                  in the product description.
                </li>
              </ul>
            </h3>
          </section>

          {/* Section 5: Non-Refundable Items */}
          <section>
            <h2 className="text-3xl font-bold mb-6">5. Non-Refundable Items</h2>
            <h3 className="text-gray-300 leading-relaxed">
              The following items are non-refundable:
              <ul className="list-disc pl-6 mt-4">
                <li>Gift cards and promotional credits.</li>
                <li>Downloaded digital content (e.g., e-books, software).</li>
                <li>Customized or personalized products.</li>
                <li>Items marked as</li>
              </ul>
            </h3>
          </section>

          {/* Section 6: Damaged or Defective Items */}
          <section>
            <h2 className="text-3xl font-bold mb-6">6. Damaged or Defective Items</h2>
            <p className="text-gray-300 leading-relaxed">
              If you receive a damaged or defective item, please contact us within
              7 days of delivery. We will either replace the item or issue a refund,
              depending on your preference. Please provide photos or other evidence
              of the damage or defect to expedite the process.
            </p>
          </section>

          {/* Section 7: Cancellations */}
          <section>
            <h2 className="text-3xl font-bold mb-6">7. Cancellations</h2>
            <p className="text-gray-300 leading-relaxed">
              Orders can be canceled within 24 hours of placement without any
              penalty. After this period, cancellations may not be possible if the
              order has already been processed or shipped. Contact our support team
              immediately if you need to cancel an order.
            </p>
          </section>

          {/* Section 8: Exchanges */}
          <section>
            <h2 className="text-3xl font-bold mb-6">8. Exchanges</h2>
            <p className="text-gray-300 leading-relaxed">
              We offer exchanges for defective or incorrect items. If you wish to
              exchange an item for a different size, color, or variant, you must
              initiate a return and place a new order. Shipping costs for exchanges
              are the responsibility of the customer unless the exchange is due to
              our error.
            </p>
          </section>

          {/* Section 9: Changes to Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">9. Changes to Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to update or modify this Return and Refund
              Policy at any time. If we make material changes, we will notify you
              through our website or via email. Your continued use of our Services
              after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 10: Contact Us */}
          <section>
            <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions or concerns about this Return and Refund
              Policy, please contact us at:
              <br />
              Email: support@cookmypapers.com
              <br />
              Address: 123 Tech Lane, Bangalore, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
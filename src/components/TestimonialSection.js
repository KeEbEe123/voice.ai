import React from "react";

const TestimonialSection = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center mb-8">
          Testimonials
        </h2>
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-lg mb-4">"Amazing product."</p>
              <p className="text-sm text-gray-400">- John Doe</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-lg mb-4">
                "Another fantastic testimonial. Highlighting the benefits of
                your product or service."
              </p>
              <p className="text-sm text-gray-400">- Jane Smith</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-lg mb-4">
                "Yet another glowing testimonial. Building trust and credibility
                with your audience."
              </p>
              <p className="text-sm text-gray-400">- James Johnson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

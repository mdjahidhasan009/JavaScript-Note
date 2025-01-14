import { values } from "@/config/about/values";
import Link from "next/link";

/**
 * CoreValues component
 * A modern and animated version of the core values display
 */
export const CoreValues = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            These principles guide everything we do and help us deliver
            exceptional value to our clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100 text-white hover:bg-purple-700 transition-colors duration-300">
                  <span className="text-purple-600 group-hover:text-white text-xl font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-5 w-full">
        <Link
          href="/about/values"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-purple-600 text-white hover:bg-purple-700 h-10 py-2 px-4"
        >
          Learn More About Our Values
        </Link>
      </div>
    </section>
  );
};

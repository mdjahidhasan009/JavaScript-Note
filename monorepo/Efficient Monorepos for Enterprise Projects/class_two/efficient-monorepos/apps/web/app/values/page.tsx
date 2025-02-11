import Image from "next/image";
import ValuesHero from "@/assets/values-hero.jpg";
import { values } from "@/config/about/values";
import Link from "next/link";

export default function ValuesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Our Values</h1>
          <p className="text-xl max-w-2xl text-center">
            The principles that guide us in everything we do
          </p>
          <Link
            className="mt-8 text-lg font-bold underline hover:text-gray-300"
            href={"/about"}
          >
            Go Back
          </Link>
        </div>
      </section>

      {/* Values Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`flex flex-col md:flex-row items-center gap-12 mb-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="max-w-xl">
                  <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                    Value {index + 1}
                  </div>
                  <h2 className="text-3xl font-bold mb-6">{value.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {value.description}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <p className="text-gray-700">Commitment to excellence</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <p className="text-gray-700">Continuous improvement</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <p className="text-gray-700">Measurable results</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                  {/* You'll need to add appropriate images for each value */}
                  <Image
                    src={ValuesHero.src}
                    alt={value.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover how our values translate into exceptional results for our
            clients
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}

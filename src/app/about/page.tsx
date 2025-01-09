// pages/about.js
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Dollar to INR</title>
        <meta
          name="description"
          content="Learn more about Dollar to INR, a simple and user-friendly currency converter app."
        />
      </Head>

      <div className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              About Us
            </h1>

            <p className="text-center text-lg text-gray-600 mb-6">
              Welcome to Dollar to INR, your reliable currency converter for
              real-time exchange rates!
            </p>

            <div className="space-y-4">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Who We Are
                </h2>
                <p className="text-gray-600">
                  Dollar to INR is a simple and user-friendly currency converter
                  app that allows you to convert USD to INR with ease. Our goal
                  is to provide accurate and up-to-date exchange rates to help
                  individuals, travelers, and businesses manage currency
                  conversions effortlessly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Our Mission
                </h2>
                <p className="text-gray-600">
                  We aim to make currency conversion seamless by offering
                  real-time exchange rates, ensuring that you can make informed
                  financial decisions. Whether you &apos;re planning a trip,
                  sending money overseas, or just curious about the latest
                  rates, Dollar to INR is your trusted tool.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Why Choose Us
                </h2>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Real-time and accurate exchange rates</li>
                  <li>Simple and intuitive interface</li>
                  <li>Free and easy to use</li>
                  <li>Available anytime, anywhere</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

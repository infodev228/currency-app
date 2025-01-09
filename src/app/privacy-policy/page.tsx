// pages/privacy-policy.js
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Dollar to INR</title>
        <meta
          name="description"
          content="Read the privacy policy for Dollar to INR, your trusted currency converter app."
        />
      </Head>

      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Privacy Policy
            </h1>

            <p className="text-center text-lg text-gray-600 mb-6">
              We value your privacy and are committed to protecting your
              personal information.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Introduction
                </h2>
                <p className="text-gray-600">
                  Dollar to INR ("we", "our", "us") is committed to respecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, and protect your personal information when you use our
                  currency converter app.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Information We Collect
                </h2>
                <p className="text-gray-600">
                  We do not collect any personal data or financial information
                  from users of the Dollar to INR app. The app simply uses
                  real-time exchange rates to provide currency conversion
                  results.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  How We Use Your Information
                </h2>
                <p className="text-gray-600">
                  Since we do not collect any personal information, there is no
                  use of your data. The app operates entirely offline, ensuring
                  that no personal information is ever shared with us or third
                  parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Data Security
                </h2>
                <p className="text-gray-600">
                  While we do not collect or store any personal data, we are
                  committed to keeping your experience secure. Our app does not
                  require any sensitive data inputs, and your privacy is our
                  priority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Third-Party Services
                </h2>
                <p className="text-gray-600">
                  Our app may use third-party services, such as exchange rate
                  providers, to display real-time rates. However, these services
                  do not collect any personal data from you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600">
                  We may update our Privacy Policy from time to time. Any
                  changes will be posted on this page, and the updated date will
                  be reflected at the top of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Contact Us
                </h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please
                  feel free to contact us at{" "}
                  <a
                    href="mailto:contact@dollartoinr.in"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    contact@dollartoinr.in
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

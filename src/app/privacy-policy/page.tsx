export const metadata = {
  title: "Privacy Policy",
  description: `Gadget Era is committed to protecting your privacy and personal
  information. This privacy policy explains how we collect, use, and
  protect your information when you use our website. Please read this
  privacy policy carefully before using our website.`,
};

const PrivacyPolicy = () => {
  return (
    <main className="mx-auto container lg:max-w-screen-lg">
      <div className="prose dark:prose-invert max-w-screen-md mt-8">
        <h1>Privacy Policy</h1>
        <p>
          Gadget Era is committed to protecting your privacy and personal
          information. This privacy policy explains how we collect, use, and
          protect your information when you use our website. Please read this
          privacy policy carefully before using our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect various types of information from users of our website,
          including personal and non-personal information. Personal information
          may include your name, address, email address, phone number, and
          payment information. Non-personal information may include your IP
          address, browser type, and website usage data.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to provide and improve our services, including
          processing orders, shipping products, and communicating with you. We
          may also use your information for marketing purposes, such as sending
          promotional emails or offers. We do not share your information with
          third-party advertisers without your consent.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website, such as
          remembering your login information or preferences. You may disable
          cookies in your browser settings, but please note that some features
          of our website may not function properly without cookies.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services, such as payment processors or
          shipping providers, to fulfill orders or provide other services. These
          third-party services may have access to your personal information only
          to the extent necessary to perform their services, and they are
          obligated to protect your information in accordance with this privacy
          policy.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no data transmission
          over the internet or any other network can be guaranteed to be 100%
          secure. Therefore, we cannot guarantee the security of your
          information.
        </p>

        <h2>{"Children's Privacy"}</h2>
        <p>
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under the age
          of 13. If we become aware that we have collected personal information
          from a child under the age of 13, we will take appropriate steps to
          delete the information.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time without prior
          notice. We will post the updated policy on our website with a revised
          date. Your continued use of our website after the revised policy has
          been posted constitutes your acceptance of the changes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy policy or how
          we handle your information, please contact us at info@gadgetera.com.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

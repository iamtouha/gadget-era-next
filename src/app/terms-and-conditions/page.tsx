export const metadata = {
  title: "Terms & Conditions",
  description: `Welcome to Gadget Era, an online ecommerce electronic website that
  offers a wide range of electronic products and gadgets. By accessing
  or using this website, you agree to comply with and be bound by the
  following terms and conditions of use. Please read these terms
  carefully before using this website.`,
};

const TermsAndConditions = () => {
  return (
    <main className="mx-auto container lg:max-w-screen-lg">
      <div className="prose dark:prose-invert max-w-screen-md mt-8">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to Gadget Era, an online ecommerce electronic website that
          offers a wide range of electronic products and gadgets. By accessing
          or using this website, you agree to comply with and be bound by the
          following terms and conditions of use. Please read these terms
          carefully before using this website.
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By using this website, you agree to these terms and conditions of use,
          which constitute a legally binding agreement between you and Gadget
          Era. If you do not agree to these terms, please do not use this
          website.
        </p>

        <h2>Eligibility</h2>
        <p>
          You must be at least 18 years old and capable of entering into legally
          binding contracts to use this website. By using this website, you
          represent that you are at least 18 years old.
        </p>

        <h2>Account Registration</h2>
        <p>
          To use certain features of this website, you may be required to create
          an account and provide certain personal information. You are
          responsible for maintaining the confidentiality of your account
          information and for all activities that occur under your account.
        </p>

        <h2>Product Information</h2>
        <p>
          We strive to provide accurate and up-to-date information about our
          products, including descriptions, prices, and availability. However,
          we cannot guarantee that all information is complete, accurate, or
          current. We reserve the right to modify or discontinue products at any
          time without prior notice.
        </p>

        <h2>Payment and Shipping</h2>
        <p>
          We accept payment through various methods including mobile banking,
          and cash on delivery. Shipping policies vary depending on the product
          and delivery location. We strive to provide prompt and reliable
          shipping services, but we cannot guarantee delivery times or dates.
        </p>

        <h2>Returns and Refunds</h2>
        <p>
          We offer a 7-day return policy for most products. If you are not
          satisfied with your purchase, you may return it for a refund or
          exchange. Some products may be subject to restocking fees or other
          restrictions. Please refer to our returns and refunds policy for more
          information.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, images,
          and software, is the property of Gadget Era or its content suppliers
          and is protected by copyright and other intellectual property laws.
          You may not use, reproduce, distribute, or modify any content on this
          website without our express written consent.
        </p>

        <h2>Prohibited Activities</h2>
        <p>
          You may not use this website for any unlawful purpose or in any way
          that violates these terms and conditions of use. Prohibited activities
          include, but are not limited to, hacking, spamming, transmitting
          viruses, and accessing or using user accounts without authorization.
        </p>

        <h2>Disclaimer of Liability</h2>
        <p>
          Gadget Era is not liable for any damages or losses that may result
          from your use of this website, including, but not limited to, direct,
          indirect, incidental, punitive, and consequential damages. This
          disclaimer of liability applies to all claims, whether based on
          warranty, contract, tort, or any other legal theory.
        </p>

        <h2>Indemnification</h2>
        <p>
          {`You agree to indemnify and hold harmless Gadget Era and its owners,
          directors, officers, employees, and agents from any and all claims,
          damages, liabilities, costs, and expenses (including reasonable
          attorneys' fees) arising from your use of this website or any
          violation of these terms and conditions of use.`}
        </p>
        <h2>Governing Law and Jurisdiction</h2>
        <p>
          These terms and conditions of use shall be governed by and construed
          in accordance with the laws of Bangladesh. Any disputes arising from
          your use of this website shall be resolved exclusively in the courts
          of Bangladesh.
        </p>
        <h2>Amendments and Updates</h2>
        <p>
          We reserve the right to modify or update these terms and conditions of
          use at any time without prior notice. Your continued use of this
          website after any such changes constitutes your acceptance of the
          modified terms. We encourage you to review these terms periodically
          for updates.
        </p>
      </div>
    </main>
  );
};

export default TermsAndConditions;

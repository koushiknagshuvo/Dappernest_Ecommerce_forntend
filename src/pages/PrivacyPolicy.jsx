import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className=" w-50 my-5 mx-auto">
        <img src="./images/logo.png" alt="Dappernest" srcset="" />
        <p className="mt-3">
          At Dappernest, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, and safeguard the data you
          provide to us when using our website.
        </p>
        <ul>
          <li>
            Information Collection: We collect personal information such as your
            name, email address, shipping address, and payment details when you
            place an order on our website. Additionally, we may collect
            non-personal information such as IP addresses and browsing behavior
            for statistical analysis and website improvement purposes.
          </li>
          <li>
            Information Usage: We use the collected information to process your
            orders, provide customer support, personalize your shopping
            experience, and inform you about our latest products and promotions.
            We may also use your data to improve our website functionality and
            protect against fraudulent activities.
          </li>
          <li>
            Information Sharing: We do not sell, trade, or rent your personal
            information to third parties without your consent. However, we may
            share your data with trusted service providers who assist us in
            delivering our products and services to you (e.g., shipping
            companies). We ensure that these third parties adhere to strict
            confidentiality and security measures.
          </li>
          <li>
            Data Security: We implement industry-standard security measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </li>
          <li>
            Cookies and Tracking Technologies: We use cookies and similar
            tracking technologies to enhance your browsing experience, remember
            your preferences, and analyze website traffic. You can manage your
            cookie preferences through your browser settings.
          </li>
        </ul>
        <p>
          By using our website, you consent to the terms outlined in this
          Privacy Policy. We reserve the right to update or modify this policy
          at any time, and any changes will be posted on our website. Please
          review this Privacy Policy periodically. If you have any questions or
          concerns regarding our privacy practices, please contact us at
          [contact email].
        </p>
      </div>
      <hr className="mt-5" />
    </>
  );
};

export default PrivacyPolicy;
